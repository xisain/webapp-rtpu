<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class produk_unggulan extends Model
{
    protected $fillable = [
        'name',
        'description',
        'link_video_demo',
        'link_video_pemaparan',
        'main_image',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function gallery()
    {
        return $this->hasMany(ProdukUnggulanGallery::class);
    }
}
