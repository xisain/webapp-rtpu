import AppLayout from "@/layouts/app-layout";
import { users } from "@/routes/admin";
import { type BreadcrumbItem } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm, usePage } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Pengguna",
    href: users().url,
  },
  {
    title: "Edit Pengguna",
    href: "#",
  },
];

interface Role {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role_id?: number;
  role_name?: string;
}

export interface PageProps {
  user: User;
  roles: Role[];
}

export default function EditUser() {
  const { props } = usePage<PageProps>();
  const { user, roles } = props;

  // Initialize form with user data
  const { data, setData, put, processing, errors } = useForm({
    name: user.name || "",
    email: user.email || "",
    password: "", // Password optional for edit
    role_id: user.role_id?.toString() || "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Use PUT method for updates and include user ID in URL
    put(`/admin/users/${user.id}`);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="flex h-fill flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <Card>
          <CardHeader>
            <CardTitle>Edit User</CardTitle>
            <CardDescription>
              Edit informasi user. Kosongkan password jika tidak ingin mengubahnya.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              {/* Nama */}
              <div>
                <label className="block text-sm font-medium">Nama</label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  className="mt-1 block w-full rounded border p-2"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                  className="mt-1 block w-full rounded border p-2"
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium">
                  Password <span className="text-gray-500">(kosongkan jika tidak ingin mengubah)</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                  className="mt-1 block w-full rounded border p-2"
                  placeholder="Masukkan password baru..."
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium">Role</label>
                <select
                  name="role_id"
                  value={data.role_id}
                  onChange={(e) => setData("role_id", e.target.value)}
                  className="mt-1 block w-full rounded border p-2"
                >
                  <option value="">-- Pilih Role --</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                {errors.role_id && <p className="text-sm text-red-500">{errors.role_id}</p>}
              </div>

              {/* Submit and Cancel buttons */}
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={processing}
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {processing ? "Menyimpan..." : "Update"}
                </button>
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                >
                  Batal
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
