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
        if(Auth::user()->role_id == 1) {
        $produk_unggulan = Produk_unggulan::with('user')->get(); // Eager load the user relationship
        $user = Auth::user();
        return inertia('admin/produk_unggulan/index', [
        'produkunggulan' => $produk_unggulan,
        'user'=> $user
    ]);
    } else {
         $produk_unggulan = Produk_unggulan::with('user')->where('user_id', Auth::user()->id)->get(); // Eager load the user relationship
        $user = Auth::user();
        return inertia('admin/produk_unggulan/index', [
        'produkunggulan' => $produk_unggulan,
        'user'=> $user
    ]);
    }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();
        return inertia('admin/produk_unggulan/create',[
             'user'=> $user
        ]);
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
            'main_image' => 'required|file|mimes:jpg,png,jpeg|max:256000',
            'gallery.*' => 'file|mimes:jpg,png,jpeg|max:256000', // Validate gallery images
        ]);

        // Save the uploaded main image to storage and get the path
        if ($request->hasFile('main_image')) {
            $path = $request->file('main_image')->store('produk-unggulan', 'public');
            $validated['main_image'] = $path; // Save the storage path to the database
        }

        $validated['user_id'] = Auth::user()->id;
        $produk_unggulan = produk_unggulan::create($validated);

        // Handle gallery images
        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $galleryImage) {
                $galleryPath = $galleryImage->store('produk-unggulan/gallery', 'public');
                $produk_unggulan->gallery()->create([
                    'image_path' => $galleryPath,
                ]);
            }
        }

        if ($produk_unggulan) {
        // Redirect sesuai role
        if (Auth::user()->role_id === 1) {
            return redirect('/admin/produk-unggulan')
                ->with('message', 'Produk unggulan created successfully.');
        } else {
            return redirect('/dosen/produk-unggulan')
                ->with('message', 'Produk unggulan created successfully.');
        }
    } else {
        if (Auth::user()->role_id === 1) {
            return redirect()->route('admin.produk-unggulan')
                ->with('message', 'Failed to create produk unggulan.');
        } else {
            return redirect()->route('dosen.produk-unggulan')
                ->with('message', 'Failed to create produk unggulan.');
        }
    }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $produk_unggulan = Produk_unggulan::with('user', 'gallery')->findOrFail($id);
        return inertia('UI-VIEW/detailpu', [
        'produkUnggulan' => $produk_unggulan,
    ]);
    }

    /**\
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
    public function destroy($id)
    {
        $produk_unggulan = produk_unggulan::findOrFail($id); // Find the produk unggulan by ID

        // Delete associated gallery images from storage
        foreach ($produk_unggulan->gallery as $gallery) {
            \Storage::disk('public')->delete($gallery->image_path);
            $gallery->delete();
        }

        // Delete the main image from storage
        \Storage::disk('public')->delete($produk_unggulan->main_image);

        // Delete the produk unggulan record
        $produk_unggulan->delete();

        return redirect('/admin/produk-unggulan')
            ->with('message', 'Produk unggulan deleted successfully.');
    }
}
