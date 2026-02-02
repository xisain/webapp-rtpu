<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class aboutus extends Model
{
    protected $table = 'about_us';

    protected $fillable = [
        'image',
        'role',
        'nama',
    ];
}
