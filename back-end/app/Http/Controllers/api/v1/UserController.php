<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'error' => 'User not found'
            ], 404);
        }

        if (Hash::check($request->password, $user->password)) {
            $data = UserResource::make($user);
            $data->additional(['token_type' => 'Bearer', 'access_token' => $user->createToken('Token')->accessToken]);
            return $data;
        } else {
            return response()->json([
                'status' => 'error',
                'error' => 'email password combination is invalid'
            ], 401);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'mobile' => 'required|string|max:255',
            'password' => 'required|string|min:6',
            'role' => 'required|string|exists:roles,name',
            'tasks' => 'nullable|array',
            'projects' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first()
            ], 422);
        }

        // $user = User::create([
        //     'name' => $request->name,
        //     'last_name' => $request->last_name,
        //     'email' => $request->email,
        //     'password' => Hash::make($request->password)
        // ]);

        DB::beginTransaction();

        $user = new User();

        $user->name = $request->name;

        $user->last_name = $request->last_name;

        $user->email = $request->email;

        $user->mobile = $request->mobile;

        $user->password = Hash::make($request->password);

        try {
            $user->save();
        } catch (\Throwable $th) {
            DB::rollBack();
            dd($th);
            return response()->json([
                'status' => 'error',
                'error' => 'Error saving user'
            ], 500);
        }

        $user->assignRole(Role::whereName($request->role)->first());

        if (isset($request->tasks)) {
            foreach ($request->tasks as $task) {
                Task::find($task)->addMembers([$user]);
            }
        }

        if (isset($request->projects)) {
            foreach ($request->projects as $project) {
                Project::find($project)->addMembers([$user]);
            }
        }

        DB::commit();
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->getRoleNames(),
            ],
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer|exists:users,id',
            'name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|max:255|unique:users',
            'mobile' => 'nullable|string|max:11|min:11',
            'password' => 'nullable|string|min:6',
            'role' => 'nullable|string|exists:roles,name',
            'tasks' => 'nullable|array',
            'projects' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first()
            ], 422);
        }

        $user = User::find($id);

        $user->name = isset($user->name) ? $request->name : $user->name;

        $user->last_name = isset($user->last_name) ? $request->last_name : $user->last_name;

        $user->email = isset($user->email) ? $request->email : $user->email;

        $user->mobile = isset($user->mobile) ? $request->mobile : $user->mobile;

        $user->password = isset($user->password) ? Hash::make($request->password) : $user->password;

        if ($request->role && !empty($request->role)) {

            $user->role()->detach();

            $role = Role::findByName($request->role);

            $user->assignRole($role);
        }

        if (!empty($request->tasks)) {
            foreach ($request->tasks as $task) {
                Task::find($task)->addMembers([$id]);
            }
        }

        if (!empty($request->projects)) {
            foreach ($request->projects as $project) {
                Project::find($project)->addMember($id);
            }
        }

        $user->save();

        // $user = User::find($request->id);
        // if ($request->name && !empty($request->name)) {
        //     $user->name = $request->name;
        // }
        // if ($request->last_name && !empty($request->last_name)) {
        //     $user->last_name = $request->last_name;
        // }
        // if ($request->email && !empty($request->email)) {
        //     $user->email = $request->email;
        // }

        // $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'User updated successfully',
            'user' => UserResource::make($user),
        ], 200);
    }

    public function changePassword(Request $request, $id)
    { {
            $user = User::find($id);
            if (
                $request->current_password && !empty($request->current_password) && $request->new_password &&
                !empty($request->new_password) && (Auth::id() == $id || Auth::user()->hasRole('admin'))
            ) {
                if (Hash::check($request->current_password, $user->password)) {
                    $user->password = Hash::make($request->new_password);
                } else {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Invalid current password'
                    ]);
                }
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid current password or new password'
                ]);
            }
            $user->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Password changed successfully',
            ], 200);
        }
    }

    public function delete(Request $request)
    {
        $user = User::find($request->id);
        $user->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'User deleted successfully',
        ], 200);
    }

    public function userInfo()
    {
        return response()->json([
            'status' => 'success',
            'message' => 'User data successfully retrieved',
            'user' => UserResource::make(Auth::user())
        ], 200);
    }


    public function index(Request $request)
    {

        if ($request->user_id != null) {
            $users = User::where('id', '!=', 1)
                ->where('id', '=', $request->user_id)
                ->paginate(15);
        } else {

            $users = User::where('name', 'like', '%' . $request->search . '%')
                ->orWhere('last_name', 'like', '%' . $request->search . '%')
                ->orWhere('email', 'like', '%' . $request->search . '%')
                ->paginate(15);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'User found successfully',
            'users' => $users,
        ], 200);
    }

    public function show(Request $request, $id)
    {

        $user = User::findOrFail($id);

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found'
            ], 404);
        }

        $data = UserResource::make($user);

        return response()->json([
            'status' => 'success',
            'message' => 'User found successfully',
            'user' => $data
        ], 200);
    }

    // public function userInfo()
    // {
    //     $user = Auth::user();

    //     return response()->json([
    //         'status' => 'success',
    //         'message' => 'User found successfully',
    //         'user' => [
    //             'id' => $user->id,
    //             'role' => $user->getRoleNames()[0],
    //             'fullName' => "{$user->name} {$user->last_name}",
    //             'userName' => $user->name,
    //             'email' => $user->email,
    //         ]
    //     ], 200);
    // }
}
