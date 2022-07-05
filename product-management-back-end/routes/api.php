<?php

use App\Http\Controllers\api\v1\ProjectController;
use App\Http\Controllers\api\v1\TaskController;
use App\Http\Controllers\api\v1\UserController;
// use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use App\Models\Project;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/projects/{project}', function (Project $project) {
    return response()->json([
        'status' => 'success',
        'message' => 'Project found',
        'project' => $project->getProjectMembers
    ], 200);
});


Route::post('/login', [UserController::class, 'login']);

// ============================================================================================================================
// ADMIN ROUTES
// ============================================================================================================================
Route::middleware('auth:api', 'admin.middleware')->group(function () {
    Route::post('/project', [ProjectController::class, 'store']);
    Route::delete('/project', [ProjectController::class, 'delete']);
    Route::put('/project/update', [ProjectController::class, 'update']);
    Route::post('/project/delete', [ProjectController::class, 'deleteProperties']);
    
    // User routes ---------------------------------------------------------------------------------------------------------
    Route::post('/user', [UserController::class, 'store']);
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/user/{id}', [UserController::class, 'show']);
    Route::put('/user/{id}', [UserController::class, 'update']);
    Route::put('/user/{id}/password', [UserController::class, 'changePassword']);
    Route::delete('/user/{id}', [UserController::class, 'delete']);
});

// ============================================================================================================================
// user ROUTES
// ============================================================================================================================

Route::middleware('auth:api')->group(function () {
    Route::get('/user-info', [UserController::class, 'userInfo']);

    // task routs ------------------------------------------------------
    Route::post('/task', [TaskController::class, 'store']);
    Route::get('/task/{task_id}', [TaskController::class, 'show']);
    Route::get('/statuses/tasks', [TaskController::class, 'getStatusesTasks']);
    Route::get('/tasks', [TaskController::class, 'index']);
    Route::post('/task/file/upload', [TaskController::class, 'uploadFile']);
    Route::get('/tasks/status', [TaskController::class, 'statusList']);
    Route::get('/tasks/priority', [TaskController::class, 'priorityList']);
    Route::delete('/task', [TaskController::class, 'delete']);
    // Route::get('/task/{id}', [TaskController::class, 'info']);
    Route::put('/task', [TaskController::class, 'update']);

    // project routs ------------------------------------------------------
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::post('/project/addattachment', [ProjectController::class, 'addAttachment']);
    Route::get('/project/members', [ProjectController::class, 'members']);
    Route::get('/project/observers', [ProjectController::class, 'observers']);
    Route::get('/project/{id}', [ProjectController::class, 'info']);
});
