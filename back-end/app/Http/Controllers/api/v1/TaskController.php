<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Priority;
use App\Models\Status;
use App\Models\Task;
use App\Models\TaskAttachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use stdClass;

class TaskController extends Controller
{


    // ==========================================
    // CREATE NEW TASKS
    // ==========================================
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|unique:tasks',
            'description' => 'nullable|string',
            'time' => 'required|integer', #
            'project_id' => 'required|integer|exists:projects,id', #
            'parent_task_id' => 'nullable|integer|exists:tasks,id', #
            'priority_id' => 'required|integer|exists:priorities,id', #
            'status_id' => 'required|integer|exists:statuses,id', #
            'estimated_proficiency' => 'nullable|min:0|max:10|integer',
            'proficiency' => 'nullable|min:0|max:10|integer',
            'deadline' => 'nullable|date',
            'estimated_time' => 'nullable|integer',
            'start_at' => 'nullable|date',
            'end_at' => 'nullable|date',
            'score' => 'required|integer', #
            'task_members' => 'nullable|array', #
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first()
            ], 400);
        }

        DB::beginTransaction();

        try {

            $task = new Task();
            $task->title = $request->title;
            $task->description = $request->description;
            $task->project_id = $request->project_id;
            $task->parent_task_id = $request->parent_task_id;
            $task->priority_id = $request->priority_id;
            $task->status_id = $request->status_id;
            $task->estimated_proficiency = $request->estimated_proficiency;
            $task->proficiency = $request->proficiency;
            $task->deadline = $request->deadline;
            $task->estimated_time = $request->estimated_time;
            $task->time = $request->time;
            $task->score = $request->score;
            $task->save();

            $task->addMembers($request->task_members);
        } catch (\Throwable $th) {

            DB::rollBack();
            return response()->json([
                'error' => $th->getMessage()
            ], 400);
        }

        DB::commit();
        // DB::rollBack();

        return response()->json([
            'message' => 'Task created successfully',
            'task' => new TaskResource($task)
        ], 200);
    }



    // ==========================================
    // GET PROJECT DATA
    // ==========================================
    public function index()
    {
        $user = Auth::user();
        if ($user->hasRole('admin')) {
            $tasks = TaskResource::collection(Task::paginate(15));
        } else {
            TaskResource::collection(Task::whereHas('users', function ($q) {
                $q->where('member_id', Auth::id());
            })->paginate(15));
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Tasks found',
            'tasks' => $tasks
        ], 200);
    }

    public function show(Request $request, $task_id)
    {
        $task = Auth::user()->hasRole('admin') ? Task::findOrFail($task_id) : Task::whereHas('users', function ($q) {
            $q->where('member_id', Auth::id());
        })->findOrFail($task_id);

        if (!$task) {
            return response()->json([
                'error' => 'Task not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Task found',
            // 'test' => 'pedr',
            'task' => TaskResource::make($task)
        ], 200);
    }

    // ==================================================
    // == GET STATUS LIST + ALL TASKS WITH THAT STATUS ==
    // ==================================================
    public function getStatusesTasks()
    {
        $statuses = Status::all();
        $tasks = Auth::user()->hasRole('admin') ? Task::all()
            :
            Task::whereHas('users', function ($q) {
                $q->where('member_id', Auth::id());
            })->get();

        $statuses_tasks = new stdClass();

        // foreach ($statuses as $status) {
        //     $statuses_tasks->{Str::slug($status->status_text)} = [];

        //     foreach ($tasks as $task) {

        //         if ($task->status_id == $status->id) {

        //             array_push($statuses_tasks->{Str::slug($status->status_text)}, $task);
        //         }
        //     }
        // }

        foreach ($statuses as $status) {
            $statuses_tasks->{Str::slug($status->status_text)} = TaskResource::collection(Task::where('status_id', $status->id)->get());
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Tasks found',
            'tasks_statuses' => $statuses_tasks
        ], 200);
    }



    // ==========================================
    // DELETE TASK
    // ==========================================
    public function delete(Request $request, $id)
    {
        $task = Auth::user()->hasRole('admin') ? Task::find($id) : Task::whereHas('users', function ($q) {
            $q->where('member_id', Auth::id());
        })->find($id);

        if (!$task) {
            return response()->json([
                'error' => 'Task not found'
            ], 404);
        }

        $task->delete();

        return response()->json([
            'message' => 'Task deleted successfully',
            'task_id' => $id
        ], 200);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer|exists:tasks,id',
            'title' => 'nullable|string',
            'description' => 'nullable|string',
            'project_id' => 'nullable|integer|exists:projects,id',
            'parent_task_id' => 'nullable|integer|exists:tasks,id',
            'priority_id' => 'nullable|integer|exists:priorities,id',
            'status_id' => 'nullable|integer|exists:statuses,id',
            'estimated_proficiency' => 'nullable|min:0|max:100|integer',
            'proficiency' => 'nullable|min:0|max:100|integer',
            'deadline' => 'nullable|date',
            'estimated_time' => 'nullable|integer',
            'time' => 'nullable|integer',
            'start_at' => 'nullable|date',
            'end_at' => 'nullable|date',
            'score' => 'nullable|integer',
            'task_members' => 'nullable|array',
            'reset_members' => 'nullable|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first()
            ], 422);
        }
        DB::beginTransaction();

        try {

            $task = Task::find($request->id);

            $task->title = isset($request->title) ? $request->title : $task->title;

            $task->description = isset($request->description) ? $request->description : $task->description;

            isset($request->project_id) ? $task->changeProject($request->project_id) : null;

            isset($request->parent_task_id) ? $task->changeParentTask($request->parent_task_id) : null;

            isset($request->priority_id) ? $task->changePriority($request->priority_id) : null;

            isset($request->status_id) ? $task->changeStatus($request->status_id) : $task->status_id;

            $task->estimated_proficiency = isset($request->estimated_proficiency) ? $request->estimated_proficiency : $task->estimated_proficiency;

            $task->proficiency = isset($request->proficiency) ? $request->proficiency : $task->proficiency;

            $task->deadline = isset($request->deadline) ? $request->deadline : $task->deadline;

            $task->estimated_time = isset($request->estimated_time) ? $request->estimated_time : $task->estimated_time;

            $task->time = isset($request->time) ? $request->time : $task->time;

            $task->score = isset($request->score) ? $request->score : $task->score;

            $request->reset_members == 1 ? $task->clearMembers() : null;

            $request->task_members ? $task->addMembers($request->task_members) : null;

            $task->save();

            
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'internal server error'
            ], 500);
        }

        DB::commit();

        return response()->json([
            'status' => 'success',
            'message' => 'Task updated successfully'
        ], 200);
    }



    // ==========================================
    // TASK ATTACHMENTS
    // ==========================================
    public function addAttachment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'task_id' => 'required|integer|exists:tasks,id',
            'file' => 'required|file|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first()
            ], 422);
        }

        $task = Task::find($request->task_id);

        $task->addAttachment($request->file('file'));

        return response()->json([
            'status' => 'success',
            'message' => 'File uploaded successfully',
            'task' => TaskResource::make($task),
        ], 200);
    }

    public function attachmentsList(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'search' => 'nullable|string',
            'task_id' => 'nullable|integer|exists:tasks,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first()
            ], 422);
        }

        if ($request->task_id) {
            $task = Task::find($request->task_id);
            $attachments = $task->task_attachments;
        } else if ($request->search) {
            $attachments = TaskAttachment::where('title', 'like', '%' . $request->search . '%')->get();
        } else {
            $attachments = TaskAttachment::all();
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Attachments list',
            'attachments' => $attachments
        ], 200);
    }

    public function removeAttachment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer|exists:tasks,id',
            'attachment_id' => 'required|integer|exists:task_attachments,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first()
            ], 422);
        }

        $task->removeAttachment($request->attachment_id);

        return response()->json([
            'status' => 'success',
            'message' => 'Attachment deleted successfully'
        ], 200);
    }

    // ===============================================================================================================================================================
    // ===============================================================================================================================================================
    // ===============================================================================================================================================================

    public function statusList()
    {
        $statuses = Status::all();

        return response()->json([
            'status' => 'success',
            'message' => 'Statuses list',
            'tasks' => $statuses
        ], 200);
    }

    public function priorityList()
    {
        $priority = Priority::all();

        return response()->json([
            'status' => 'success',
            'message' => 'Priority list',
            'tasks' => $priority
        ], 200);
    }

    public function completeTaskList()
    {
        $tasks = Task::where('status_id', 6)->paginate(15);

        return response()->json([
            'status' => 'success',
            'message' => 'task list',
            'tasks' => $tasks
        ], 200);
    }

    public function doingTaskList()
    {
        $tasks = Task::where('status_id', 3)->paginate(15);

        return response()->json([
            'status' => 'success',
            'message' => 'task list',
            'tasks' => $tasks
        ], 200);
    }

    public function waitingListTask()
    {
        $tasks = Task::where('status_id', 5)->paginate(15);

        return response()->json([
            'status' => 'success',
            'message' => 'task list',
            'tasks' => $tasks
        ], 200);
    }

    public function todoListTasks()
    {
        $tasks = Task::where('status_id', 2)->paginate(15);

        return response()->json([
            'status' => 'success',
            'message' => 'task list',
            'tasks' => $tasks
        ], 200);
    }

    // public function info($id)
    // {

    //     $task = Task::find($id);

    //     return response()->json([
    //         'status' => 'success',
    //         'message' => 'task find',
    //         'tasks' => TaskResource::make($task)
    //     ], 200);
    // }
}
