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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Search, Plus, MoreHorizontal, Eye, Edit2, Trash2,
  ArrowUpDown, ChevronLeft, ChevronRight, CheckCircle, XCircle,
} from "lucide-react";

import { Link, router } from "@inertiajs/react";

// 🔥 FIX: Sesuaikan dengan field database
type NewsItem = {
  id: number;
  judul: string;           // ✅ Pakai 'judul' bukan 'name'
  description: string;
  user?: { id: number; name: string; email: string; };
  created_at: string;
  image_links: string;
};

interface FlashMessage {
  type: "success" | "error";
  message: string;
}

// 🔥 FIX: News bisa berupa array atau pagination object
interface Props {
  news: {
    data: NewsItem[];
    current_page?: number;
    last_page?: number;
  } | NewsItem[];
  user: { id: number; name: string; role_id: number };
  flash?: { message?: string; error?: string };
}

const breadcrumbs: BreadcrumbItem[] = [{ title: "News", href: "#" }];

export default function NewsIndex({ news, user, flash }: Props) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof NewsItem>("judul"); // ✅ Ganti 'name' → 'judul'
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; item: NewsItem | null }>({ open: false, item: null });
  const [flashMessages, setFlashMessages] = useState<FlashMessage[]>([]);
  const itemsPerPage = 10;

  // 🔥 FIX: Handle both pagination and array format
  const newsData = Array.isArray(news) ? news : news.data || [];

  useEffect(() => {
    const messages: FlashMessage[] = [];
    if (flash?.message) messages.push({ type: "success", message: flash.message });
    if (flash?.error) messages.push({ type: "error", message: flash.error });
    setFlashMessages(messages);
  }, [flash]);

  const truncateText = (text: string, maxLength: number = 80) =>
    text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  const getInitials = (name: string) =>
    name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  const handleSort = (field: keyof NewsItem) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleDelete = (item: NewsItem) => setDeleteDialog({ open: true, item });

  const confirmDelete = () => {
    if (user.role_id === 1) {
      router.delete(`/admin/news/${deleteDialog.item?.id}`);
    } else {
      router.delete(`/dosen/news/${deleteDialog.item?.id}`);
    }
    setDeleteDialog({ open: false, item: null });
  };

  const dismissFlashMessage = (index: number) =>
    setFlashMessages(prev => prev.filter((_, i) => i !== index));

  // 🔥 FIX: Gunakan newsData dan field 'judul'
  const filteredData = newsData.filter(item =>
    (item.judul || "").toLowerCase().includes(search.toLowerCase()) ||
    (item.user?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];

    if (sortField === "user") {
      aValue = a.user?.name || "";
      bValue = b.user?.name || "";
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="flex flex-col gap-4 p-4">

        {/* Flash Messages */}
        {flashMessages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 rounded-md border p-3 text-sm ${
              msg.type === "success"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {msg.type === "success" ? (
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
                <CardTitle className="text-2xl font-bold">News</CardTitle>
                <CardDescription>Kelola data News Anda</CardDescription>
              </div>

              <Link href={user.role_id === 1 ? "/admin/news/create" : "/dosen/news/create"}>
                <Button className="gap-2"><Plus className="h-4 w-4" /> Tambah News</Button>
              </Link>
            </div>
          </CardHeader>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cari berita..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="text-sm text-muted-foreground">
                {paginatedData.length} dari {sortedData.length} berita
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>

                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("judul")} className="flex items-center gap-2">
                        Judul <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </TableHead>

                    <TableHead>Deskripsi</TableHead>

                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("user")} className="flex items-center gap-2">
                        Author <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </TableHead>

                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("created_at")} className="flex items-center gap-2">
                        Tanggal <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </TableHead>

                    <TableHead className="w-[100px]">Aksi</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.judul}</TableCell>
                        <TableCell>
                          <div 
                            dangerouslySetInnerHTML={{ 
                              __html: truncateText(item.description || "Tidak ada deskripsi") 
                            }} 
                          />
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="" />
                              <AvatarFallback>{item.user?.name ? getInitials(item.user.name) : "N/A"}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{item.user?.name || "N/A"}</div>
                              <div className="text-sm text-muted-foreground">{item.user?.email}</div>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          {new Date(item.created_at).toLocaleDateString("id-ID", {
                            day: "2-digit", month: "short", year: "numeric",
                          })}
                        </TableCell>

                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => router.visit(`/news/detail-news/${item.id}`)}>
                                <Eye className="mr-2 h-4 w-4" /> Lihat Detail
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() =>
                                  router.get(
                                    user.role_id === 1
                                      ? `/admin/news/${item.id}/edit`
                                      : `/dosen/news/${item.id}/edit`
                                  )
                                }
                              >
                                <Edit2 className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                className="text-red-600"
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
                        Tidak ada data news
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
                  Halaman {currentPage} dari {totalPages}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" /> Sebelumnya
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
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
                Apakah Anda yakin ingin menghapus "{deleteDialog.item?.judul}"?
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>

              <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AppLayout>
  );
}