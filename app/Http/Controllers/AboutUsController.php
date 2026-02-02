<?php

namespace App\Http\Controllers;

use App\Models\aboutUs;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutUsController extends Controller
{
    /**
     * Display public about us page with team members
     */
    public function show()
    {
        $roleOrder = ['ketua RTPU', 'Sekertaris RPTU', 'Admin RTPU'];
        $teamMembers = aboutUs::all();

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
