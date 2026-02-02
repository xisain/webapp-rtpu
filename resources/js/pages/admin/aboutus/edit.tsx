// Frontend - React Component (AboutUsEdit.tsx)
import AppLayout from "@/layouts/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type BreadcrumbItem } from "@/types";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import React, { FormEvent, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CirclePlus, Trash2 } from "lucide-react";

interface ExistingMember {
	id: number;
	name: string;
	position: string;
	photo_path?: string | null;
	new_photo?: File | null;
	new_preview?: string | null;
}

interface NewMember {
	id: number;
	name: string;
	position: string;
	photo: File | null;
	preview: string | null;
}

interface About {
	id: number;
	section_title?: string;
	section_description?: string;
	hr_teams?: Array<{ id: number; name: string; position: string; photo_path?: string | null }>;
}

interface User { role: { id: number } }

export interface PageProps { user: User; about: About }

export default function AboutUsEdit() {
	const { props } = usePage<PageProps>();
	const { user, about } = props;

	const breadcrumbs: BreadcrumbItem[] = [
		{ title: 'About Us', href: '/admin/aboutus' },
		{ title: `Edit: ${about?.section_title ?? ''}`, href: '#' },
	];

	const { data, setData, processing, clearErrors } = useForm({
		section_title: about?.section_title ?? '',
		section_description: about?.section_description ?? '',
	});

	const [existingMembers, setExistingMembers] = useState<ExistingMember[]>(
		(about?.hr_teams ?? []).map(m => ({ id: m.id, name: m.name, position: m.position, photo_path: m.photo_path ?? null }))
	);
	const [removedMemberIds, setRemovedMemberIds] = useState<number[]>([]);

	const [newMembers, setNewMembers] = useState<NewMember[]>([]);
	const [nextId, setNextId] = useState(1);

	const addNewMember = () => {
		setNewMembers(prev => [...prev, { id: nextId, name: '', position: '', photo: null, preview: null }]);
		setNextId(id => id + 1);
	};

	const removeNewMember = (id: number) => {
		const item = newMembers.find(n => n.id === id);
		if (item?.preview) URL.revokeObjectURL(item.preview);
		setNewMembers(prev => prev.filter(n => n.id !== id));
	};

	const handleNewMemberFile = (id: number, file: File | null) => {
		setNewMembers(prev => prev.map(n => {
			if (n.id !== id) return n;
			if (n.preview) URL.revokeObjectURL(n.preview);
			return { ...n, photo: file, preview: file ? URL.createObjectURL(file) : null };
		}));
	};

	const removeExistingMember = (id: number) => {
		setRemovedMemberIds(prev => [...prev, id]);
		setExistingMembers(prev => prev.filter(m => m.id !== id));
	};

	const restoreExistingMember = (m: ExistingMember) => {
		setExistingMembers(prev => [...prev, m]);
		setRemovedMemberIds(prev => prev.filter(id => id !== m.id));
	};

	const handleExistingChange = (id: number, field: keyof ExistingMember, value: any) => {
		setExistingMembers(prev => prev.map(m => m.id === id ? { ...m, [field]: value } as ExistingMember : m));
	};

	const handleExistingFile = (id: number, file: File | null) => {
		setExistingMembers(prev => prev.map(m => {
			if (m.id !== id) return m;
			if (m.new_preview) URL.revokeObjectURL(m.new_preview);
			return { ...m, new_photo: file, new_preview: file ? URL.createObjectURL(file) : null };
		}));
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		clearErrors();

		// validate sizes
		for (const nm of newMembers) {
			if (nm.photo && nm.photo.size > 4 * 1024 * 1024) { alert('Salah satu foto baru melebihi 4MB'); return; }
		}
		for (const em of existingMembers) {
			if (em.new_photo && em.new_photo.size > 4 * 1024 * 1024) { alert('Salah satu foto pengganti melebihi 4MB'); return; }
		}

		const formData = new FormData();
		formData.append('_method', 'PUT');
		formData.append('section_title', data.section_title);
		formData.append('section_description', data.section_description);

		// removed existing members
		removedMemberIds.forEach((id, idx) => formData.append(`removed_members[${idx}]`, String(id)));

		// updated existing members (fields + optional new photo)
		existingMembers.forEach((m, idx) => {
			formData.append(`existing_members[${idx}][id]`, String(m.id));
			formData.append(`existing_members[${idx}][name]`, m.name);
			formData.append(`existing_members[${idx}][position]`, m.position);
			if (m.new_photo) formData.append(`existing_photos[${idx}]`, m.new_photo);
		});

		// new members
		newMembers.forEach((n, idx) => {
			formData.append(`new_members[${idx}][name]`, n.name);
			formData.append(`new_members[${idx}][position]`, n.position);
			if (n.photo) formData.append(`new_photos[${idx}]`, n.photo);
		});

		formData.append('existing_count', String(existingMembers.length));
		formData.append('new_count', String(newMembers.length));

		const url = user?.role?.id === 1 ? `/admin/aboutus/update/${about.id}` : `/dosen/aboutus/update/${about.id}`;

		router.post(url, formData, {
			onSuccess: () => {
				// cleanup previews
				newMembers.forEach(n => { if (n.preview) URL.revokeObjectURL(n.preview); });
				existingMembers.forEach(e => { if (e.new_preview) URL.revokeObjectURL(e.new_preview); });
			},
			onError: (err) => console.error(err),
			forceFormData: true,
			preserveScroll: true,
		});
	};

	React.useEffect(() => {
		return () => {
			newMembers.forEach(n => { if (n.preview) URL.revokeObjectURL(n.preview); });
			existingMembers.forEach(e => { if (e.new_preview) URL.revokeObjectURL(e.new_preview); });
		};
	}, [newMembers, existingMembers]);

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<div className="flex h-fill flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
				<Card>
					<CardHeader>
						<CardTitle>Edit About Us - HR Team</CardTitle>
						<CardDescription>Perbarui data bagian About Us dan anggota HR</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="flex flex-col gap-2 md:col-span-2">
									<Label htmlFor="section_title">Judul Bagian</Label>
									<Input id="section_title" value={data.section_title} onChange={e => setData('section_title', e.target.value)} />
								</div>
								<div className="flex flex-col gap-2 md:col-span-2">
									<Label htmlFor="section_description">Deskripsi</Label>
									<Textarea id="section_description" rows={3} value={data.section_description} onChange={e => setData('section_description', e.target.value)} />
								</div>
							</div>

							<Card>
								<CardHeader className="flex items-center justify-between">
									<div>
										<CardTitle>HR Team (Existing)</CardTitle>
										<CardDescription>Perbarui atau hapus anggota HR yang sudah ada</CardDescription>
									</div>
								</CardHeader>
								<CardContent>
									{existingMembers.length === 0 ? (
										<div className="text-sm text-gray-500">Tidak ada anggota HR tersimpan.</div>
									) : (
										<div className="space-y-4">
											{existingMembers.map((m) => (
												<div key={m.id} className="flex items-start gap-4 p-4 border rounded-lg">
													<div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
														<div className="flex flex-col gap-2">
															<Label>Nama</Label>
															<Input value={m.name} onChange={e => handleExistingChange(m.id, 'name', e.target.value)} />
														</div>
														<div className="flex flex-col gap-2">
															<Label>Jabatan</Label>
															<Input value={m.position} onChange={e => handleExistingChange(m.id, 'position', e.target.value)} />
														</div>
														<div className="flex flex-col gap-2 md:col-span-2">
															<Label>Ganti Foto (opsional)</Label>
															<Input type="file" accept="image/*" onChange={e => {
																const file = e.target.files?.[0] || null;
																if (file && file.size > 4 * 1024 * 1024) { alert('Ukuran maksimal 4MB'); e.currentTarget.value = ''; return; }
																handleExistingFile(m.id, file);
															}} />
														</div>
													</div>

													<div className="flex flex-col gap-2">
														{(m.new_preview || m.photo_path) && (
															<img src={m.new_preview ?? m.photo_path ?? ''} alt={m.name} className="h-20 w-20 object-cover rounded-md border" />
														)}
														<Button type="button" variant="destructive" size="sm" onClick={() => removeExistingMember(m.id)} className="flex items-center gap-2">
															<Trash2 className="h-4 w-4" /> Hapus
														</Button>
													</div>
												</div>
											))}
										</div>
									)}
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex items-center justify-between">
									<div>
										<CardTitle>HR Team (Baru)</CardTitle>
										<CardDescription>Tambahkan anggota HR baru</CardDescription>
									</div>
									<Button type="button" variant="outline" size="sm" onClick={addNewMember} className="flex items-center gap-2">
										<CirclePlus className="h-4 w-4" /> Tambah Anggota
									</Button>
								</CardHeader>
								<CardContent>
									{newMembers.length === 0 ? (
										<div className="text-sm text-gray-500">Belum ada anggota baru ditambahkan.</div>
									) : (
										<div className="space-y-4">
											{newMembers.map(n => (
												<div key={n.id} className="flex items-start gap-4 p-4 border rounded-lg">
													<div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
														<div className="flex flex-col gap-2">
															<Label>Nama</Label>
															<Input value={n.name} onChange={e => setNewMembers(prev => prev.map(x => x.id === n.id ? { ...x, name: e.target.value } : x))} />
														</div>
														<div className="flex flex-col gap-2">
															<Label>Jabatan</Label>
															<Input value={n.position} onChange={e => setNewMembers(prev => prev.map(x => x.id === n.id ? { ...x, position: e.target.value } : x))} />
														</div>
														<div className="flex flex-col gap-2 md:col-span-2">
															<Label>Foto Profil</Label>
															<Input type="file" accept="image/*" onChange={e => {
																const file = e.target.files?.[0] || null;
																if (file && file.size > 4 * 1024 * 1024) { alert('Ukuran maksimal 4MB'); e.currentTarget.value = ''; return; }
																handleNewMemberFile(n.id, file);
															}} />
														</div>
													</div>

													{n.preview && (
														<div className="flex-shrink-0">
															<img src={n.preview} alt={n.name} className="h-20 w-20 object-cover rounded-md border" />
														</div>
													)}

													<div className="flex flex-col gap-2">
														<Button type="button" variant="destructive" size="sm" onClick={() => removeNewMember(n.id)} className="flex items-center gap-2">
															<Trash2 className="h-4 w-4" /> Hapus
														</Button>
													</div>
												</div>
											))}
										</div>
									)}
								</CardContent>
							</Card>

							<div className="flex justify-end gap-3 pt-4 border-t">
								<Button type="button" variant="outline" asChild>
									<Link href="/admin/aboutus">Batal</Link>
								</Button>
								<Button type="submit" disabled={processing} className="min-w-[120px]">
									{processing ? 'Menyimpan...' : 'Perbarui About Us'}
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</AppLayout>
	);
}
