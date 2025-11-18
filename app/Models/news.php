<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    /**
     * The table associated with the model.
     */
    protected $table = 'news';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int,string>
     */
    protected $fillable = [
        'judul',
        'image_links',
        'description',
    ];

    /**
     * Enable timestamps (created_at, updated_at).
     *
     * @var bool
     */
    public $timestamps = true;
}
