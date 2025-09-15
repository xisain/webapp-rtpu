<?php

use App\Http\Controllers\ProdukUnggulanController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\AdminMiddleware;
// Default Route
// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::get('/', function () {
    return Inertia::render('UI-VIEW/portal');
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
        Route::post('produk-unggulan/store', [\App\Http\Controllers\ProdukUnggulanController::class, 'store'])->name('admin.produk-unggulan.store');
    });
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get("portal",function(){
        return Inertia::render('UI-VIEW/portal');
    });
});

// Routing For User Guest
Route::get('detail-produk-unggulan/{id}', [ProdukUnggulanController::class, 'show'])->name('detail-produk-unggulan');

Route::get('pu', function () {
    return Inertia::render('UI-VIEW/pu');
})->name('pu');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
