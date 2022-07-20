<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    // ==========================================
    // TASK
    // ==========================================
    public function task()
    {
        return $this->belongsTo(Task::class);
    }

    // ==========================================
    // USER
    // ==========================================
    public function users()
    {
        return $this->belongsTo(User::class);
    }

    // ==========================================
    // SCORE
    // ==========================================
    public function scores()
    {
        return
    }
}
