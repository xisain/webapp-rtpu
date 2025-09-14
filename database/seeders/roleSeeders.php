<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class roleSeeders extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
           DB::table('roles')->insert([
            ['name' => 'admin',
            'created_at' => now(),'updated_at'=> now()
        ],
            ['name' => 'dosen',
            'created_at' => now(),
            'updated_at'=> now()],
            ['name' => 'peserta','created_at' => now(),'updated_at'=> now()],
        ]);
    }
}
