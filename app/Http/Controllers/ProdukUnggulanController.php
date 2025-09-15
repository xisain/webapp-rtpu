<?php

namespace App\Http\Controllers;

use App\Models\produk_unggulan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProdukUnggulanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $produk_unggulan = Produk_unggulan::with('user')->get(); // Eager load the user relationship

        return inertia('admin/produk_unggulan/index', [
        'produkunggulan' => $produk_unggulan,
    ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('admin/produk_unggulan/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        // dd($request->all());
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'link_video_demo' => 'required|string|max:255',
            'link_video_pemaparan' => 'required|string|max:255',
            'main_image'=> 'required|file|mimes:jpg,png|max:25600'
        ]);

        // Save the uploaded image to storage and get the path
        if ($request->hasFile('main_image')) {
            $path = $request->file('main_image')->store('produk-unggulan', 'public');
            $validated['main_image'] = $path; // Save the storage path to the database
        }

        $validated['user_id'] = Auth::user()->id;
        $produk_unggulan = produk_unggulan::create($validated);

        if($produk_unggulan) {
            return redirect('/admin/produk-unggulan')
            ->with('message', 'Task created successfully.');
        } else {
           return redirect()->route('admin.produk-unggulan')
            ->with('message', 'Failed');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $produk_unggulan = Produk_unggulan::with('user')->findOrFail($id);
        return inertia('UI-VIEW/detailpu', [
        'produkUnggulan' => $produk_unggulan,
    ]);
    }
    public function portalshow(){
        $produk_unggulan = produk_unggulan::all();
        return inertia('UI-VIEW/portal', [
            'produkUnggulan'=> $produk_unggulan
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(produk_unggulan $produk_unggulan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, produk_unggulan $produk_unggulan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(produk_unggulan $produk_unggulan)
    {
        //
    }
}
