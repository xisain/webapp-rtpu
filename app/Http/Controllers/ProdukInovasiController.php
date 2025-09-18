<?php

namespace App\Http\Controllers;

use App\Models\produk_inovasi;
use App\Models\produk_inovasi_fitur_utama;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
class ProdukInovasiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $produk_inovasi = Produk_inovasi::all();
        return inertia("admin/produk_inovasi/index",[
            'produkInovasi' => $produk_inovasi,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("admin/produk_inovasi/create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'keunggulan_produk' => 'required|string',
            'images' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'fitur_utama' => 'sometimes|array',
            'fitur_utama.*.nama_fitur' => 'required_with:fitur_utama|string|max:255',
        ], [
            'name.required' => 'Nama produk harus diisi',
            'name.max' => 'Nama produk maksimal 255 karakter',
            'description.required' => 'Deskripsi produk harus diisi',
            'keunggulan_produk.required' => 'Keunggulan produk harus diisi',
            'images.required' => 'Gambar produk harus diupload',
            'images.image' => 'File harus berupa gambar',
            'images.mimes' => 'Format gambar harus: jpeg, png, jpg, atau gif',
            'images.max' => 'Ukuran gambar maksimal 2MB',
            'fitur_utama.*.nama_fitur.required_with' => 'Nama fitur harus diisi',
        ]);

        try {
            // Upload gambar
            $imagePath = null;
            if ($request->hasFile('images')) {
                $imagePath = $request->file('images')->store('produk-inovasi', 'public');
            }

            // Simpan produk inovasi
            $produkInovasi = produk_inovasi::create([
                'name' => $validated['name'],
                'description' => $validated['description'],
                'keunggulan_produk' => $validated['keunggulan_produk'],
                'images' => $imagePath,
                'user_id' => Auth::id(),
            ]);

            // Simpan fitur utama jika ada
            if (isset($validated['fitur_utama']) && is_array($validated['fitur_utama'])) {
                foreach ($validated['fitur_utama'] as $fitur) {
                    if (!empty($fitur['nama_fitur'])) {
                        produk_inovasi_fitur_utama::create([
                            'produk_inovasi_id' => $produkInovasi->id,
                            'nama_fitur' => $fitur['nama_fitur'],
                        ]);
                    }
                }
            }

            return redirect()->route('admin.produk-inovasi')
                ->with('success', 'Produk inovasi berhasil ditambahkan');

        } catch (\Exception $e) {
            // Hapus gambar jika terjadi error
            if ($imagePath && Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }

            return back()->withErrors(['error' => 'Terjadi kesalahan saat menyimpan data: ' . $e->getMessage()])
                ->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(produk_inovasi $produk_inovasi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(produk_inovasi $produk_inovasi)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, produk_inovasi $produk_inovasi)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(produk_inovasi $produk_inovasi)
    {
        //
    }
}
