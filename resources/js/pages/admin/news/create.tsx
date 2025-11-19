// Frontend - React Component (NewsCreate.tsx)
import AppLayout from "@/layouts/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type BreadcrumbItem } from "@/types";
import { Link, useForm, router, usePage } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { FormEvent, useEffect } from "react";

// 👉 TRIX EDITOR
import "trix/dist/trix.css";
import "trix";

import { news } from "@/routes/admin";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "News",
        href: news().url,
    },
    {
        title: "Tambah Berita",
        href: "#",
    },
];

interface User {
    role: {
        name: string;
        id: number;
    };
}

export interface PageProps {
    user: User;
}

export default function NewsCreate() {
    const { props } = usePage<PageProps>();
    const { user } = props;

    const { data, setData, processing, errors, clearErrors } = useForm({
        judul: "",
        description: "",
        images: null as File | null,
    });

    // 👉 Saat trix berubah, update ke inertia
    useEffect(() => {
        const handleTrixChange = (e: any) => {
            const content = e.target.innerHTML;
            setData("description", content);
        };

        document.addEventListener("trix-change", handleTrixChange);

        return () => {
            document.removeEventListener("trix-change", handleTrixChange);
        };
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        clearErrors();

        // 🔥 Validasi ukuran file (max 4MB)
        if (data.images && data.images.size > 4096 * 1024) {
            alert("Ukuran gambar tidak boleh lebih dari 4MB");
            return;
        }

        const url = "/admin/news/store";

        const formData = new FormData();
        // 🔥 FIX: Gunakan 'judul' bukan 'name'
        formData.append("judul", data.judul);
        formData.append("description", data.description);

        if (data.images) formData.append("images", data.images);

        router.post(url, formData, {
            onSuccess: () => {
                console.log("Berita berhasil disimpan");
            },
            onError: (err) => {
                console.error("Error:", err);
            },
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-fill flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Tambah Berita</CardTitle>
                        <CardDescription>
                            Lengkapi form berikut untuk membuat berita baru
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* JUDUL */}
                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <Label htmlFor="judul">Judul Berita *</Label>
                                    <Input
                                        id="judul"
                                        value={data.judul}
                                        onChange={(e) => setData("judul", e.target.value)}
                                        className={errors.judul ? "border-red-500" : ""}
                                        placeholder="Masukkan judul berita"
                                    />
                                    {errors.judul && (
                                        <span className="text-red-500 text-sm">{errors.judul}</span>
                                    )}
                                </div>

                                {/* GAMBAR */}
                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <Label htmlFor="images">Gambar (16:9) *</Label>
                                    <Input
                                        id="images"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] || null;
                                            if (file && file.size > 4096 * 1024) {
                                                alert("Ukuran gambar maksimal 4MB");
                                                e.target.value = "";
                                                return;
                                            }
                                            setData("images", file);
                                        }}
                                    />
                                    <span className="text-xs text-gray-500">Maksimal 4MB</span>
                                    {errors.images && (
                                        <span className="text-red-500 text-sm">{errors.images}</span>
                                    )}
                                </div>

                                {/* DESKRIPSI — TRIX */}
                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <Label>Isi Berita *</Label>

                                    {/* hidden input untuk TRIX */}
                                    <input id="description" type="hidden" value={data.description} />

                                    <trix-editor
                                        input="description"
                                        className="border rounded-lg bg-white p-2"
                                        style={{ minHeight: "300px" }}
                                    ></trix-editor>

                                    {errors.description && (
                                        <span className="text-red-500 text-sm">{errors.description}</span>
                                    )}
                                </div>
                            </div>

                            {/* ACTION BUTTONS */}
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <Button type="button" variant="outline" asChild>
                                    <Link href={news().url}>Batal</Link>
                                </Button>

                                <Button type="submit" disabled={processing} className="min-w-[120px]">
                                    {processing ? "Menyimpan..." : "Simpan Berita"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}