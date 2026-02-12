<?php

namespace App\Http\Controllers;

use App\Models\aboutUs;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutUsController extends Controller
{
    /**
     * Display list of About Us data for admin
     */
    public function index()
    {
        $aboutUs = AboutUs::all();

        return Inertia::render('admin/aboutus/index', [
            'aboutUsItems' => $aboutUs,
        ]);
    }

    /**
     * Show the form for creating a new About Us
     */
    public function create()
    {
        return Inertia::render('admin/aboutus/create');
    }

    /**
     * Store a newly created About Us in storage
     */
    public function store(Request $request)
    {
        $request->validate([
            'section_title' => 'string',
            'section_description' => 'string',
            'hr_count' => 'required|integer|min:0',
        ]);

        $aboutUs = AboutUs::create([
            'section_title' => $request->section_title,
            'section_description' => $request->section_description,
        ]);

        // Handle HR team members
        for ($i = 0; $i < (int)$request->hr_count; $i++) {
            if ($request->hasFile("hr_photos.$i")) {
                $path = $request->file("hr_photos.$i")->store('aboutus', 'public');
                $aboutUs->hrTeams()->create([
                    'name' => $request->input("hr_teams.$i.name"),
                    'position' => $request->input("hr_teams.$i.position"),
                    'photo_path' => $path,
                ]);
            }
        }

        return redirect()->route('admin.aboutus.index')->with('success', 'About Us berhasil ditambahkan');
    }

    /**
     * Show the About Us item
     */
    public function show(AboutUs $aboutUs)
    {
        return Inertia::render('admin/aboutus/edit', [
            'about' => $aboutUs,
        ]);
    }

    /**
     * Show the form for editing the specified About Us
     */
    public function edit(AboutUs $aboutUs)
    {
        return Inertia::render('admin/aboutus/edit', [
            'about' => $aboutUs->load('hrTeams'),
        ]);
    }

    /**
     * Update the specified About Us in storage
     */
    public function update(Request $request, AboutUs $aboutUs)
    {
        $request->validate([
            'section_title' => 'string',
            'section_description' => 'string',
        ]);

        $aboutUs->update([
            'section_title' => $request->section_title,
            'section_description' => $request->section_description,
        ]);

        // Handle removed members
        if ($request->has('removed_member_ids')) {
            $removedIds = $request->input('removed_member_ids');
            $aboutUs->hrTeams()->whereIn('id', $removedIds)->delete();
        }

        // Handle existing member updates
        if ($request->has('existing_members')) {
            foreach ($request->input('existing_members') as $idx => $member) {
                $hrTeam = $aboutUs->hrTeams()->find($member['id']);
                if ($hrTeam) {
                    $hrTeam->update([
                        'name' => $member['name'],
                        'position' => $member['position'],
                    ]);
                    if ($request->hasFile("existing_photos.$idx")) {
                        if ($hrTeam->photo_path && \Storage::disk('public')->exists($hrTeam->photo_path)) {
                            \Storage::disk('public')->delete($hrTeam->photo_path);
                        }
                        $path = $request->file("existing_photos.$idx")->store('aboutus', 'public');
                        $hrTeam->update(['photo_path' => $path]);
                    }
                }
            }
        }

        // Handle new members
        if ($request->has('new_members')) {
            foreach ($request->input('new_members') as $idx => $member) {
                $path = null;
                if ($request->hasFile("new_photos.$idx")) {
                    $path = $request->file("new_photos.$idx")->store('aboutus', 'public');
                }
                $aboutUs->hrTeams()->create([
                    'name' => $member['name'],
                    'position' => $member['position'],
                    'photo_path' => $path,
                ]);
            }
        }

        return redirect()->route('admin.aboutus.index')->with('success', 'About Us berhasil diperbarui');
    }

    /**
     * Remove the specified About Us from storage
     */
    public function destroy(AboutUs $aboutUs)
    {
        $aboutUs->delete();

        return redirect()->route('admin.aboutus.index')->with('success', 'About Us berhasil dihapus');
    }

    /**
     * Display public about us page with team members
     */
    public function about()
    {
        $roleOrder = ['ketua RTPU', 'Sekertaris RPTU', 'Admin RTPU'];
        $teamMembers = AboutUs::all();

        // Sort by role hierarchy
        $sortedTeamMembers = $teamMembers->sortBy(function ($item) use ($roleOrder) {
            return array_search($item->role, $roleOrder) !== false
                ? array_search($item->role, $roleOrder)
                : count($roleOrder);
        })->values();

        return Inertia::render('UI-VIEW/aboutus', [
            'teamMembers' => $sortedTeamMembers,
        ]);
    }
}
