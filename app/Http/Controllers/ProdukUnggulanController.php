<?php

namespace App\Http\Controllers;

use App\Models\produk_unggulan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ProdukUnggulanGallery;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

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
        return Inertia::render('admin/produk_unggulan/index', [
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
                ->with('error', 'Failed to create produk unggulan.');
        } else {
            return redirect()->route('dosen.produk-unggulan')
                ->with('error', 'Failed to create produk unggulan.');
        }
    }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $produk_unggulan = produk_unggulan::with('user', 'gallery')->findOrFail($id);
        return inertia('UI-VIEW/detailpu', [
        'produkUnggulan' => $produk_unggulan,
    ]);
    }

    /**\
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
       $produkUnggulan = produk_unggulan::with('gallery')->findOrFail($id);
        $user = Auth::user();

        // Check authorization - hanya bisa edit produk sendiri (kecuali admin)
        if (Auth::user()->role_id !== 1 && $produkUnggulan->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        return inertia("admin/produk_unggulan/edit", [
            'produkUnggulan' => $produkUnggulan,
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $produkUnggulan = produk_unggulan::with('gallery')->findOrFail($id);

        // Check authorization
        if (Auth::user()->role_id !== 1 && $produkUnggulan->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        // Validasi data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'link_video_demo' => 'nullable|url',
            'link_video_pemaparan' => 'nullable|url',
            'main_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'gallery.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'removed_gallery' => 'nullable|array',
            'removed_gallery.*' => 'integer|exists:produk_unggulan_galleries,id',
        ], [
            'name.required' => 'Nama produk harus diisi',
            'name.max' => 'Nama produk maksimal 255 karakter',
            'description.required' => 'Deskripsi produk harus diisi',
            'main_image.image' => 'File harus berupa gambar',
            'main_image.mimes' => 'Format gambar harus: jpeg, png, jpg, atau gif',
            'main_image.max' => 'Ukuran gambar maksimal 2MB',
            'gallery.*.image' => 'File gallery harus berupa gambar',
            'gallery.*.mimes' => 'Format gambar gallery harus: jpeg, png, jpg, atau gif',
            'gallery.*.max' => 'Ukuran gambar gallery maksimal 2MB',
        ]);

        try {
            DB::beginTransaction();

            // Handle main image update
            $mainImagePath = $produkUnggulan->main_image;
            if ($request->hasFile('main_image')) {
                // Delete old main image
                if ($mainImagePath && Storage::disk('public')->exists($mainImagePath)) {
                    Storage::disk('public')->delete($mainImagePath);
                }

                // Upload new main image
                $mainImagePath = $request->file('main_image')->store('produk-unggulan', 'public');
            }

            // Update produk unggulan data
            $produkUnggulan->update([
                'name' => $validated['name'],
                'description' => $validated['description'],
                'link_video_demo' => $validated['link_video_demo'],
                'link_video_pemaparan' => $validated['link_video_pemaparan'],
                'main_image' => $mainImagePath,
            ]);

            // Handle removed gallery images
            if ($request->has('removed_gallery') && is_array($request->removed_gallery)) {
                $removedGalleries = ProdukUnggulanGallery::whereIn('id', $request->removed_gallery)
                    ->where('produk_unggulan_id', $produkUnggulan->id)
                    ->get();

                foreach ($removedGalleries as $gallery) {
                    // Delete file from storage
                    if (Storage::disk('public')->exists($gallery->image_path)) {
                        Storage::disk('public')->delete($gallery->image_path);
                    }
                    // Delete record from database
                    $gallery->delete();
                }
            }

            // Handle new gallery images
            if ($request->hasFile('gallery')) {
                foreach ($request->file('gallery') as $galleryFile) {
                    if ($galleryFile && $galleryFile->isValid()) {
                        $galleryPath = $galleryFile->store('produk-unggulan-gallery', 'public');

                        ProdukUnggulanGallery::create([
                            'produk_unggulan_id' => $produkUnggulan->id,
                            'image_path' => $galleryPath,
                        ]);
                    }
                }
            }

            DB::commit();

            $redirectRoute = Auth::user()->role_id === 1
                ? route('admin.produk-unggulan')
                : route('dosen.produk-unggulan');

            return redirect($redirectRoute)
                ->with('message', 'Produk unggulan berhasil diperbarui');

        } catch (\Exception $e) {
            DB::rollBack();

            return back()->withErrors(['error' => 'Terjadi kesalahan saat memperbarui data: ' . $e->getMessage()])
                ->withInput();
        }
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
