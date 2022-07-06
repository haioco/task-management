<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    // ==========================================
    // DEPARTMENT LOGS
    // ==========================================
    public function departmentLogs()
    {
        return $this->hasMany(DepartmentLog::class);
    }

    

    // ==========================================
    // PROJECT LOGS
    // ==========================================
    
    // ==========================================
    // TASKS LOGS
    // ==========================================

    // ==========================================
    // USER LOGS
    // ==========================================
}
