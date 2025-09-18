import App from "@/actions/App";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, usePage, Link, router } from "@inertiajs/react";
import { produkInovasi } from "@/routes/admin";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useRef } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
    type SortingState,
    type ColumnFiltersState,
    type VisibilityState
} from '@tanstack/react-table';
import { ArrowUpDown, CirclePlus, EditIcon, TrashIcon, ChevronDown, CheckCircle2Icon, Search, Eye } from 'lucide-react';
import { useState } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { create } from "@/routes/admin/produk-inovasi";

interface FiturUtama {
    id: number;
    nama_fitur: string;
    produk_inovasi_id: number;
}

interface ProdukInovasi {
    id: number;
    name: string;
    description: string;
    keunggulan_produk: string;
    images: string;
    user_id: string;
    user?: {
        name: string;
    };
    fitur_utama?: FiturUtama[];
    created_at: Date;
}

interface PageProps {
    flash?: { message?: string; error?: string };
    produkInovasi: ProdukInovasi[];
    [key: string]: unknown;
}

const produkInovasiColumns: ColumnDef<ProdukInovasi>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="text-left w-full">
                ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="text-center px-2 font-medium">
                #{row.getValue('id')}
            </div>
        ),
    },
    {
        accessorKey: 'name',
        header: () => (
            <Button variant="ghost" className='text-left w-full'>
                Nama Produk
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="text-center px-2 font-medium">
                {row.getValue('name')}
            </div>
        ),
    },
    {
        accessorKey: 'description',
        header: () => (
            <Button variant="ghost" className='text-left w-full'>
                Deskripsi
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="text-center px-2 max-w-xs">
                <div className="truncate">
                    {row.getValue('description')}
                </div>
            </div>
        ),
    },
    {
        accessorKey: 'keunggulan_produk',
        header: () => (
            <Button variant="ghost" className='text-left w-full'>
                Keunggulan Produk
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="text-center px-2 max-w-xs">
                <div className="truncate">
                    {row.getValue('keunggulan_produk')}
                </div>
            </div>
        ),
    },
    {
        accessorKey: 'fitur_utama',
        header: () => (
            <Button variant="ghost" className='text-left w-full'>
                Fitur Utama
            </Button>
        ),
        cell: ({ row }) => {
            const fiturUtama = row.original.fitur_utama || [];
            return (
                <div className="text-center px-2">
                    {fiturUtama.length > 0 ? (
                        <div className="flex flex-wrap gap-1 justify-center">
                            {fiturUtama.slice(0, 2).map((fitur) => (
                                <Badge key={fitur.id} variant="secondary" className="text-xs">
                                    {fitur.nama_fitur}
                                </Badge>
                            ))}
                            {fiturUtama.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                    +{fiturUtama.length - 2} lainnya
                                </Badge>
                            )}
                        </div>
                    ) : (
                        <span className="text-gray-500 text-sm">-</span>
                    )}
                </div>
            );
        },
        enableSorting: false,
    },
    {
        accessorKey: 'user_id',
        header: () => (
            <Button variant="ghost" className='text-left w-full'>
                Dibuat Oleh
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="text-center px-2 font-medium">
                {row.original.user?.name || 'N/A'}
            </div>
        ),
    },
    {
        accessorKey: 'created_at',
        header: () => (
            <Button variant="ghost" className='text-left w-full'>
                Tanggal Dibuat
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="text-center px-2">
                {new Date(row.getValue('created_at')).toLocaleDateString('id-ID')}
            </div>
        ),
    },
    {
        id: 'actions',
        header: () => (
            <Button variant="ghost" className="text-right w-full">
                Aksi
            </Button>
        ),
        cell: ({ row }) => {
            const produk = row.original;

            return (
                <div className="flex justify-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-blue-50 dark:hover:bg-blue-900/20 border-gray-300 text-blue-600 hover:text-blue-700"
                        onClick={() => router.get(`/admin/produk-inovasi/${produk.id}`)}
                    >
                        <Eye className="w-4 h-4" />
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-300"
                        onClick={() => router.get(`/admin/produk-inovasi/${produk.id}/edit`)}
                    >
                        <EditIcon className="w-4 h-4" />
                    </Button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-red-50 dark:hover:bg-red-900/20 border-gray-300 text-red-600 hover:text-red-700"
                            >
                                <TrashIcon className="w-4 h-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Apakah Anda yakin ingin menghapus produk inovasi ini?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Tindakan ini tidak dapat dibatalkan. Ini akan menghapus secara permanen produk inovasi <strong>{produk.name}</strong> beserta semua fitur utamanya.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => router.delete(`/admin/produk-inovasi/${produk.id}`)}
                                    className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                    Hapus
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
];

export default function ProdukInovasiIndex() {
    const { props } = usePage<PageProps>();
    const { produkInovasi, flash } = props;

    const safeProdukInovasi = Array.isArray(produkInovasi) ? produkInovasi.map((item) => ({
        ...item,
        created_at: new Date(item.created_at), // Ensure created_at is a Date object
    })) : [];

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Produk Inovasi',
            href: '#',
        },
    ];

    const table = useReactTable({
        data: safeProdukInovasi,
        columns: produkInovasiColumns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const debounce = (fn: Function, delay: number) => {
        let timer: NodeJS.Timeout;
        return (...args: any[]) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    };

    const filterRef = useRef(debounce((value: string) => {
        table.getColumn('name')?.setFilterValue(value);
    }, 300));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Produk Inovasi" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div>
                    {flash?.message && (
                        <Alert className="border-green-200 bg-green-50 dark:border-green-300 dark:bg-green-500 mb-4">
                            <CheckCircle2Icon className="h-4 w-4 text-green-600" />
                            <AlertTitle className="text-green-800">Berhasil!</AlertTitle>
                            <AlertDescription className="text-green-700">{flash.message}</AlertDescription>
                        </Alert>
                    )}
                    {flash?.error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertTitle>Error!</AlertTitle>
                            <AlertDescription>{flash.error}</AlertDescription>
                        </Alert>
                    )}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Produk Inovasi</CardTitle>
                        <CardDescription>Kelola produk inovasi dan fitur-fitur utamanya</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between py-4">
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Cari produk inovasi..."
                                        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                                        onChange={(event) => filterRef.current(event.target.value)}
                                        className="pl-8 max-w-sm"
                                    />
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="ml-auto">
                                            Kolom <ChevronDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        {table
                                            .getAllColumns()
                                            .filter((column) => column.getCanHide())
                                            .map((column) => {
                                                return (
                                                    <DropdownMenuCheckboxItem
                                                        key={column.id}
                                                        className="capitalize"
                                                        checked={column.getIsVisible()}
                                                        onCheckedChange={(value) =>
                                                            column.toggleVisibility(!!value)
                                                        }
                                                    >
                                                        {column.id === 'name' ? 'Nama Produk' :
                                                         column.id === 'description' ? 'Deskripsi' :
                                                         column.id === 'keunggulan_produk' ? 'Keunggulan' :
                                                         column.id === 'user_id' ? 'Dibuat Oleh' :
                                                         column.id === 'created_at' ? 'Tanggal Dibuat' :
                                                         column.id}
                                                    </DropdownMenuCheckboxItem>
                                                );
                                            })}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="flex items-center gap-2">
                                <Link href={create().url}>
                                    <Button>
                                        <CirclePlus className="mr-2 h-4 w-4" />
                                        Tambah Produk Inovasi
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                              header.column.columnDef.header,
                                                              header.getContext()
                                                          )}
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                    {table.getRowModel().rows?.length ? (
                                        table.getRowModel().rows.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                data-state={row.getIsSelected() && "selected"}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                            >
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={produkInovasiColumns.length}
                                                className="h-24 text-center"
                                            >
                                                <div className="flex flex-col items-center justify-center py-6">
                                                    <div className="text-gray-500 mb-2">
                                                        Tidak ada produk inovasi yang ditemukan.
                                                    </div>
                                                    <Link href={create().url}>
                                                        <Button variant="outline" size="sm">
                                                            <CirclePlus className="mr-2 h-4 w-4" />
                                                            Tambah Produk Inovasi Pertama
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex items-center justify-between space-x-2 py-4">
                            <div className="flex-1 text-sm text-muted-foreground">
                                {table.getFilteredSelectedRowModel().rows.length} dari{" "}
                                {table.getFilteredRowModel().rows.length} produk dipilih.
                            </div>
                            <div className="flex items-center space-x-2">
                                <p className="text-sm font-medium">
                                    Halaman {table.getState().pagination.pageIndex + 1} dari{" "}
                                    {table.getPageCount()}
                                </p>
                                <div className="space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => table.previousPage()}
                                        disabled={!table.getCanPreviousPage()}
                                    >
                                        Sebelumnya
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => table.nextPage()}
                                        disabled={!table.getCanNextPage()}
                                    >
                                        Selanjutnya
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
