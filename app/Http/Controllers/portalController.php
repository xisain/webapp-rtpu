<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\produk_unggulan;
use Inertia\Inertia;

class portalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $produk_unggulan = Produk_unggulan::all();
        return Inertia::render("UI-VIEW/portal",[
            'produkUnggulan' => $produk_unggulan,
        ]);
    }

    public function showList(){
        $produk_unggulan = Produk_unggulan::all();
        return Inertia::render("UI-VIEW/pu",[
            'produkUnggulan' => $produk_unggulan,
        ]);
    }

}
