<?php

use App\Http\Controllers\ProdukUnggulanController;
use App\Http\Controllers\ProdukInovasiController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\DosenMiddleware;
// Default Route
// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::get('/', [\App\Http\Controllers\portalController::class,'index'])->name('home');
Route::get('/pu', [\App\Http\Controllers\portalController::class,'showList'])->name('produk_unggulan');
Route::get('/pi', [\App\Http\Controllers\portalController::class,'showPI'])->name('produk_inovasi');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    // Routing For Admin
    Route::prefix('admin')->middleware([AdminMiddleware::class ])->group(function ()
    {
        Route::get('/', [\App\Http\Controllers\portalController::class, 'adminpanel'])->name('admin.index');
        Route::get('roles', [\App\Http\Controllers\RoleController::class, 'index'])->name('admin.roles');
        // User Routing For Admin
        Route::prefix('users')->group(function (){
            Route::get('/', [\App\Http\Controllers\UserController::class, 'index'])->name('admin.users');
            Route::get('create', [\App\Http\Controllers\UserController::class, 'create'])->name('admin.create-users');
            Route::get('/edit/{id}', [\App\Http\Controllers\UserController::class, 'edit'])->name('admin.edit-users');
            Route::post('/',[\App\Http\Controllers\UserController::class, 'store'])->name('admin.store-users');
            Route::delete('/delete/{id}',[\App\Http\Controllers\UserController::class, 'destroy'])->name('admin.destroy-users');

        });
        // Produk Unggulan Routing For Admin
        Route::prefix('produk-unggulan')->group(function ()
        {
            Route::get('/', [\App\Http\Controllers\ProdukUnggulanController::class, 'index'])->name('admin.produk-unggulan');
            Route::get('/create', [\App\Http\Controllers\ProdukUnggulanController::class, 'create'])->name('admin.produk-unggulan.create');
            Route::post('/store', [\App\Http\Controllers\ProdukUnggulanController::class, 'store'])->name('admin.produk-unggulan.store');
            Route::delete('/{id}', [\App\Http\Controllers\ProdukUnggulanController::class, 'destroy'])->name('admin.produk-unggulan.delete');
        });
        Route::prefix('produk-inovasi')->group(function ()
        {
            Route::get('/', [\App\Http\Controllers\ProdukInovasiController::class, 'index'])->name('admin.produk-inovasi');
            Route::get('/create', [\App\Http\Controllers\ProdukInovasiController::class, 'create'])->name('admin.produk-inovasi.create');
            Route::post('/store', [\App\Http\Controllers\ProdukInovasiController::class, 'store'])->name('admin.produk-inovasi.store');
            Route::delete('/{id}', [\App\Http\Controllers\ProdukInovasiController::class, 'destroy'])->name('admin.produk-inovasi.delete');

        });


    });
    Route::prefix('dosen')->middleware(DosenMiddleware::class)->group(function () {
        Route::prefix('produk-unggulan')->group(function ()
    {
        Route::get('/', [\App\Http\Controllers\ProdukUnggulanController::class, 'index'])->name('dosen.produk-unggulan');
        Route::get('/create', [\App\Http\Controllers\ProdukUnggulanController::class, 'create'])->name('dosen.produk-unggulan.dosen-create');
        Route::post('/store', [\App\Http\Controllers\ProdukUnggulanController::class, 'store'])->name('dosen.produk-unggulan.dosen-store');
        Route::delete('/{id}', [\App\Http\Controllers\ProdukUnggulanController::class, 'destroy'])->name('dosen.produk-unggulan.dosen-delete');
    });
    Route::prefix('produk-inovasi')->group(function ()
    {
        Route::get('/', [\App\Http\Controllers\ProdukInovasiController::class, 'index'])->name('dosen.produk-inovasi');
        Route::get('/create', [\App\Http\Controllers\ProdukInovasiController::class, 'create'])->name('dosen.produk-inovasi.dosen-create');
        Route::post('/store', [\App\Http\Controllers\ProdukInovasiController::class, 'store'])->name('dosen.produk-inovasi.dosen-store');
        Route::delete('/{id}', [\App\Http\Controllers\ProdukInovasiController::class, 'destroy'])->name('dosen.produk-inovasi.dosen-delete');

    });
    });
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get("portal",function(){
        return Inertia::render('UI-VIEW/portal');
    });
});

// Routing For User Guest
Route::get('detail-produk-unggulan/{id}', [ProdukUnggulanController::class, 'show'])->name('detail-produk-unggulan');
Route::get('pi', function () {
    return Inertia::render('UI-VIEW/pi');
})->name('pi');
Route::get('detail-produk-inovasi/{id}', [ProdukInovasiController::class, 'show'])->name('detail-produk-inovasi');



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
