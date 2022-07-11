<?php

namespace App\Models;

use App\Http\Resources\TaskResource;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Laravel\Passport\HasApiTokens;
use Symfony\Component\CssSelector\Node\FunctionNode;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    // ==================================================================================================================================================================
    // ==========================================
    // PROJECT
    // ==========================================
    public function projects()
    {
        return $this->belongsToMany(Project::class, 'project_members', 'member_id', 'project_id');
    }

    public function getUserProjects()
    {
        return $this->projects()->get();
    }

    public function projectsObserving()
    {
        return $this->belongsToMany(Project::class, 'project_observers', 'observer_id', 'project_id');
    }

    // ==========================================
    // TASK
    // ==========================================
    public function tasks()
    {
        return $this->belongsToMany(Task::class, 'task_members', 'member_id', 'task_id');
    }

    public function getUserTasks()
    {
        // return TaskResource::collection($this->tasks);

        $task = $this->tasks()->get();

        return collect($task)->map(function ($task) {
            return collect($task)->only([
                'id',
                'title',
                'description',
                'attachment_urls',
                'project_id',
                'project_title',
                'parent_task_id',
                'priority_id',
                'priority_text',
                'status_id',
                'status_text',
                'estimated_proficiency',
                'proficiency',
                'estimated_time',
                'start_at',
                'end_at',
                'deadline',
                'score',
                'created_at',
                'updated_at',
            ]);
        });
    }

    public function tasksObserving()
    {
        return $this->belongsToMany(Task::class, 'task_observers', 'observer_id', 'task_id');
    }

    public function getObservingTasks()
    {
        return TaskResource::collection($this->tasksObserving);
    }

    // ==========================================
    // POSITION
    // ==========================================
    public function position()
    {
        return $this->belongsTo(Position::class);
    }

    public function getPosition()
    {
        return $this->position->position_text;
    }

    public function changePosition($position_id)
    {
        $this->position_id = $position_id;
        $this->save();
    }

    // ==========================================
    // SCORE
    // ==========================================
    public function score()
    {
        return $this->belongsTo(Score::class);
    }

    public function getScore()
    {
        return $this->score->score_text;
    }
}
