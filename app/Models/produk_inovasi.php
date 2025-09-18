<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class produk_inovasi extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'produk_inovasis';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'keunggulan_produk',
        'images',
        'user_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Relationship: ProdukInovasi belongs to User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relationship: ProdukInovasi has many FiturUtama
     */
    public function fiturUtama()
    {
        return $this->hasMany(produk_inovasi_fitur_utama::class, 'produk_inovasi_id');
    }
}
