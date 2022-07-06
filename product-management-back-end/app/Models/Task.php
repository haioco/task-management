<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\TaskAttachment;

class Task extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    protected $appends = ['status_text', 'priority_text'];

    // ==========================================
    // USER
    // ==========================================
    public function users()
    {
        return $this->belongsToMany(User::class, 'task_members', 'task_id', 'member_id');
    }

    public function addMembers($members_id)
    {
        foreach ($members_id as $member_id) {
            $this->users()->attach($member_id);
            $this->users()->sync($member_id, false);
        }
    }

    // ==========================================
    //  MEMBERS
    // ==========================================
    public function task_members()
    {
        return $this->belongsToMany(User::class, 'task_members', 'task_id', 'member_id');
    }

    public function clearMembers()
    {
        $this->task_members()->detach();
    }

    public function getMembers()
    {
        return $this->task_members()->get()->pluck('name', 'id');
    }

    // ==========================================
    // OBSERVES
    // ==========================================
    public function task_observers()
    {
        return $this->belongsToMany(User::class, 'task_observers', 'task_id', 'observer_id');
    }

    public function clearObservers()
    {
        $this->task_observers()->detach();
    }

    public function getObservers()
    {
        return $this->task_observers()->get()->pluck('name', 'id');
    }


    // ==========================================
    // STATUSES
    // ==========================================
    public function status()
    {
        return $this->belongsTo(Status::class, 'status_id');
    }

    public function getStatusTextAttribute()
    {
        return $this->status->status_text;
    }

    public function changeStatus($status_id)
    {
        $this->status_id = $status_id;
        $this->save();
    }


    // ==========================================
    // PRIORITY
    // ==========================================
    public function priority()
    {
        return $this->belongsTo(Priority::class);
    }

    public function getPriorityTextAttribute()
    {
        return $this->priority->priority_text;
    }

    // ==========================================
    // ATTACHMENTS
    // ==========================================
    public function attachments()
    {
        return $this->hasMany(TaskAttachment::class);
    }

    public function addAttachments($attachment)
    {
        $path = Storage::putFile('public/tasks/' . $task->id, $attachment);
            $url = Storage::url($path);
            $name = $attachment->getClientOriginalName();
            $taskAttachment = new TaskAttachment();
            $taskAttachment->task_id = $task->id;
            $taskAttachment->uploaded_by = Auth::id();
            $taskAttachment->path = $path;
            $taskAttachment->url = $url;
            $taskAttachment->name = $name;
            $taskAttachment->save();

        $this->attachments()->create($attachment);
    }

    // attachment_urls

    // ===================================================================================
    public function subTasks()
    {
        return $this->hasMany(Task::class, 'parent_task_id');
    }

    public function parentTask()
    {
        return $this->belongsTo(Task::class, 'parent_task_id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
