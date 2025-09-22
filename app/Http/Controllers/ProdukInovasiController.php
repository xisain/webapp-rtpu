<?php

namespace App\Http\Controllers;

use App\Models\produk_inovasi;
use App\Models\produk_inovasi_fitur_utama;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Response;

class ProdukInovasiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if(Auth::user()->role_id == 1)  {
        $produk_inovasi = Produk_inovasi::with('user')->get();
        $user = Auth::user();
        return inertia("admin/produk_inovasi/index",[
            'produkInovasi' => $produk_inovasi,
            'user'=> $user,
        ]);
        } else {
        $produk_inovasi = Produk_inovasi::with('user')->where('user_id', Auth::user()->id)->get();
        $user = Auth::user();
        return inertia("admin/produk_inovasi/index",[
            'produkInovasi' => $produk_inovasi,
            'user'=> $user,
        ]);
        }

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();
        return inertia("admin/produk_inovasi/create",[
            "user" => $user
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //dd($request->all());
        // Validasi data
        $user = Auth::user();
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'keunggulan_produk' => 'required|string',
            'images' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'pdf' => 'nullable|mimes:pdf|max:5120', // Maksimal 5MB
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
            'pdf' => 'Maksimal 5MB', // Maksimal 5MB
            'images.max' => 'Ukuran gambar maksimal 2MB',
            'fitur_utama.*.nama_fitur.required_with' => 'Nama fitur harus diisi',
        ]);

        try {
            // Upload gambar
            $imagePath = null;
            if ($request->hasFile('images')) {
                $imagePath = $request->file('images')->store('produk-inovasi', 'public');
            }

            // Upload PDF jika ada
            $pdfPath = null;
            if ($request->hasFile('pdf')) {
                $pdfPath = $request->file('pdf')->store('produk-inovasi-pdf', 'public');
            }

            // Simpan produk inovasi
            $produkInovasi = produk_inovasi::create([
                'name' => $validated['name'],
                'description' => $validated['description'],
                'keunggulan_produk' => $validated['keunggulan_produk'],
                'images' => $imagePath,
                'pdf' => $pdfPath,
                'user_id' => Auth::id(),
            ]);

            // Simpan fitur utama jika ada
            if ($request->fitur_utama_count > 0) {
                // dd($validated['fitur_utama']);
                foreach ($validated['fitur_utama'] as $fitur) {
                    if (!empty($fitur['nama_fitur'])) {
                        produk_inovasi_fitur_utama::create([
                            'produk_inovasi_id' => $produkInovasi->id,
                            'nama_fitur' => $fitur['nama_fitur'],
                        ]);

                    }
                }
            }
            if ($produkInovasi) {
                if (Auth::user()->role_id === 1) {
                return redirect(route('admin.produk-inovasi'))
                    ->with('success', 'Produk inovasi berhasil ditambahkan');
            } else {
                return redirect(route('dosen.produk-inovasi'))
                    ->with('success', 'Produk inovasi berhasil ditambahkan');
            }
        } else {
            if (Auth::user()->role_id === 1) {
                return redirect(route('admin.produk-inovasi'))->
                    with('error', 'Gagal menambahkan produk inovasi');
            } else {
                return redirect(route('dosen.produk-inovasi'))
                    ->with('error', 'Gagal menambahkan produk inovasi');
            }
        }

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
    public function show($id)
    {
        $produk_inovasi = produk_inovasi::with('user', 'fiturUtama')->findOrFail($id);
        return inertia('UI-VIEW/detailpi', [
        'produkInovasi' => $produk_inovasi,
    ]);
    }

    /**
     * Show the form for editing the specified resource.
     */

// Add these methods to your ProdukInovasiController class

/**
 * Show the form for editing the specified resource.
 */
    public function edit($id)
{
    // Load the relationship - Laravel will convert fiturUtama to fitur_utama in JSON
    $produk_inovasi = produk_inovasi::with(['user', 'fiturUtama'])->findOrFail($id);
    $user = Auth::user();

    // Check if user can edit this product (admin can edit all, others only their own)
    if (Auth::user()->role_id !== 1 && $produk_inovasi->user_id !== Auth::user()->id) {
        abort(403, 'Unauthorized');
    }

    // Debug: Log the data to check if relationship is loaded
    \Log::info('Produk Inovasi Data:', [
        'id' => $produk_inovasi->id,
        'name' => $produk_inovasi->name,
        'fitur_utama_count' => $produk_inovasi->fiturUtama->count(),
        'fitur_utama_data' => $produk_inovasi->fiturUtama->toArray()
    ]);

    return inertia("admin/produk_inovasi/edit", [
        'produkInovasi' => $produk_inovasi->load('fiturUtama'), // Ensure relationship is loaded
        'user' => $user,
    ]);
}

/**
 * Update the specified resource in storage.
 */
    public function update(Request $request, $id)
    {
        $produk_inovasi = produk_inovasi::with('fiturUtama')->findOrFail($id);
        $user = Auth::user();

        // Check if user can update this product
        if (Auth::user()->role_id !== 1 && $produk_inovasi->user_id !== Auth::user()->id) {
            abort(403, 'Unauthorized');
        }

        // Validasi data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'keunggulan_produk' => 'required|string',
            'images' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'pdf' => 'nullable|mimes:pdf|max:5120', // Maksimal 5MB
            'existing_fitur_utama' => 'sometimes|array',
            'existing_fitur_utama.*.id' => 'required_with:existing_fitur_utama|integer|exists:produk_inovasi_fitur_utamas,id',
            'existing_fitur_utama.*.nama_fitur' => 'required_with:existing_fitur_utama|string|max:255',
            'new_fitur_utama' => 'sometimes|array',
            'new_fitur_utama.*.nama_fitur' => 'required_with:new_fitur_utama|string|max:255',
            'deleted_fitur_utama' => 'sometimes|array',
            'deleted_fitur_utama.*' => 'integer|exists:produk_inovasi_fitur_utamas,id',
        ], [
            'name.required' => 'Nama produk harus diisi',
            'name.max' => 'Nama produk maksimal 255 karakter',
            'description.required' => 'Deskripsi produk harus diisi',
            'keunggulan_produk.required' => 'Keunggulan produk harus diisi',
            'images.image' => 'File harus berupa gambar',
            'images.mimes' => 'Format gambar harus: jpeg, png, jpg, atau gif',
            'images.max' => 'Ukuran gambar maksimal 2MB',
            'pdf.mimes' => 'File harus berformat PDF',
            'pdf.max' => 'Ukuran PDF maksimal 5MB',
            'existing_fitur_utama.*.nama_fitur.required_with' => 'Nama fitur harus diisi',
            'new_fitur_utama.*.nama_fitur.required_with' => 'Nama fitur harus diisi',
        ]);

        try {
            // Update basic product information
            $updateData = [
                'name' => $validated['name'],
                'description' => $validated['description'],
                'keunggulan_produk' => $validated['keunggulan_produk'],
            ];

            // Handle image upload if new image provided
            if ($request->hasFile('images')) {
                // Delete old image
                if ($produk_inovasi->images && Storage::disk('public')->exists($produk_inovasi->images)) {
                    Storage::disk('public')->delete($produk_inovasi->images);
                }

                $updateData['images'] = $request->file('images')->store('produk-inovasi', 'public');
            }

            // Handle PDF upload if new PDF provided
            if ($request->hasFile('pdf')) {
                // Delete old PDF
                if ($produk_inovasi->pdf && Storage::disk('public')->exists($produk_inovasi->pdf)) {
                    Storage::disk('public')->delete($produk_inovasi->pdf);
                }

                $updateData['pdf'] = $request->file('pdf')->store('produk-inovasi-pdf', 'public');
            }

            // Update the product
            $produk_inovasi->update($updateData);

            // Handle existing fitur utama updates
            if ($request->has('existing_fitur_utama')) {
                foreach ($validated['existing_fitur_utama'] as $fitur) {
                    produk_inovasi_fitur_utama::where('id', $fitur['id'])
                        ->where('produk_inovasi_id', $produk_inovasi->id)
                        ->update([
                            'nama_fitur' => $fitur['nama_fitur']
                        ]);
                }
            }

            // Handle new fitur utama
            if ($request->has('new_fitur_utama')) {
                foreach ($validated['new_fitur_utama'] as $fitur) {
                    if (!empty($fitur['nama_fitur'])) {
                        produk_inovasi_fitur_utama::create([
                            'produk_inovasi_id' => $produk_inovasi->id,
                            'nama_fitur' => $fitur['nama_fitur'],
                        ]);
                    }
                }
            }

            // Handle deleted fitur utama
            if ($request->has('deleted_fitur_utama')) {
                produk_inovasi_fitur_utama::whereIn('id', $validated['deleted_fitur_utama'])
                    ->where('produk_inovasi_id', $produk_inovasi->id)
                    ->delete();
            }

            // Redirect based on user role
            if (Auth::user()->role_id === 1) {
                return redirect(route('admin.produk-inovasi'))
                    ->with('success', 'Produk inovasi berhasil diupdate');
            } else {
                return redirect(route('dosen.produk-inovasi'))
                    ->with('success', 'Produk inovasi berhasil diupdate');
            }

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Terjadi kesalahan saat mengupdate data: ' . $e->getMessage()])
                ->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $produk_inovasi = produk_inovasi::findOrfail($id);
        $nama = $produk_inovasi->name;
        foreach($produk_inovasi->fiturUtama as $fitur){
            $fitur->delete();
        }
        $produk_inovasi->delete();
        return redirect('/admin/produk-inovasi')
            ->with('message', "Produk inovasi {$nama} deleted successfully.");

    }

    public function downloadPdf($filename)
{
    $path = storage_path('app/public/produk-inovasi-pdf/' . $filename);

    if (!file_exists($path)) {
        abort(404, 'File tidak ditemukan');
    }

    return Response::file($path); // langsung tampilkan di browser
    // kalau mau force download:
    // return Response::download($path);
}
}
