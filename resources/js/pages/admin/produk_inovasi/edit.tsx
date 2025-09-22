// Frontend - React Component (ProdukInovasiEdit.tsx)
import AppLayout from "@/layouts/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { type BreadcrumbItem } from "@/types";
import { Link, useForm, router, usePage } from "@inertiajs/react";
import { CirclePlus, Trash2, Download } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { produkInovasi } from "@/routes/admin"; // Sesuaikan dengan route yang ada
import React, { useState, useEffect, FormEvent } from "react";

interface User {
    role: {
        id: number;
    }
}

interface FiturUtamaItem {
    id: number;
    nama_fitur: string;
    produk_inovasi_id?: number;
    isNew?: boolean;
}

interface ProdukInovasi {
    id: number;
    name: string;
    description: string;
    keunggulan_produk: string;
    images: string | null;
    pdf: string | null;
    user_id: number;
    fitur_utama: FiturUtamaItem[];
}

export interface PageProps {
    user: User;
    produkInovasi: ProdukInovasi;
}

export default function ProdukInovasiEdit() {
    const { props } = usePage<PageProps>();
    const { user, produkInovasi: initialData } = props;

    // Debug: Log the received data
    // console.log('Initial Data:', initialData);
    // console.log('Fitur Utama:', initialData?.fitur_utama);

    const [fiturUtamaItems, setFiturUtamaItems] = useState<FiturUtamaItem[]>([]);
    const [nextId, setNextId] = useState(1);
    const [deletedFiturIds, setDeletedFiturIds] = useState<number[]>([]);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Produk Inovasi',
            href: produkInovasi().url,
        },
        {
            title: 'Edit Produk Inovasi',
            href: '#',
        }
    ];

    const { data, setData, post, processing, errors, clearErrors } = useForm({
        name: initialData.name,
        description: initialData.description,
        keunggulan_produk: initialData.keunggulan_produk,
        images: null as File | null,
        pdf: null as File | null,
        _method: 'PUT' // Laravel method spoofing
    });

    // Initialize fitur utama items from existing data
    useEffect(() => {
        // Handle the case where fitur_utama might be undefined or empty
        const fiturUtamaData = initialData?.fitur_utama || [];

        const existingFitur = fiturUtamaData.map(fitur => ({
            ...fitur,
            isNew: false
        }));
        setFiturUtamaItems(existingFitur);

        // Set next ID based on existing items
        const maxId = existingFitur.length > 0 ? Math.max(...existingFitur.map(item => item.id), 0) : 0;
        setNextId(maxId + 1);
    }, [initialData]);

    const addFiturUtamaItem = () => {
        const newItem: FiturUtamaItem = {
            id: nextId,
            nama_fitur: '',
            isNew: true
        };
        setFiturUtamaItems([...fiturUtamaItems, newItem]);
        setNextId(nextId + 1);
    };

    const removeFiturUtamaItem = (id: number) => {
        const itemToRemove = fiturUtamaItems.find(item => item.id === id);

        if (itemToRemove && !itemToRemove.isNew) {
            // If it's an existing item, add to deleted list
            setDeletedFiturIds([...deletedFiturIds, id]);
        }

        setFiturUtamaItems(fiturUtamaItems.filter(item => item.id !== id));
    };

    const handleFiturUtamaChange = (id: number, field: keyof FiturUtamaItem, value: string) => {
        setFiturUtamaItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        clearErrors();

        const url = user?.role?.id === 1
            ? `/admin/produk-inovasi/${initialData.id}/update`
            : `/dosen/produk-inovasi/${initialData.id}/update`;

        // Create FormData for file upload
        const formData = new FormData();

        // Add method spoofing for Laravel
        formData.append('_method', 'PUT');

        // Add basic form data
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('keunggulan_produk', data.keunggulan_produk);

        // Add images if exists (new file selected)
        if (data.images) {
            formData.append('images', data.images);
        }

        // Add pdf if exists (new file selected)
        if (data.pdf) {
            formData.append('pdf', data.pdf);
        }

        // Add existing fitur utama data
        const existingFiturUtama = fiturUtamaItems.filter(item => !item.isNew);
        existingFiturUtama.forEach((item, index) => {
            formData.append(`existing_fitur_utama[${index}][id]`, item.id.toString());
            formData.append(`existing_fitur_utama[${index}][nama_fitur]`, item.nama_fitur);
        });

        // Add new fitur utama data
        const newFiturUtama = fiturUtamaItems.filter(item => item.isNew && item.nama_fitur.trim() !== '');
        newFiturUtama.forEach((item, index) => {
            formData.append(`new_fitur_utama[${index}][nama_fitur]`, item.nama_fitur);
        });

        // Add deleted fitur utama IDs
        deletedFiturIds.forEach((id, index) => {
            formData.append(`deleted_fitur_utama[${index}]`, id.toString());
        });

        // Add counts for backend processing
        formData.append('existing_fitur_utama_count', existingFiturUtama.length.toString());
        formData.append('new_fitur_utama_count', newFiturUtama.length.toString());
        formData.append('deleted_fitur_utama_count', deletedFiturIds.length.toString());

        // Use router.post for better control over FormData
        router.post(url, formData, {
            onSuccess: () => {
                console.log('Produk inovasi berhasil diupdate');
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            },
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const downloadPdf = () => {
        if (initialData.pdf) {
            const filename = initialData.pdf.split('/').pop();
            window.open(`/admin/produk-inovasi/download-pdf/${filename}`, '_blank');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-fill flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Produk Inovasi</CardTitle>
                        <CardDescription>
                            Edit data produk inovasi "{initialData.name}"
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="name">Nama Produk *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={errors.name ? "border-red-500" : ""}
                                    />
                                    {errors.name && (
                                        <span className="text-red-500 text-sm">{errors.name}</span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="description">Deskripsi *</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className={errors.description ? "border-red-500" : ""}
                                        rows={3}
                                    />
                                    {errors.description && (
                                        <span className="text-red-500 text-sm">{errors.description}</span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <Label htmlFor="keunggulan_produk">Keunggulan Produk *</Label>
                                    <Textarea
                                        id="keunggulan_produk"
                                        value={data.keunggulan_produk}
                                        onChange={(e) => setData('keunggulan_produk', e.target.value)}
                                        className={errors.keunggulan_produk ? "border-red-500" : ""}
                                        rows={4}
                                        placeholder="Jelaskan keunggulan-keunggulan produk inovasi ini..."
                                    />
                                    {errors.keunggulan_produk && (
                                        <span className="text-red-500 text-sm">{errors.keunggulan_produk}</span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <Label htmlFor="images">Gambar Produk Rasio(16:9)</Label>

                                    {/* Show current image if exists */}
                                    {initialData.images && (
                                        <div className="mb-4">
                                            <p className="text-sm text-gray-600 mb-2">Gambar saat ini:</p>
                                            <img
                                                src={`/storage/${initialData.images}`}
                                                alt="Current product image"
                                                className="max-w-xs h-auto rounded-lg border"
                                            />
                                        </div>
                                    )}

                                    <Input
                                        id="images"
                                        type="file"
                                        accept="image/jpeg,image/png,image/jpg,image/gif"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] || null;
                                            setData('images', file);
                                        }}
                                        className={errors.images ? "border-red-500" : ""}
                                    />
                                    <span className="text-sm text-gray-500">
                                        Format: JPEG, PNG, JPG, GIF. Maksimal 2MB. Kosongkan jika tidak ingin mengubah gambar.
                                    </span>
                                    {errors.images && (
                                        <span className="text-red-500 text-sm">{errors.images}</span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <Label htmlFor="pdf">File PDF Lampiran Penelitian</Label>

                                    {/* Show current PDF if exists */}
                                    {initialData.pdf && (
                                        <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
                                            <p className="text-sm text-gray-600 mb-2">File PDF saat ini:</p>
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm font-medium">
                                                    {initialData.pdf.split('/').pop()}
                                                </span>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={downloadPdf}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Download className="h-4 w-4" />
                                                    Download
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    <Input
                                        id="pdf"
                                        type="file"
                                        accept="application/pdf"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] || null;
                                            setData('pdf', file);
                                        }}
                                        className={errors.pdf ? "border-red-500" : ""}
                                    />
                                    <span className="text-sm text-gray-500">
                                        Format: PDF. Maksimal 5MB. Kosongkan jika tidak ingin mengubah file PDF.
                                    </span>
                                    {errors.pdf && (
                                        <span className="text-red-500 text-sm">{errors.pdf}</span>
                                    )}
                                </div>
                            </div>

                            {/* Dynamic Fitur Utama Section */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>Fitur Utama Produk</CardTitle>
                                        <CardDescription>
                                            Edit fitur-fitur utama dari produk inovasi
                                        </CardDescription>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={addFiturUtamaItem}
                                        className="flex items-center gap-2"
                                    >
                                        <CirclePlus className="h-4 w-4" />
                                        Tambah Fitur
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    {fiturUtamaItems.length === 0 ? (
                                        <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                                            <CirclePlus className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                            <p>Belum ada fitur utama yang ditambahkan</p>
                                            <p className="text-sm">Klik "Tambah Fitur" untuk menambah fitur utama produk</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {fiturUtamaItems.map((item, index) => (
                                                <div
                                                    key={item.id}
                                                    className={`flex items-start gap-4 p-4 border rounded-lg ${
                                                        item.isNew ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                                                    }`}
                                                >
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <Label htmlFor={`fitur-${item.id}`} className="font-medium">
                                                                Fitur Utama {index + 1}
                                                            </Label>
                                                            {item.isNew && (
                                                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                                    Baru
                                                                </span>
                                                            )}
                                                        </div>
                                                        <Input
                                                            id={`fitur-${item.id}`}
                                                            value={item.nama_fitur}
                                                            onChange={(e) => handleFiturUtamaChange(item.id, 'nama_fitur', e.target.value)}
                                                            placeholder="Masukkan nama fitur utama"
                                                            className="mt-2 bg-white"
                                                        />
                                                    </div>

                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => removeFiturUtamaItem(item.id)}
                                                        className="flex items-center gap-2 flex-shrink-0"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        Hapus
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {errors.fitur_utama && (
                                        <span className="text-red-500 text-sm mt-2 block">{errors.fitur_utama}</span>
                                    )}
                                </CardContent>
                            </Card>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <Button type="button" variant="outline" asChild>
                                    <Link href={produkInovasi().url}>
                                        Batal
                                    </Link>
                                </Button>
                                <Button type="submit" disabled={processing} className="min-w-[120px]">
                                    {processing ? (
                                        <div className="flex items-center gap-2">
                                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                            Menyimpan...
                                        </div>
                                    ) : (
                                        'Update Produk'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
