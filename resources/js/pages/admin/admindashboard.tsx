import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  users:any;
  totalUsers: number;
  totalProdukInovasi: number;
  totalProdukUnggulan: number;
  produkInovasiTerbaru: { id: number; name: string; description: string; created_at: string }[];
  produkUnggulanTerbaru: { id: number; name: string; description: string; created_at: string }[];
  usersTerbaru: { id: number; name: string; email: string; created_at: string }[];
}

export default function AdminDashboard() {
  const {
    users,
    totalUsers,
    totalProdukInovasi,
    totalProdukUnggulan,
    produkInovasiTerbaru,
    produkUnggulanTerbaru,
    usersTerbaru,
  } = usePage<{ props: DashboardProps }>().props;

  // Data untuk chart ringkasan
  const chartData = [
    { name: 'Users', total: totalUsers },
    { name: 'Produk Inovasi', total: totalProdukInovasi },
    { name: 'Produk Unggulan', total: totalProdukUnggulan },
  ];

  return (
    <AppLayout breadcrumbs={[{ title: 'Admin Dashboard', href: '/admin/dashboard' }]}>
      <Head title="Admin Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
        <h2>Halo, <p>{users.name}</p></h2>
        {/* Ringkasan */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalUsers}</p>
              <p className="text-sm text-muted-foreground">Semua pengguna terdaftar</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Produk Inovasi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalProdukInovasi}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Produk Unggulan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalProdukUnggulan}</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Statistik Ringkasan</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="total" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tabel Produk Terbaru & Tabel User Terbaru */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* User Terbaru */}
          <Card>
            <CardHeader>
              <CardTitle>User Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Tanggal Daftar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usersTerbaru.length > 0 ? (
                    usersTerbaru.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground">
                        Belum ada user terbaru
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Produk Inovasi Terbaru */}
          <Card>
            <CardHeader>
              <CardTitle>Inovasi Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead>Tanggal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {produkInovasiTerbaru.length > 0 ? (
                    produkInovasiTerbaru.map((prod) => (
                      <TableRow key={prod.id}>
                        <TableCell className="font-medium">{prod.name}</TableCell>
                        <TableCell className="truncate max-w-[200px]">{prod.description}</TableCell>
                        <TableCell>{new Date(prod.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground">
                        Belum ada produk inovasi
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Produk Unggulan Terbaru */}
          <Card>
            <CardHeader>
              <CardTitle>Unggulan Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead>Tanggal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {produkUnggulanTerbaru.length > 0 ? (
                    produkUnggulanTerbaru.map((prod) => (
                      <TableRow key={prod.id}>
                        <TableCell className="font-medium">{prod.name}</TableCell>
                        <TableCell className="truncate max-w-[200px]">{prod.description}</TableCell>
                        <TableCell>{new Date(prod.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground">
                        Belum ada produk unggulan
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
