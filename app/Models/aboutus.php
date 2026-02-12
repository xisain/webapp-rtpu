<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AboutUs extends Model
{
    protected $table = 'about_us';

    protected $fillable = [
        'image',
        'role',
        'nama',
        'section_title',
        'section_description',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function hrTeams(): HasMany
    {
        return $this->hasMany(HrTeam::class);
    }
}
