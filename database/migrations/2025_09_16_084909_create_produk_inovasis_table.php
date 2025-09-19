<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('produk_inovasis', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description'); // Ubah ke text dan lowercase
            $table->text('keunggulan_produk');
            $table->string('images');
            $table->string('pdf')->nullable(); 
            $table->unsignedBigInteger('user_id'); // Tambahkan kolom user_id
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('produk_inovasi_fitur_utamas', function (Blueprint $table) {
            $table->id();
            $table->string('nama_fitur');
            $table->unsignedBigInteger('produk_inovasi_id'); // Tambahkan kolom sebelum foreign key
            $table->foreign('produk_inovasi_id')->references('id')->on('produk_inovasis')->onDelete('cascade'); // Perbaiki nama tabel
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produk_inovasi_fitur_utamas'); // Drop child table first
        Schema::dropIfExists('produk_inovasis');
    }
};
