<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HrTeam extends Model
{
    protected $fillable = ['about_us_id', 'name', 'position', 'photo_path'];

    public function aboutUs(): BelongsTo
    {
        return $this->belongsTo(AboutUs::class);
    }
}
