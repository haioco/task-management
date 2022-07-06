<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Priority;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use stdClass;

class ProjectController extends Controller
{
    // =====================================================================================================
    // CREATE PROJECT
    // =====================================================================================================
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'nullable|string|max:100|unique:projects',

            'description' => 'nullable|string|max:500',

            'department_id' => 'required|integer',

            'supervisor_id' => 'required|integer',

            'priority_id' => 'required|integer',

            'observers' => 'nullable|array',

            'members' => 'nullable|array',

            'advantages' => 'nullable|array',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first()
            ], 400);
        }


        $project = new Project();

        $project->title = $request->title;

        $project->description = isset($request->description) ? $request->description : null;

        $project->supervisor_id = $request->supervisor_id;

        $project->priority_id = $request->priority_id;

        $project->save();

        if (isset($request->observers) && !empty($request->observers)) {
            // foreach ($request->members as $member) {
            //     $project->members()->attach($member);
            // }
            foreach ($request->observers as $observer) {
                $project->addObserver($observer);
            }
        }
        if (isset($request->members) && !empty($request->members)) {
            // foreach ($request->observers as $observer) {
            //     $project->observers()->attach($observer);
            // }
            foreach ($request->members as $member) {
                $project->addMember($member);
            }
        }
        if (isset($request->advantages) && !empty($request->advantages)) {
            // foreach ($request->advantage as $advantage) {
            //     $project->advantages()->attach($advantage);
            // }
            foreach ($request->advantages as $advantage) {
                $project->addAdvantage($advantage);
            }
        }


        return response()->json([
            'status' => 'success',
            'message' => 'Project created successfully',
            'project' => $project
        ], 200);
    }


    // =====================================================================================================
    // ADD ATTACHMENT TO PROJECT
    // =====================================================================================================
    public function addAttachment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'project_id' => 'required|integer|exists:projects,id',
            
            'attachment' => 'required|file|mimes:jpeg,png,jpg,gif,svg,pdf,doc,docx,xls,xlsx,ppt,pptx,zip,rar',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()
            ], 422);
        }

        $project = Project::findOrFail($request->get('project_id'));

        $project->addAttachment($request->file('attachment'));

        return response()->json([
            'status' => 'success',
            'message' => 'Attachment added successfully',
            'project' => $project
        ], 200);

        // --------------------------------------------------------------------------------------------

        // $attach_names = [];

        // foreach ($request->attachment as $attachment) {
        //     try {

        //         $project->addAttachment($attachment);

        //         array_push($attach_names, utf8_decode($attachment->getClientOriginalName()));
        //     } catch (\Throwable $th) {

        //         $attachment_name = utf8_decode($attachment->getClientOriginalName());

        //         return response()->json([
        //             'status' => 'error',
        //             'message' => "failed to store file {$attachment_name}",
        //         ], 422);
        //     }
        // }

        // return response()->json([
        //     'status' => 'success',
        //     'message' => 'attachment successfully stored',
        //     'data' => $attach_names
        // ], 200);
        // --------------------------------------------------------------------------------------------
    }



    // =====================================================================================================
    // GET PROJECT INFO:
    // =====================================================================================================
    public function info($id)
    {
        try {
            $project = Project::find($id);
            $project_info = new ProjectResource($project);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Project not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'project info successfully retrived',
            'data' => $project_info
        ], 200);
    }

    // =====================================================================================================
    // SEARCH IN PROJECTS:
    // =====================================================================================================
    public function index(Request $request)
    {
        // $priorities_count = Priority::count();

        $validator = Validator::make($request->all(), [
            // 'id' => 'nullable|integer',
            'search' => 'nullable|string|max:100',
            // 'priority_id' => "nullable|integer|min:1|max:$priorities_count",
        ]);


        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first()
            ], 400);
        }

        // if ($request->id != null) {
        //     $projects = Project::where('id', '=', $request->id)->get();
        // }

        if (Auth::user()->hasRole('admin')) {
            $projects = $this->adminProjectSearch($request->search);
        }

        if (Auth::user()->hasRole('employee')) {
            $projects = $this->employeeProjectSearch($request->search);
        }

        return response()->json([
            'status' => 'projects successfully retrieved',
            'data' => $projects
        ], 200);
    }

    // =====================================================================================================
    // GET PROJECT MEMBERS:
    // =====================================================================================================
    public function members(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'project_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first()
            ], 400);
        }

        $members = Project::findOrFail($request->get('project_id'))->members;

        return response()->json([
            'status' => 'members successfully retrieved',
            'data' => $members
        ], 200);
    }

    // =====================================================================================================
    // GET PROJECT OBSERVERS:
    // =====================================================================================================
    public function observers(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'project_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first()
            ], 400);
        }

        $observers = Project::findOrFail($request->get('project_id'))->observers;

        return response()->json([
            'status' => 'observers successfully retrieved',
            'data' => $observers
        ], 200);
    }

    // =====================================================================================================
    // UPDATE PROJECT
    // =====================================================================================================
    public function update(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'id' => 'required|integer|exists:projects,id',

            'title' => 'nullable|string|max:100|unique:projects',

            'description' => 'nullable|string|max:500',

            'supervisor_id' => 'nullable|integer',

            'priority_id' => 'nullable|integer',

            'members' => 'nullable|array',

            'observers' => 'nullable|array',

            'advantages' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first()
            ], 400);
        }

        // try {
        //     $project = Project::findOrFail($request->id);
        // } catch (\Throwable $th) {
        //     return response()->json([
        //         'status' => 'error',
        //         'message' => 'Project not found'
        //     ], 404);
        // }

        $project = Project::findOrFail($request->id);

        if ($request->title && !empty($request->title)) {
            $project->title = $request->title;
        }

        if ($request->description && !empty($request->description)) {
            $project->description = $request->description;
        }

        if ($request->supervisor_id && !empty($request->supervisor_id)) {
            $project->supervisor_id = $request->supervisor_id;
        }

        if ($request->priority_id && !empty($request->priority_id)) {
            $project->priority_id = $request->priority_id;
        }

        if (isset($request->observers) && !empty($request->observers)) {
            foreach ($request->observers as $observer) {
                $project->addObserver($observer);
            }
        }
        if (isset($request->members) && !empty($request->members)) {
            foreach ($request->members as $member) {
                $project->addMember($member);
            }
        }
        if (isset($request->advantages) && !empty($request->advantages)) {
            foreach ($request->advantages as $advantage) {
                $project->addAdvantage($advantage);
            }
        }

        $project->save();

        return response()->json([
            'status' => 'success',
            'message' => trans('project.message.create succeed'),
            'project' => $project
        ], 200);
    }

    // =====================================================================================================
    // UPDATE PROJECT DEPARTMENT    
    // =====================================================================================================
    public function updateDepartment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer',
            'department_id' => 'required|integer|exists:departments,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first()
            ], 400);
        }

        try {
            $project = Project::findOrFail($request->id);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Project not found'
            ], 404);
        }

        $project->department_id = $request->department_id;
        $project->save();

        return response()->json([
            'status' => 'success',
            'message' => "Project's department successfully updated",
            'project' => $project
        ], 200);
    }

    // =====================================================================================================
    // DELETE PROJECT
    // =====================================================================================================
    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'project_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first()
            ], 400);
        }

        // $project = Project::find($request->id);
        // $project = Project::find($request->project_id);
        Project::destroy($request->project_id);

        return response()->json([
            'status' => 'success',
            'message' => 'project successfully deleted'
        ], 200);
    }

    // =======================================================================================================
    // DELETE MEMBERS
    // =======================================================================================================
    public function deleteProperties(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'project_id' => 'required|integer',
            'members' => 'required|array',
            'observers' => 'required|array',
            'advantages' => 'required|array'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first()
            ], 400);
        }

        $project = Project::find($request->project_id);

        $deleted_items = new stdClass();
        $deleted_items->members = [];
        $deleted_items->observers = [];
        $deleted_items->advantages = [];

        if (isset($request->members) && !empty($request->members)) {
            foreach ($request->members as $member_id) {
                $project->removeMember($member_id);
                array_push($deleted_items->members, $member_id);
            }
        }

        if (isset($request->observers) && !empty($request->observers)) {
            foreach ($request->observers as $observer) {
                $project->removeObserver($observer);
                array_push($deleted_items->observers, $observer);
            }
        }

        if (isset($request->advantages) && !empty($request->advantages)) {
            foreach ($request->advantages as $advantage) {
                $project->removeAdvantage($advantage);
                array_push($deleted_items->advantages, $advantage);
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'project items successfully deleted',
            'deleted_items' => $deleted_items
        ], 200);
    }

    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================
    private function adminProjectSearch($search)
    {
        if ($search) {
            $projects = Project::where('title', 'like', '%' . $search . '%')
                ->orWhere('description', 'like', '%' . $search . '%')
                ->orWhere('supervisor_id', 'like', '%' . $search . '%')
                ->orWhere('priority_id', 'like', '%' . $search . '%')
                ->paginate(15);
            return ProjectResource::collection($projects);
        } else {
            $projects = Project::paginate(15);
            return ProjectResource::collection($projects);
        }



        // foreach ($projects as $project) {
        //     array_push($data, [
        //         'id' => $project->id,
        //         'title' => $project->title,
        //         'description' => $project->description,
        //         'supervisor_id' => $project->supervisor_id,
        //         'priority_id' => $project->priority_id,
        //         'members' => $project->members,
        //         'observers' => $project->observers,
        //         'advantages' => $project->advantages,
        //     ]);
        // }



    }

    private function employeeProjectSearch($search)
    {
        if ($search && !empty($search)) {
            $projects = Project::where('title', $search)
                ->orWhere('description', $search)
                ->orWhere('supervisor_id', $search)
                ->orWhere('priority_id', $search)
                ->members()->where('user_id', Auth::id())->pagination(15);
        } else {
            $projects = Project::all()->members()->where('user_id', Auth::id())->pagination(15);
        }

        return $projects;
    }
}
