<?php

namespace App\Http\Controllers;

use App\Models\news;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource (admin).
     */
    public function index()
    {
        $news = News::orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('admin/news/index', [
            'news' => $news,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/news/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'judul' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:2048'],
        ]);

        // Handle image upload (single image)
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('news', 'public');
            // store public path
            $data['image_links'] = '/storage/' . $path;
        }

        News::create([
            'judul' => $data['judul'],
            'description' => $data['description'] ?? null,
            'image_links' => $data['image_links'] ?? null,
        ]);

        return redirect()->route('admin.news')->with('success', 'News created.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news)
    {
        return Inertia::render('admin/news/edit', [
            'news' => $news,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, News $news)
    {
        $data = $request->validate([
            'judul' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'max:2048'],
        ]);

        if ($request->hasFile('image')) {
            // delete old image if exists and is stored in /storage
            if ($news->image_links) {
                $existing = str_replace('/storage/', '', $news->image_links);
                if (Storage::disk('public')->exists($existing)) {
                    Storage::disk('public')->delete($existing);
                }
            }

            $path = $request->file('image')->store('news', 'public');
            $data['image_links'] = '/storage/' . $path;
        }

        $news->update([
            'judul' => $data['judul'],
            'description' => $data['description'] ?? null,
            'image_links' => $data['image_links'] ?? $news->image_links,
        ]);

        return redirect()->route('admin.news')->with('success', 'News updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        // remove image file if present
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
     * Display news listing for frontend view.
     */
    public function viewNews()
    {
        $news = News::orderBy('created_at', 'desc')->get();

        return Inertia::render('UI-VIEW/news', [
            'news' => $news,
        ]);
    }
}
