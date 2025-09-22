import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  totalUsers: number;
  totalRoles: number;
  totalProdukInovasi: number;
  totalProdukUnggulan: number;
  produkInovasiTerbaru: { id: number; name: string; description: string }[];
  produkUnggulanTerbaru: { id: number; name: string; description: string }[];
}

export default function Dashboard() {
  const {
    totalUsers,
    totalRoles,
    totalProdukInovasi,
    totalProdukUnggulan,
    produkInovasiTerbaru,
    produkUnggulanTerbaru,
  } = usePage<{ props: DashboardProps }>().props;

  return (
    <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}>
      <Head title="Dashboard" />
      <div className="flex h-fill flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        {/* Ringkasan */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalUsers}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Roles</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalRoles}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Produk Inovasi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalProdukInovasi}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Produk Unggulan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalProdukUnggulan}</p>
            </CardContent>
          </Card>
        </div>

        {/* Dua Chart */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Produk Inovasi Terbaru */}
          <Card>
            <CardHeader>
              <CardTitle>Produk Inovasi Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={produkInovasiTerbaru.map((p) => ({
                    name: p.name,
                    deskripsi: p.description.length, // contoh: panjang deskripsi
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="deskripsi" fill="#3b82f6" name="Panjang Deskripsi" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Produk Unggulan Terbaru */}
          <Card>
            <CardHeader>
              <CardTitle>Produk Unggulan Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={produkUnggulanTerbaru.map((p) => ({
                    name: p.name,
                    deskripsi: p.description.length,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="deskripsi" fill="#10b981" name="Panjang Deskripsi" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
