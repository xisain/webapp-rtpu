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
Route::get('detail-produk-unggulan/{id}', [ProdukUnggulanController::class, 'show'])->name('detail-produk-unggulan');
Route::get('detail-produk-inovasi/{id}', [ProdukInovasiController::class, 'show'])->name('detail-produk-inovasi');
Route::get('/produk-inovasi/pdf/{filename}', [ProdukInovasiController::class, 'downloadPdf'])->name('produk-inovasi.pdf');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\portalController::class,'dashboard'])->name('dashboard');
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
            Route::post('/', [\App\Http\Controllers\UserController::class, 'store'])->name('admin.store-users');
            Route::put('/{id}', [\App\Http\Controllers\UserController::class, 'update'])->name('admin.update-users'); // Added PUT route for updates
            Route::delete('/delete/{id}', [\App\Http\Controllers\UserController::class, 'destroy'])->name('admin.destroy-users');

        });
        // Produk Unggulan Routing For Admin
        Route::prefix('produk-unggulan')->group(function ()
        {
        Route::get('/', [\App\Http\Controllers\ProdukUnggulanController::class, 'index'])->name('admin.produk-unggulan');
        Route::get('/create', [\App\Http\Controllers\ProdukUnggulanController::class, 'create'])->name('admin.produk-unggulan.create-PU');
        Route::post('/store', [\App\Http\Controllers\ProdukUnggulanController::class, 'store'])->name('admin.produk-unggulan.store-PU');
        Route::get('/edit/{id}', [\App\Http\Controllers\ProdukUnggulanController::class, 'edit'])->name('admin.produk-unggulan.edit-PU'); // New
        Route::put('/update/{id}', [\App\Http\Controllers\ProdukUnggulanController::class, 'update'])->name('admin.produk-unggulan.update-PU'); // New
        Route::delete('/{id}', [\App\Http\Controllers\ProdukUnggulanController::class, 'destroy'])->name('admin.produk-unggulan.delete-PU');
        });
        Route::prefix('produk-inovasi')->group(function ()
        {
            Route::get('/', [\App\Http\Controllers\ProdukInovasiController::class, 'index'])->name('admin.produk-inovasi');
            Route::get('/create', [\App\Http\Controllers\ProdukInovasiController::class, 'create'])->name('admin.produk-inovasi.create');
            Route::post('/store', [\App\Http\Controllers\ProdukInovasiController::class, 'store'])->name('admin.produk-inovasi.store');
            Route::get('/edit/{id}', [\App\Http\Controllers\ProdukInovasiController::class, 'edit'])->name('admin.produk-inovasi.edit');
            Route::put('/{id}/update', [\App\Http\Controllers\ProdukInovasiController::class, 'update'])->name('admin.produk-inovasi.update');
            Route::delete('/{id}', [\App\Http\Controllers\ProdukInovasiController::class, 'destroy'])->name('admin.produk-inovasi.delete');
        });

        // News Routing For Admin
        Route::prefix('news')->group(function () {
            Route::get('/', [\App\Http\Controllers\NewsController::class, 'index'])->name('admin.news');
            Route::get('/create', [\App\Http\Controllers\NewsController::class, 'create'])->name('admin.news.create');
            Route::post('/store', [\App\Http\Controllers\NewsController::class, 'store'])->name('admin.news.store');
            Route::get('/edit/{news}', [\App\Http\Controllers\NewsController::class, 'edit'])->name('admin.news.edit');
            Route::put('/update/{news}', [\App\Http\Controllers\NewsController::class, 'update'])->name('admin.news.update');
            Route::delete('/{news}', [\App\Http\Controllers\NewsController::class, 'destroy'])->name('admin.news.delete');
        });


    });
    Route::prefix('dosen')->middleware(DosenMiddleware::class)->group(function () {
        Route::get('/',[\App\Http\Controllers\portalController::class, 'adminpanel'])->name('dosendashboard');
        Route::prefix('produk-unggulan')->group(function ()
    {
        Route::get('/', [\App\Http\Controllers\ProdukUnggulanController::class, 'index'])->name('dosen.produk-unggulan');
        Route::get('/create', [\App\Http\Controllers\ProdukUnggulanController::class, 'create'])->name('dosen.produk-unggulan.dosen-create');
        Route::get('/edit/{id}', [\App\Http\Controllers\ProdukUnggulanController::class, 'edit'])->name('dosen.produk-unggulan.dosen-editPU'); // New
        Route::put('/update/{id}', [\App\Http\Controllers\ProdukUnggulanController::class, 'update'])->name('dosen.produk-unggulan.dosen-updatePU'); // New
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




require __DIR__.'/settings.php';
require __DIR__.'/auth.php';


Route::get('/about', function () {
    return Inertia::render('UI-VIEW/aboutus');
})->name('aboutus');

Route::get('/news', [\App\Http\Controllers\NewsController::class, 'viewNews'])->name('news');