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
    title: "Tambah Pengguna",
    href: "#",
  },
];

interface Role {
  id: number;
  name: string;
}

export interface PageProps {
  roles: Role[];
}

export default function CreateUsers() {
  const { props } = usePage<PageProps>();
  const { roles } = props;

  // pakai useForm inertia
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    password: "",
    role_id: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/admin/users/"); // route name dari controller
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="flex h-fill flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <Card>
          <CardHeader>
            <CardTitle>Tambah User</CardTitle>
            <CardDescription>Isi form untuk menambah user baru</CardDescription>
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
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                  className="mt-1 block w-full rounded border p-2"
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

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={processing}
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {processing ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
