<?php

namespace App\Http\Controllers;

use App\Models\produk_inovasi;
use Illuminate\Http\Request;
use App\Models\produk_unggulan;
use Inertia\Inertia;
use App\Models\role;
use App\Models\User;

class portalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $produk_unggulan = Produk_unggulan::all();
        $produk_inovasi = Produk_inovasi::all();
        return Inertia::render("UI-VIEW/portal",[
            'produkUnggulan' => $produk_unggulan,
            'produkInovasi' => $produk_inovasi
        ]);
    }

    public function showList(){
        $produk_unggulan = Produk_unggulan::all();
        return Inertia::render("UI-VIEW/pu",[
            'produkUnggulan' => $produk_unggulan,
        ]);
    }
    public function showPI(){
        $produk_inovasi = produk_inovasi::all();
        return Inertia::render('UI-VIEW/pi',[
            'produkInovasi' => $produk_inovasi
        ]);
    }
    public function adminpanel()
    {
        $usersPerRole = role::withCount('user')->get()->map(function($role) {
            return [
                'role' => $role->name,
                'count' => $role->users_count
            ];
        });

        return Inertia::render('admin/admindashboard', [
            'totalUsers' => User::count(),
            'totalRoles' => role::count(),
            'totalProdukInovasi' => produk_inovasi::count(),
            'totalProdukUnggulan' => produk_unggulan::count(),
            'usersPerRole' => $usersPerRole,
            'produkUnggulanTerbaru' => produk_unggulan::latest()->take(5)->get(['id','name','description']),
            'produkInovasiTerbaru' => produk_inovasi::latest()->take(5)->get(['id','name','description']),
        ]);
    }

}
