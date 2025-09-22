<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\role;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            // Check if the relationship exists, if not, just get users without roles
            $users = User::with('role')->get();

            return Inertia::render('admin/users/index', [
                'users' => $users->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'role_name' => optional($user->role)->name ?? 'No Role',
                        'created_at' => $user->created_at?->format('Y-m-d H:i:s'),
                        'updated_at' => $user->updated_at?->format('Y-m-d H:i:s'),
                    ];
                })->toArray(), // Convert to array to ensure proper JSON serialization
            ]);
        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('User index error: ' . $e->getMessage());

            // Return with empty users array as fallback
            return Inertia::render('admin/users/index', [
                'users' => [],
                'error' => 'Failed to load users: ' . $e->getMessage(),
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::all();
        return Inertia::render('admin/users/create', [ // Fixed: added missing comma
            'roles' => $roles,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role_id' => 'nullable|exists:roles,id', // Added role_id validation
        ]);

        $validated['password'] = bcrypt($validated['password']);

        User::create($validated);

        return redirect(route('admin.users'))->with('message', 'User created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::with('role')->findOrFail($id);

        return Inertia::render('admin/users/show', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role_name' => optional($user->role)->name ?? 'No Role',
                'created_at' => $user->created_at?->format('Y-m-d H:i:s'),
                'updated_at' => $user->updated_at?->format('Y-m-d H:i:s'),
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = User::with('role')->findOrFail($id);
        $roles = role::all(); // Get all roles for the dropdown

        return Inertia::render('admin/users/edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role_id' => $user->role_id, // Include role_id for form initialization
                'role_name' => optional($user->role)->name ?? 'No Role',
            ],
            'roles' => $roles, // Added roles for the dropdown
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8', // Password is optional for updates
            'role_id' => 'nullable|exists:roles,id', // Added role_id validation
        ]);

        // Only hash and update password if provided
        if (!empty($validated['password'])) {
            $validated['password'] = bcrypt($validated['password']);
        } else {
            unset($validated['password']); // Remove password from update if empty
        }

        $user->update($validated);

        return redirect(route('admin.users'))->with('message', 'User updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $userName = $user->name;

        $user->delete();

        return redirect(route('admin.users'))->with('message', "User '{$userName}' deleted successfully!");
    }

    public function bulkInsert(Request $request)
    {
        // Implementation for bulk insert if needed
    }
}
