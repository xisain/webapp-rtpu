import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

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

        {/* Dua Tabel */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Produk Inovasi Terbaru */}
          <Card>
            <CardHeader>
              <CardTitle>Produk Inovasi Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Deskripsi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {produkInovasiTerbaru.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell>{p.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Produk Unggulan Terbaru */}
          <Card>
            <CardHeader>
              <CardTitle>Produk Unggulan Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Deskripsi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {produkUnggulanTerbaru.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell>{p.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
