<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\AdminMiddleware;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    // Routing For Admin
    Route::prefix('admin')->middleware(['auth',AdminMiddleware::class ])->group(function ()
    {
        Route::get('/', function () {
            return Inertia::render('admin/admindashboard');
        })->name('admin.index');
        Route::get('roles', [\App\Http\Controllers\RoleController::class, 'index'])->name('admin.roles');
        // User Routing For Admin
        Route::get('users', [\App\Http\Controllers\UserController::class, 'index'])->name('admin.users');
        // Produk Unggulan Routing For Admin
        Route::get('produk-unggulan', [\App\Http\Controllers\ProdukUnggulanController::class, 'index'])->name('admin.produk-unggulan');
        Route::get('produk-unggulan/create', [\App\Http\Controllers\ProdukUnggulanController::class, 'create'])->name('admin.produk-unggulan.create');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
