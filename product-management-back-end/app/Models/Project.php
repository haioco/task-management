<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ProjectAttachment;
use App\Models\Department;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class Project extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    // ==========================================
    // PROJECT DATA AND INSIGHTS
    // ==========================================
    public function spentHours()
    {
        $tasks = $this->getProjectTasks();
        $spent_hours = 0;
        if (!empty($tasks) && $tasks->count() > 0) {

            foreach ($tasks as $task) {
                $spent_hours += $task->end_at - $task->start_at;
            }
        }
        return $spent_hours;
    }

    public function projectProgress()
    {
        $tasks = $this->getProjectTasks();
        $completed_tasks = 0;
        if (!empty($tasks) && $tasks->count() > 0) {

            foreach ($tasks as $task) {
                if ($task->status_id == 8) {
                    $completed_tasks++;
                }
            }
            $percentage = ($completed_tasks / count($tasks)) * 100;
        }
            return
                [
                    'percentage' => isset($percentage) && $percentage != null ? $percentage : 0,
                    'completed_tasks' => $completed_tasks,
                    'total_tasks' => count($tasks)
                ];
    }

    public function projectParticipation()
    {
        $users = User::all()->count();
        $projectUsers = $this->getProjectMembers();
        $participantPercent = (count($projectUsers) / $users) * 100;
        return
            [
                'user_percentage' => $participantPercent,
                'project_users' => count($projectUsers)
            ];
    }



    // ==========================================
    // SUPERVISOR
    // ==========================================
    public function supervisor()
    {
        return $this->belongsTo(User::class, 'supervisor_id');
    }

    public function getProjectSupervisor()
    {
        return $this->supervisor()->first();
    }

    public function chnageSupervisor($supervisor_id)
    {
        $this->supervisor_id = $supervisor_id;
        $this->save();
    }

    // ==========================================
    // MEMBERS
    // ==========================================
    public function members()
    {
        return $this->belongsToMany(User::class, 'project_members', 'project_id', 'member_id');
    }

    public function getProjectMembers()
    {
        return $this->members()->get();
    }

    public function addMember($user_id)
    {
        $this->members()->attach($user_id);
        $this->members()->sync($user_id);
    }

    public function removeMember($user_id)
    {
        $this->members()->detach($user_id);
    }

    // ==========================================
    // OBSERVERS
    // ==========================================
    public function observers()
    {
        return $this->belongsToMany(User::class, 'project_observers', 'project_id', 'observer_id');
    }

    public function getProjectObservers()
    {
        return $this->observers()->get();
    }

    public function addObserver($observer_id)
    {
        $this->observers()->attach($observer_id);
        $this->observers()->sync($observer_id);
    }

    public function removeObserver($observer_id)
    {
        $this->observers()->detach($observer_id);
    }

    // ==========================================
    // ADVANTAGES
    // ==========================================
    public function advantages()
    {
        return $this->hasMany(Advantage::class, 'project_id');
    }

    public function getProjectAdvantages()
    {
        return $this->advantages()->get();
    }

    public function addAdvantage($advantage_name)
    {
        // $advantage = new Advantage;

        // $advantage->project_id = $this->id;

        // $advantage->advantages = $advantage_name;

        $this->advantages()->create([
            'project_id' => $this->id,

            'advantage' => $advantage_name
        ]);
    }

    public function removeAdvantage($advantage_id)
    {
        $advantage = Advantage::findOrFail($advantage_id);
        $advantage->delete();
    }

    // ==========================================
    // PRIORITY
    // ==========================================
    public function priority()
    {
        return $this->belongsTo(Priority::class, 'priority_id');
    }

    public function getProjectPriority()
    {
        return $this->priority()->get();
    }

    public function changePriority($priority_id)
    {
        $this->priority_id = $priority_id;
        $this->save();
    }

    // ==========================================
    // TASKS
    // ==========================================
    public function tasks()
    {
        return $this->hasMany(Task::class, 'project_id');
    }

    public function getProjectTasks()
    {
        return $this->tasks()->get();
    }

    public function addTask($task_id)
    {
        $this->tasks()->attach($task_id);
    }

    public function removeTask($task_id)
    {
        $this->tasks()->detach($task_id);
    }

    // ==========================================
    // ATTACHMENT
    // ==========================================
    public function attachments()
    {
        return $this->hasMany(ProjectAttachment::class, 'project_id');
    }

    public function getProjectAttachments($search='')
    {
        if (isset($search) && $search != '') {
            return $this->attachments()->where('name', 'like', '%' . $search . '%')->get();
        } else {
            return $this->attachments()->get();
        }
    }

    public function addAttachment($attachment)
    {
        $name = $attachment->getClientOriginalName();

        $path = Storage::putFile("public/projects/{$this->id}", $attachment);

        $this->attachments()->create([
            'name' => $name,

            'project_id' => $this->id,

            'uploaded_by' => Auth::id(),

            'url' => Storage::url($path),

            'path' => $path,
        ]);
    }

    public function removeAttachment($attachment_id)
    {
        $attachment = ProjectAttachment::findOrFail($attachment_id);

        Storage::delete($attachment->path);

        $attachment->delete();
    }

    // ==========================================
    // DEPARTMENT
    // ==========================================
    public function department(){
        return $this->belongsTo(Department::class, 'department_id');
    }

    public function getDepartment(){
        return $this->department()->get();
    }

    public function changeDepartment($department_id){
        try {
            $department = Department::findOrFail($department_id);
        } catch (\Throwable $th) {
            return false;
        }
        $this->department_id = $department_id;
        $this->save();
    }
    
}
