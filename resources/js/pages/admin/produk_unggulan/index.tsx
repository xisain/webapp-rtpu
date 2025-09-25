import React, { useState, useEffect } from "react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search, Plus, MoreHorizontal, Eye, Edit2, Trash2, ArrowUpDown,
  Video, Image as ImageIcon, ChevronLeft, ChevronRight,
  CheckCircle, XCircle, AlertCircle, Info,
} from "lucide-react";
import { Link, router } from "@inertiajs/react";
import { createPU, deletePU, editPU } from "@/routes/admin/produk-unggulan";
import { dosenCreate, dosenDelete, dosenEditPU } from "@/routes/dosen/produk-unggulan";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { detailProdukUnggulan } from "@/routes";

// --- Types ---
interface ProdukUnggulan {
  id: number;
  name: string;
  description: string;
  link_video_demo?: string;
  link_video_pemaparan?: string;
  main_image?: string;
  user_id: number;
  user?: { id: number; name: string; email: string };
  created_at: string;
  updated_at: string;
}

interface FlashMessage {
  type: "success" | "error";
  message: string;
}

interface Props {
  produkunggulan: ProdukUnggulan[];
  user: any;
  flash?: { message?: string; error?: string };
}

// --- Breadcrumbs ---
const breadcrumbs: BreadcrumbItem[] = [{ title: "Produk Unggulan", href: "#" }];

export default function IndexProdukUngglan({ produkunggulan, user, flash }: Props) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof ProdukUnggulan>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; item: ProdukUnggulan | null }>({ open: false, item: null });
  const [flashMessages, setFlashMessages] = useState<FlashMessage[]>([]);
  const itemsPerPage = 10;
  const url = user.role_id == 1 ? createPU().url : dosenCreate().url;

  // --- Initialize flash messages from Laravel session ---
  useEffect(() => {
    const messages: FlashMessage[] = [];
    if (flash?.message) messages.push({ type: "success", message: flash.message });
    if (flash?.error) messages.push({ type: "error", message: flash.error });
    setFlashMessages(messages);
  }, [flash]);

  // --- Helpers ---
  const truncateText = (text: string, maxLength: number = 80) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  const getInitials = (name: string) =>
    name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  const handleSort = (field: keyof ProdukUnggulan) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleDelete = (item: ProdukUnggulan) => setDeleteDialog({ open: true, item });

  const confirmDelete = () => {
   if (user.role_id === 1) {
    router.delete(`/admin/produk-unggulan/${deleteDialog.item.id}`)
    } else {
    router.delete(`/dosen/produk-unggulan/${deleteDialog.item.id}`)
    }

    setDeleteDialog({ open: false, item: null });
  };

  const dismissFlashMessage = (index: number) =>
    setFlashMessages(prev => prev.filter((_, i) => i !== index));


  // --- Filter + Sort ---
  const filteredData = produkunggulan.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    (item.user?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];

    if (sortField === "user" && a.user && b.user) {
      aValue = a.user.name;
      bValue = b.user.name;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortDirection === "asc" ? (aValue < bValue ? -1 : 1) : (aValue > bValue ? -1 : 1);
  });

  // --- Pagination ---
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
    <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
      <div className="space-y-6">
        {/* Flash Messages */}
         {flashMessages.map((msg, index) => (
    <div
      key={index}
      className={`flex items-start gap-2 rounded-md border p-3 text-sm ${
        msg.type === 'success'
          ? 'border-green-200 bg-green-50 text-green-700'
          : 'border-red-200 bg-red-50 text-red-700'
      }`}
    >
      {msg.type === 'success' ? (
        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
      ) : (
        <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
      )}
      <div className="flex-1">{msg.message}</div>
      <button
        onClick={() => dismissFlashMessage(index)}
        className="ml-2 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>
    </div>
  ))}

        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">Produk Unggulan</CardTitle>
                <CardDescription>Kelola data produk unggulan Anda</CardDescription>
              </div>
              <Link href={url}>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" /> Tambah Produk
                </Button>
              </Link>
            </div>
          </CardHeader>
        </Card>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cari produk unggulan..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                {paginatedData.length} dari {sortedData.length} produk
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">
                      <Button variant="ghost" className="h-auto p-0 font-medium hover:bg-transparent"
                        onClick={() => handleSort("name")}>
                        Produk <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead>
                      <Button variant="ghost" className="h-auto p-0 font-medium hover:bg-transparent"
                        onClick={() => handleSort("user")}>
                        Author <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" className="h-auto p-0 font-medium hover:bg-transparent"
                        onClick={() => handleSort("created_at")}>
                        Tanggal <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="w-[100px]">Aksi</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              {item.main_image ? (
                                <img src={`/storage/${item.main_image}`}alt={item.name}
                                  className="w-12 h-12 rounded-lg object-cover" />
                              ) : (
                                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                                  <ImageIcon className="h-6 w-6 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-medium text-gray-900 truncate dark:text-gray-100">{item.name}</div>
                              <div className="text-sm text-muted-foreground">ID: {item.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[200px]">
                            <p className="text-sm text-gray-900 dark:text-gray-100">{truncateText(item.description)}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3 ">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="" />
                              <AvatarFallback className="text-xs">
                                {item.user?.name ? getInitials(item.user.name) : "N/A"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {item.user?.name || "N/A"}
                              </div>
                              <div className="text-sm text-muted-foreground ">
                                {item.user?.email || ""}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-900 dark:text-gray-100">
                            {new Date(item.created_at).toLocaleDateString("id-ID", {
                              day: "2-digit", month: "short", year: "numeric",
                            })}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                        {user.role_id === 1 ? (
                            <>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => router.visit(detailProdukUnggulan(item.id))}
                            >
                                <Eye className="mr-2 h-4 w-4" /> Lihat Detail
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => router.visit(editPU(item.id))}
                            >
                                <Edit2 className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            </>
                        ) : (
                            <>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => router.visit(detailProdukUnggulan(item.id))}
                            >
                                <Eye className="mr-2 h-4 w-4" /> Lihat Detail (Dosen)
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => router.visit(dosenEditPU(item.id))}
                            >
                                <Edit2 className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            </>
                        )}
                        <DropdownMenuItem
                            className="cursor-pointer text-red-600"
                            onClick={() => handleDelete(item)}
                        >
                            <Trash2 className="mr-2 h-4 w-4" /> Hapus
                        </DropdownMenuItem>
                        </DropdownMenuContent>

                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-32 text-center">
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <div className="text-muted-foreground">
                            {search
                              ? "Tidak ada data yang sesuai dengan pencarian"
                              : "Belum ada data produk unggulan"}
                          </div>
                          {!search && (
                            <Button variant="outline" size="sm"
                            onClick={() => router.visit(url)}
                            >
                              <Plus className="h-4 w-4 mr-2" /> Tambah Produk Pertama
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-muted-foreground">
                  Halaman {currentPage} dari {totalPages} ({sortedData.length} total produk)
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}>
                    <ChevronLeft className="h-4 w-4" /> Sebelumnya
                  </Button>

                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className="w-8 h-8 p-0"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>

                  <Button variant="outline" size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}>
                    Selanjutnya <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delete Confirmation */}
        <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus produk "{deleteDialog.item?.name}"?
                Tindakan ini tidak dapat dibatalkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      </div>
    </AppLayout>
  );
}
