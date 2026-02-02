// Frontend - React Component (AboutUsCreate.tsx)
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

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: "About Us",
		href: "/admin/aboutus",
	},
	{
		title: "Tambah About Us",
		href: "#",
	},
];

interface TeamMember {
	id: number;
	name: string;
	position: string;
	photo: File | null;
	preview: string | null;
}

interface User {
	role: {
		id: number;
	};
}

export interface PageProps {
	user: User;
}

export default function AboutUsCreate() {
	const { props } = usePage<PageProps>();
	const { user } = props;

	const { data, setData, processing, clearErrors } = useForm({
		section_title: "",
		section_description: "",
	});

	const [team, setTeam] = useState<TeamMember[]>([]);
	const [nextId, setNextId] = useState(1);

	const addMember = () => {
		setTeam(prev => [
			...prev,
			{ id: nextId, name: "", position: "", photo: null, preview: null },
		]);
		setNextId(id => id + 1);
	};

	const removeMember = (id: number) => {
		setTeam(prev => {
			const toRemove = prev.find(p => p.id === id);
			if (toRemove?.preview) URL.revokeObjectURL(toRemove.preview);
			return prev.filter(p => p.id !== id);
		});
	};

	const handleMemberChange = (id: number, field: keyof TeamMember, value: any) => {
		setTeam(prev => prev.map(m => (m.id === id ? { ...m, [field]: value } : m)));
	};

	const handlePhotoChange = (id: number, file: File | null) => {
		setTeam(prev =>
			prev.map(member => {
				if (member.id !== id) return member;
				if (member.preview) URL.revokeObjectURL(member.preview);
				const preview = file ? URL.createObjectURL(file) : null;
				return { ...member, photo: file, preview };
			})
		);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		clearErrors();

		// Validate file sizes (max 4MB)
		for (const m of team) {
			if (m.photo && m.photo.size > 4 * 1024 * 1024) {
				alert(`Foto ${m.name || "(tanpa nama)"} melebihi 4MB`);
				return;
			}
		}

		const formData = new FormData();
		formData.append("section_title", data.section_title);
		formData.append("section_description", data.section_description);

		const validMembers = team.filter(t => t.name.trim() !== "" || t.position.trim() !== "" || t.photo);
		validMembers.forEach((member, index) => {
			formData.append(`hr_teams[${index}][name]`, member.name);
			formData.append(`hr_teams[${index}][position]`, member.position);
			if (member.photo) formData.append(`hr_photos[${index}]`, member.photo);
		});

		formData.append("hr_count", String(validMembers.length));

		const url = user?.role?.id === 1 ? "/admin/aboutus/store" : "/dosen/aboutus/store";

		router.post(url, formData, {
			onSuccess: () => {
				// cleanup previews
				team.forEach(t => {
					if (t.preview) URL.revokeObjectURL(t.preview);
				});
			},
			onError: (err) => console.error(err),
			forceFormData: true,
			preserveScroll: true,
		});
	};

	React.useEffect(() => {
		return () => {
			team.forEach(t => {
				if (t.preview) URL.revokeObjectURL(t.preview);
			});
		};
	}, [team]);

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<div className="flex h-fill flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
				<Card>
					<CardHeader>
						<CardTitle>Tambah About Us - HR Team</CardTitle>
						<CardDescription>Tambah anggota HR dan foto mereka di sini</CardDescription>
					</CardHeader>

					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="flex flex-col gap-2 md:col-span-2">
									<Label htmlFor="section_title">Judul Bagian</Label>
									<Input id="section_title" value={data.section_title} onChange={e => setData('section_title', e.target.value)} />
								</div>

								<div className="flex flex-col gap-2 md:col-span-2">
									<Label htmlFor="section_description">Deskripsi (opsional)</Label>
									<Textarea id="section_description" rows={3} value={data.section_description} onChange={e => setData('section_description', e.target.value)} />
								</div>
							</div>

							{/* HR Team dynamic list */}
							<Card>
								<CardHeader className="flex items-center justify-between">
									<div>
										<CardTitle>HR Team</CardTitle>
										<CardDescription>Tambahkan anggota HR dan foto profil mereka</CardDescription>
									</div>
									<Button type="button" variant="outline" size="sm" onClick={addMember} className="flex items-center gap-2">
										<CirclePlus className="h-4 w-4" />
										Tambah Anggota
									</Button>
								</CardHeader>
								<CardContent>
									{team.length === 0 ? (
										<div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
											<CirclePlus className="h-12 w-12 mx-auto mb-2 opacity-50" />
											<p>Belum ada anggota HR yang ditambahkan</p>
											<p className="text-sm">Klik "Tambah Anggota" untuk menambah</p>
										</div>
									) : (
										<div className="space-y-4">
											{team.map((member, idx) => (
												<div key={member.id} className="flex items-start gap-4 p-4 border rounded-lg">
													<div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
														<div className="flex flex-col gap-2">
															<Label htmlFor={`name-${member.id}`}>Nama</Label>
															<Input id={`name-${member.id}`} value={member.name} onChange={e => handleMemberChange(member.id, 'name', e.target.value)} />
														</div>
														<div className="flex flex-col gap-2">
															<Label htmlFor={`position-${member.id}`}>Jabatan</Label>
															<Input id={`position-${member.id}`} value={member.position} onChange={e => handleMemberChange(member.id, 'position', e.target.value)} />
														</div>
														<div className="flex flex-col gap-2 md:col-span-2">
															<Label htmlFor={`photo-${member.id}`}>Foto Profil</Label>
															<Input id={`photo-${member.id}`} type="file" accept="image/*" onChange={e => {
																const file = e.target.files?.[0] || null;
																if (file && file.size > 4 * 1024 * 1024) {
																	alert('Ukuran foto maksimal 4MB');
																	e.currentTarget.value = '';
																	return;
																}
																handlePhotoChange(member.id, file);
															}} />
															<span className="text-xs text-gray-500">Maks 4MB, format gambar</span>
														</div>
													</div>

													{member.preview && (
														<div className="flex-shrink-0">
															<img src={member.preview} alt={`Preview ${member.name || idx + 1}`} className="h-20 w-20 object-cover rounded-md border" />
														</div>
													)}

													<div className="flex flex-col gap-2">
														<Button type="button" variant="destructive" size="sm" onClick={() => removeMember(member.id)} className="flex items-center gap-2 flex-shrink-0">
															<Trash2 className="h-4 w-4" />
															Hapus
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
									{processing ? 'Menyimpan...' : 'Simpan About Us'}
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</AppLayout>
	);
}

