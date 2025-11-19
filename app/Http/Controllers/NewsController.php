<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    public function index()
    {
        $news = News::orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('admin/news/index', [
            'news' => $news,
            'user' => auth()->user(),
            'flash' => [
                'message' => session('message'),
                'error'   => session('error'),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/news/create');
    }

    /**
     * STORE NEWS (CREATE)
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'judul'       => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'images'      => ['nullable', 'image', 'max:4096'], // max 4MB
        ]);

        // Upload Gambar
        $imagePath = null;
        if ($request->hasFile('images')) {
            $path = $request->file('images')->store('news', 'public');
            $imagePath = '/storage/' . $path;
        }

        News::create([
            'judul'        => $data['judul'],
            'description'  => $data['description'] ?? null,
            'image_links'  => $imagePath,
        ]);

        return redirect()->route('admin.news')->with('success', 'News created.');
    }

    /**
     * EDIT FORM
     */
    public function edit(News $news)
    {
        return Inertia::render('admin/news/edit', [
            'news' => $news,
        ]);
    }

    /**
     * UPDATE NEWS
     */
    public function update(Request $request, News $news)
    {
        $data = $request->validate([
            'judul'       => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'images'      => ['nullable', 'image', 'max:8096'],
        ]);

        $imagePath = $news->image_links; // default old image

        // Update Image (jika user upload baru)
        if ($request->hasFile('images')) {

            // Hapus gambar lama
            if ($news->image_links) {
                $old = str_replace('/storage/', '', $news->image_links);
                if (Storage::disk('public')->exists($old)) {
                    Storage::disk('public')->delete($old);
                }
            }

            // Upload gambar baru
            $path = $request->file('images')->store('news', 'public');
            $imagePath = '/storage/' . $path;
        }

        $news->update([
            'judul'        => $data['judul'],
            'description'  => $data['description'] ?? null,
            'image_links'  => $imagePath,
        ]);

        return redirect()->route('admin.news')->with('success', 'News updated.');
    }

    /**
     * DELETE NEWS
     */
    public function destroy(News $news)
    {
        // Hapus gambar jika ada
        if ($news->image_links) {
            $existing = str_replace('/storage/', '', $news->image_links);
            if (Storage::disk('public')->exists($existing)) {
                Storage::disk('public')->delete($existing);
            }
        }

        $news->delete();

        return redirect()->route('admin.news')->with('success', 'News deleted.');
    }

    /**
     * FRONTEND VIEW
     */
    public function viewNews()
    {
        $news = News::orderBy('created_at', 'desc')->get();

        return Inertia::render('UI-VIEW/news', [
            'news' => $news,
        ]);
    }

    public function detailNews($id)
    {
        $news = news::find($id);

        return Inertia::render('UI-VIEW/detailnews',[
            'news' => $news,
        ]);
    }
}
