<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Project;

class Department extends Model
{
    use HasFactory;

    
    // ==========================================
    // PROJECTS
    // ==========================================
    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function getDepartmentProjects()
    {
        return $this->projects()->get();
    }

    // ==========================================
    // TASKS
    // ==========================================
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function getDepartmentTasks()
    {
        return $this->tasks()->get();
    }



    // ==========================================
    // USERS
    // ==========================================
    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function getDepartmentUsers()
    {
        return $this->users()->get();
    }
}
