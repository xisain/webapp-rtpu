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
        Schema::create('produk_unggulans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->string('link_video_demo')->nullable(true);
            $table->string('link_video_pemaparan')->nullable(true);
            $table->string('main_image');
            $table->timestamps();
        });
        Schema::create('produk_unggulan_gallerys', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('produk_unggulan_id');
            $table->string('image_path');
            $table->timestamps();
            $table->foreign('produk_unggulan_id')->references('id')->on('produk_unggulans')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produk_unggulans');
        Schema::dropIfExists('produk_unggulan_gallerys');
    }
};
