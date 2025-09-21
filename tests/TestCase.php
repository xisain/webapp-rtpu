<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
{
    parent::setUp();

    // Jalankan migration
    $this->artisan('migrate');
    $this->seed(\Database\Seeders\RoleSeeder::class);

}
}
