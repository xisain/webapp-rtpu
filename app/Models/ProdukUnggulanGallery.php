<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdukUnggulanGallery extends Model
{
    use HasFactory;

    protected $fillable = [
        'produk_unggulan_id',
        'image_path',
    ];

    public function produkUnggulan()
    {
        return $this->belongsTo(produk_unggulan::class);
    }
}
