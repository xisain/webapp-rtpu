<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class produk_inovasi_fitur_utama extends Model
{
     protected $fillable = [
        'nama_fitur',
        'produk_inovasi_id',
     ];
     protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
     public function produkInovasi()
    {
        return $this->belongsTo(produk_inovasi::class, 'produk_inovasi_id');
    }
}
