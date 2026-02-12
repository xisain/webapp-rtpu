<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement('ALTER TABLE about_us MODIFY COLUMN image VARCHAR(255) NULL');
        DB::statement('ALTER TABLE about_us MODIFY COLUMN role ENUM("ketua RTPU", "Sekertaris RPTU", "Admin RTPU") NULL');
        DB::statement('ALTER TABLE about_us MODIFY COLUMN nama VARCHAR(255) NULL');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('ALTER TABLE about_us MODIFY COLUMN image VARCHAR(255) NOT NULL');
        DB::statement('ALTER TABLE about_us MODIFY COLUMN role ENUM("ketua RTPU", "Sekertaris RPTU", "Admin RTPU") NOT NULL');
        DB::statement('ALTER TABLE about_us MODIFY COLUMN nama VARCHAR(255) NOT NULL');
    }
};

