<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class userSeeders extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         User::factory(10)->create();
         User::insert([
            'name' => "dosen1",
            'email' => "dosen@gmail.com",
            'role_id' => 2,
            'password' => Hash::make("dosen123"),
        ]);
         User::insert([
            'name' => "Muhammad Husain Al Ghazali",
            'email' => "admin@gmail.com",
            'role_id' => 1,
            'password' => Hash::make("admin123"),
        ]);
    }
}
