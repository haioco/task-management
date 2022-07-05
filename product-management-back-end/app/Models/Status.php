<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public static function getId($value)
    {
        try {
            $status = Status::where('status_text', $value)->firstOrFail();
            return $status->id;
        } catch (\Exception $e) {
            return null;
        }

    }
}
