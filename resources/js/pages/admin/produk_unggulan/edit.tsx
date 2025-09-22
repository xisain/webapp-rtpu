// Frontend - React Component (ProdukUnggulanEdit.tsx)
import AppLayout from "@/layouts/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { type BreadcrumbItem } from "@/types";
import { Link, useForm, router, usePage } from "@inertiajs/react";
import { CirclePlus, Trash2, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { produkUnggulan } from "@/routes/admin";
import React, { useState, FormEvent } from "react";

interface GalleryItem {
    id: number;
    file: File | null;
    preview: string | null;
    name: string;
    isNew: boolean;
}

interface ExistingGallery {
    id: number;
    image_path: string;
}

interface ProdukUnggulan {
    id: number;
    name: string;
    description: string;
    link_video_demo: string | null;
    link_video_pemaparan: string | null;
    main_image: string | null;
    gallery: ExistingGallery[];
}

interface User {
    role: {
        id: number;
    }
}

export interface PageProps {
    user: User;
    produkUnggulan: ProdukUnggulan;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Produk Unggulan',
        href: produkUnggulan().url,
    },
    {
        title: 'Edit Produk Unggulan',
        href: '#',
    }
];

export default function ProdukUnggulanEdit() {
    const { props } = usePage<PageProps>();
    const { user, produkUnggulan: product } = props;

    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
    const [existingGallery, setExistingGallery] = useState<ExistingGallery[]>(product.gallery || []);
    const [removedGalleryIds, setRemovedGalleryIds] = useState<number[]>([]);
    const [nextId, setNextId] = useState(1);

    const { data, setData, post, processing, errors, clearErrors } = useForm({
        name: product.name || '',
        description: product.description || '',
        link_video_demo: product.link_video_demo || '',
        link_video_pemaparan: product.link_video_pemaparan || '',
        main_image: null as File | null,
    });

    const addGalleryItem = () => {
        const newItem: GalleryItem = {
            id: nextId,
            file: null,
            preview: null,
            name: `gallery_${nextId}`,
            isNew: true
        };
        setGalleryItems([...galleryItems, newItem]);
        setNextId(nextId + 1);
    };

    const removeGalleryItem = (id: number) => {
        const itemToRemove = galleryItems.find(item => item.id === id);
        if (itemToRemove?.preview) {
            URL.revokeObjectURL(itemToRemove.preview);
        }
        setGalleryItems(galleryItems.filter(item => item.id !== id));
    };

    const removeExistingGallery = (galleryId: number) => {
        setRemovedGalleryIds([...removedGalleryIds, galleryId]);
        setExistingGallery(existingGallery.filter(item => item.id !== galleryId));
    };

    const restoreExistingGallery = (galleryId: number) => {
        setRemovedGalleryIds(removedGalleryIds.filter(id => id !== galleryId));
        const restoredItem = product.gallery.find(item => item.id === galleryId);
        if (restoredItem) {
            setExistingGallery([...existingGallery, restoredItem]);
        }
    };

    const handleGalleryFileChange = (id: number, file: File | null) => {
        setGalleryItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    // Clean up previous preview URL
                    if (item.preview) {
                        URL.revokeObjectURL(item.preview);
                    }

                    const preview = file ? URL.createObjectURL(file) : null;
                    return { ...item, file, preview };
                }
                return item;
            })
        );
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        clearErrors();

        // Create FormData for file upload
        const formData = new FormData();

        // Add basic form data
        formData.append('_method', 'PUT');
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('link_video_demo', data.link_video_demo);
        formData.append('link_video_pemaparan', data.link_video_pemaparan);

        // Add main image if changed
        if (data.main_image) {
            formData.append('main_image', data.main_image);
        }

        // Add removed gallery IDs
        removedGalleryIds.forEach((id, index) => {
            formData.append(`removed_gallery[${index}]`, id.toString());
        });

        // Add new gallery files
        const validGalleryItems = galleryItems.filter(item => item.file !== null);
        validGalleryItems.forEach((item, index) => {
            if (item.file) {
                formData.append(`gallery[${index}]`, item.file);
            }
        });

        // Add gallery count for backend validation
        formData.append('gallery_count', validGalleryItems.length.toString());

        // Use router.post for form submission with method spoofing
        const url = user?.role?.id === 1
            ? `/admin/produk-unggulan/update/${product.id}`
            : `/dosen/produk-unggulan/update/${product.id}`;

        router.post(url, formData, {
            onSuccess: () => {
                galleryItems.forEach(item => {
                    if (item.preview) {
                        URL.revokeObjectURL(item.preview);
                    }
                });
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            },
            forceFormData: true,
            preserveScroll: true,
        });
    };

    // Cleanup preview URLs on component unmount
    React.useEffect(() => {
        return () => {
            galleryItems.forEach(item => {
                if (item.preview) {
                    URL.revokeObjectURL(item.preview);
                }
            });
        };
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex h-fill flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Produk Unggulan</CardTitle>
                        <CardDescription>
                            Perbarui informasi produk unggulan
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
                                    <Label htmlFor="deskripsi">Deskripsi *</Label>
                                    <Textarea
                                        id="deskripsi"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className={errors.description ? "border-red-500" : ""}
                                        rows={3}
                                    />
                                    {errors.description && (
                                        <span className="text-red-500 text-sm">{errors.description}</span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="link_video_pemaparan">Link Video Pemaparan</Label>
                                    <Input
                                        id="link_video_pemaparan"
                                        type="url"
                                        placeholder="https://..."
                                        value={data.link_video_pemaparan}
                                        onChange={(e) => setData('link_video_pemaparan', e.target.value)}
                                        className={errors.link_video_pemaparan ? "border-red-500" : ""}
                                    />
                                    {errors.link_video_pemaparan && (
                                        <span className="text-red-500 text-sm">{errors.link_video_pemaparan}</span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="link_video_demo">Link Video Demo</Label>
                                    <Input
                                        id="link_video_demo"
                                        type="url"
                                        placeholder="https://..."
                                        value={data.link_video_demo}
                                        onChange={(e) => setData('link_video_demo', e.target.value)}
                                        className={errors.link_video_demo ? "border-red-500" : ""}
                                    />
                                    {errors.link_video_demo && (
                                        <span className="text-red-500 text-sm">{errors.link_video_demo}</span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <Label htmlFor="main_image">Gambar Poster (Rasio 9:16)</Label>
                                    {product.main_image && (
                                        <div className="mb-2">
                                            <p className="text-sm text-gray-600 mb-2">Gambar saat ini:</p>
                                            <img
                                                src={`/storage/${product.main_image}`}
                                                alt="Current main image"
                                                className="w-32 h-48 object-cover rounded-md border"
                                            />
                                        </div>
                                    )}
                                    <Input
                                        id="main_image"
                                        type="file"
                                        accept="image/jpeg,image/png,image/jpg,image/gif"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] || null;
                                            setData('main_image', file);
                                        }}
                                        className={errors.main_image ? "border-red-500" : ""}
                                    />
                                    <span className="text-sm text-gray-500">
                                        Format: JPEG, PNG, JPG, GIF. Maksimal 2MB. Kosongkan jika tidak ingin mengubah.
                                    </span>
                                    {errors.main_image && (
                                        <span className="text-red-500 text-sm">{errors.main_image}</span>
                                    )}
                                </div>
                            </div>

                            {/* Existing Gallery Section */}
                            {existingGallery.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Galeri Saat Ini</CardTitle>
                                        <CardDescription>
                                            Gambar-gambar yang sudah ada. Klik tanda X untuk menghapus.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {existingGallery.map((gallery) => (
                                                <div key={gallery.id} className="relative group">
                                                    <img
                                                        src={`/storage/${gallery.image_path}`}
                                                        alt="Gallery image"
                                                        className="w-full h-32 object-cover rounded-md border"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => removeExistingGallery(gallery.id)}
                                                        className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Removed Gallery Section (for undo) */}
                            {removedGalleryIds.length > 0 && (
                                <Card className="border-red-200 bg-red-50">
                                    <CardHeader>
                                        <CardTitle className="text-red-700">Gambar yang Akan Dihapus</CardTitle>
                                        <CardDescription className="text-red-600">
                                            Gambar-gambar ini akan dihapus saat formulir disimpan. Klik untuk membatalkan penghapusan.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {removedGalleryIds.map((galleryId) => {
                                                const gallery = product.gallery.find(g => g.id === galleryId);
                                                if (!gallery) return null;

                                                return (
                                                    <div key={gallery.id} className="relative">
                                                        <img
                                                            src={`/storage/${gallery.image_path}`}
                                                            alt="Removed gallery image"
                                                            className="w-full h-32 object-cover rounded-md border opacity-50"
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => restoreExistingGallery(gallery.id)}
                                                            className="absolute inset-0 bg-white/80 hover:bg-white/90"
                                                        >
                                                            Kembalikan
                                                        </Button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* New Gallery Section */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>Tambah Gambar Baru</CardTitle>
                                        <CardDescription>
                                            Tambahkan foto-foto baru untuk galeri produk (Rasio 16:9)
                                        </CardDescription>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={addGalleryItem}
                                        className="flex items-center gap-2"
                                    >
                                        <CirclePlus className="h-4 w-4" />
                                        Tambah Foto
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    {galleryItems.length === 0 ? (
                                        <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                                            <CirclePlus className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                            <p>Belum ada foto baru yang ditambahkan</p>
                                            <p className="text-sm">Klik "Tambah Foto" untuk menambah foto galeri baru</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {galleryItems.map((item, index) => (
                                                <div key={item.id} className="flex items-start gap-4 p-4 border rounded-lg">
                                                    <div className="flex-1">
                                                        <Label htmlFor={`gallery-${item.id}`} className="font-medium">
                                                            Foto Baru {index + 1}
                                                        </Label>
                                                        <Input
                                                            id={`gallery-${item.id}`}
                                                            type="file"
                                                            accept="image/jpeg,image/png,image/jpg,image/gif"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0] || null;
                                                                handleGalleryFileChange(item.id, file);
                                                            }}
                                                            className="mt-2"
                                                        />
                                                        <span className="text-xs text-gray-500 mt-1 block">
                                                            Format: JPEG, PNG, JPG, GIF. Maksimal 2MB
                                                        </span>
                                                    </div>

                                                    {item.preview && (
                                                        <div className="flex-shrink-0">
                                                            <img
                                                                src={item.preview}
                                                                alt={`Preview galeri ${index + 1}`}
                                                                className="h-20 w-20 object-cover rounded-md border"
                                                            />
                                                        </div>
                                                    )}

                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => removeGalleryItem(item.id)}
                                                        className="flex items-center gap-2 flex-shrink-0"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        Hapus
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {errors.gallery && (
                                        <span className="text-red-500 text-sm mt-2 block">{errors.gallery}</span>
                                    )}
                                </CardContent>
                            </Card>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <Button type="button" variant="outline" asChild>
                                    <Link href={produkUnggulan().url}>
                                        Batal
                                    </Link>
                                </Button>
                                <Button type="submit" disabled={processing} className="min-w-[120px] bg-blue-500 text-white hover:bg-blue-600">
                                    {processing ? (
                                        <div className="flex items-center gap-2">
                                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                            Memperbarui...
                                        </div>
                                    ) : (
                                        'Perbarui Produk'
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
