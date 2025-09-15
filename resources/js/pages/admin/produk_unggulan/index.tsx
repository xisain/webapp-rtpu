import App from "@/actions/App";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, usePage, Link } from "@inertiajs/react";
import { produkUnggulan } from "@/routes/admin";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
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
import { ArrowUpDown, CirclePlus, EditIcon, TrashIcon, ChevronDown, CheckCircle2Icon, Search } from 'lucide-react';
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
import { create } from "@/routes/admin/produk-unggulan";

interface ProdukUnggulan {
    id: number;
    name: string;
    description: string;
    link_video_demo: string;
    link_video_pemaparan: string;
    main_image: string;
    user_id: string;
    user?: {
        name: string;
    };
    created_at: Date;
}

interface PageProps {
    flash?: { message?: string; error?: string };
    produkunggulan: ProdukUnggulan[];
    [key: string]: unknown;
}

const produkUnggulanColumns: ColumnDef<ProdukUnggulan>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
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
                Name
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
                Description
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="text-center px-2">
                {row.getValue('description')}
            </div>
        ),
    },
    {
        accessorKey: 'user_id',
        header: () => (
            <Button variant="ghost" className='text-left w-full'>
                User Name
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
                Created At
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="text-center px-2">
                {new Date(row.getValue('created_at')).toLocaleDateString()}
            </div>
        ),
    },
    {
        id: 'actions',
        header: () => (
            <Button variant="ghost" className="text-right w-full">
                Action
            </Button>
        ),
        cell: ({ row }) => {
            const produk = row.original;

            return (
                <div className="flex justify-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-300"
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
                                    Are you sure you want to delete this produk unggulan?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the produk unggulan <strong>{produk.name}</strong>.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => {
                                        console.log('Delete produk unggulan:', produk.id);
                                    }}
                                    className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                    Delete
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

export default function ProdukUnggulans() {
    const { props } = usePage<PageProps>();
    const { produkunggulan, flash } = props;

    const safeProdukUnggulan = Array.isArray(produkunggulan) ? produkunggulan.map((item) => ({
        ...item,
        created_at: new Date(item.created_at), // Ensure created_at is a Date object
    })) : [];

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Produk Unggulan',
            href: produkUnggulan().url,
        },
    ];

    const table = useReactTable({
        data: safeProdukUnggulan,
        columns: produkUnggulanColumns,
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Produk Unggulan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div>
                    {flash?.message && (
                        <Alert className="border-green-200 bg-green-50 dark:border-green-300 dark:bg-green-500">
                            <CheckCircle2Icon className="h-4 w-4 text-green-600" />
                            <AlertTitle className="text-green-800">Success!</AlertTitle>
                            <AlertDescription className="text-green-700">{flash.message}</AlertDescription>
                        </Alert>
                    )}
                    {flash?.error && (
                        <Alert variant="destructive">
                            <AlertTitle>Error!</AlertTitle>
                            <AlertDescription>{flash.error}</AlertDescription>
                        </Alert>
                    )}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Produk Unggulan</CardTitle>
                        <CardDescription>Manage Your Produk Unggulan</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between py-4">
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Filter Produk Unggulan..."
                                        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                                        onChange={(event) =>
                                            table.getColumn('name')?.setFilterValue(event.target.value)
                                        }
                                        className="pl-8 max-w-sm"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                    <Link href={create().url}>
                                <Button>
                                    <CirclePlus className="mr-2 h-4 w-4" />
                                    Add Produk Unggulan
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
                                                <TableCell key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                              header.column.columnDef.header,
                                                              header.getContext()
                                                          )}
                                                </TableCell>
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
                                                colSpan={produkUnggulanColumns.length}
                                                className="h-24 text-center"
                                            >
                                                No results.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex items-center justify-between space-x-2 py-4">
                            <div className="flex-1 text-sm text-muted-foreground">
                                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                                {table.getFilteredRowModel().rows.length} row(s) selected.
                            </div>
                            <div className="space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
