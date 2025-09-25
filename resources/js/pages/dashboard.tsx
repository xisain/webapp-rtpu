import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface DashboardProps {
  user: { id: number; name: string };
  totalProdukInovasi: number;
  totalProdukUnggulan: number;
  produkInovasiTerbaru: { id: number; name: string; description: string }[];
  produkUnggulanTerbaru: { id: number; name: string; description: string }[];
}

export default function Dashboard() {
  const {
    user,
    totalProdukInovasi,
    totalProdukUnggulan,
    produkInovasiTerbaru,
    produkUnggulanTerbaru,
  } = usePage<{ props: DashboardProps }>().props;

  const chartData = [
    { name: 'Produk Inovasi', total: totalProdukInovasi },
    { name: 'Produk Unggulan', total: totalProdukUnggulan },
  ];

  return (
    <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}>
      <Head title="Dashboard" />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
        {/* Halo User */}
        <h2 className="text-xl font-semibold">Halo, {user.name} 👋</h2>

        {/* Ringkasan */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Produk Inovasi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalProdukInovasi}</p>
              <p className="text-sm text-muted-foreground">Total data inovasi</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Produk Unggulan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalProdukUnggulan}</p>
              <p className="text-sm text-muted-foreground">Total data unggulan</p>
            </CardContent>
          </Card>
        </div>

        {/* Grafik */}
        <Card>
          <CardHeader>
            <CardTitle>Statistik Produk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Produk Terbaru */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Produk Inovasi Terbaru Anda</CardTitle>
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
                  {produkInovasiTerbaru.length > 0 ? (
                    produkInovasiTerbaru.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="truncate max-w-[200px]">
                          {item.description}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center text-muted-foreground">
                        Belum ada produk inovasi terbaru
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Produk Unggulan Terbaru Anda</CardTitle>
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
                  {produkUnggulanTerbaru.length > 0 ? (
                    produkUnggulanTerbaru.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="truncate max-w-[200px]">
                          {item.description}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center text-muted-foreground">
                        Belum ada produk unggulan terbaru
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
