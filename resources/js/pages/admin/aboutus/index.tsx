import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Link, router } from '@inertiajs/react';
import { Edit2, Plus, Trash2, CheckCircle, XCircle } from 'lucide-react';

interface HRTeam {
	id: number;
	name: string;
	position: string;
	photo_path?: string;
}

interface AboutUsItem {
	id: number;
	section_title: string;
	section_description?: string;
	hr_teams?: HRTeam[];
	created_at?: string;
}

interface PageProps {
	aboutUsItems: AboutUsItem[];
	flash?: {
		success?: string;
		error?: string;
	};
}

const breadcrumbs: BreadcrumbItem[] = [
	{ title: 'About Us', href: '/admin/aboutus' },
];

export default function AboutUsIndex({ aboutUsItems, flash }: PageProps) {
	const [flashMessages, setFlashMessages] = useState<Array<{ type: string; message: string }>>([]);
	const [deleteId, setDeleteId] = useState<number | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);

	React.useEffect(() => {
		const messages = [];
		if (flash?.success) {
			messages.push({ type: 'success', message: flash.success });
		}
		if (flash?.error) {
			messages.push({ type: 'error', message: flash.error });
		}
		if (messages.length > 0) {
			setFlashMessages(messages);
			const timer = setTimeout(() => setFlashMessages([]), 5000);
			return () => clearTimeout(timer);
		}
	}, [flash]);

	const handleDelete = (id: number) => {
		setIsDeleting(true);
		router.delete(`/admin/aboutus/${id}`, {
			onFinish: () => setIsDeleting(false),
		});
	};

	const dismissFlashMessage = (index: number) => {
		setFlashMessages(prev => prev.filter((_, i) => i !== index));
	};

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<div className="flex h-fill flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
				{/* Flash Messages */}
				{flashMessages.map((msg, index) => (
					<div
						key={index}
						className={`flex items-center gap-3 rounded-lg px-4 py-3 border ${
							msg.type === 'success'
								? 'bg-green-50 border-green-300 text-green-800 dark:bg-green-900 dark:border-green-700'
								: 'bg-red-50 border-red-300 text-red-800 dark:bg-red-900 dark:border-red-700'
						}`}
					>
						{msg.type === 'success' ? (
							<CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
						) : (
							<XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
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
								<CardTitle className="text-2xl font-bold">About Us</CardTitle>
								<CardDescription>Kelola data About Us </CardDescription>
							</div>
							<Link href="/admin/aboutus/create">
								<Button className="flex items-center gap-2">
									<Plus className="h-4 w-4" />
									Tambah About Us
								</Button>
							</Link>
						</div>
					</CardHeader>
				</Card>

				{/* Content */}
				<Card>
					<CardContent className="pt-6">
						{aboutUsItems.length === 0 ? (
							<div className="flex flex-col items-center justify-center py-12">
								<div className="text-center">
									<p className="text-gray-500 mb-4">Belum ada data About Us yang ditambahkan</p>
									<Link href="/admin/aboutus/create">
										<Button variant="outline">
											<Plus className="h-4 w-4 mr-2" />
											Tambah About Us Pertama
										</Button>
									</Link>
								</div>
							</div>
						) : (
							<div className="space-y-4">
								{aboutUsItems.map(item => (
									<Card key={item.id} className="border">
										<CardHeader>
											<div className="flex items-start justify-between">
												<div className="flex-1">
													<CardTitle>{item.section_title}</CardTitle>
													{item.section_description && (
														<CardDescription className="mt-2">
															{item.section_description}
														</CardDescription>
													)}
												</div>
												<div className="flex items-center gap-2 ml-4">
													<Link href={`/admin/aboutus/${item.id}/edit`}>
														<Button
															variant="outline"
															size="sm"
															className="flex items-center gap-2"
														>
															<Edit2 className="h-4 w-4" />
															Edit
														</Button>
													</Link>
													<AlertDialog>
														<Button
															variant="destructive"
															size="sm"
															onClick={() => setDeleteId(item.id)}
															className="flex items-center gap-2"
														>
															<Trash2 className="h-4 w-4" />
															Hapus
														</Button>
														{deleteId === item.id && (
															<AlertDialogContent>
																<AlertDialogHeader>
																	<AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
																	<AlertDialogDescription>
																		Apakah Anda yakin ingin menghapus About Us dengan judul "<strong>{item.section_title}</strong>"? Tindakan ini tidak dapat dibatalkan.
																	</AlertDialogDescription>
																</AlertDialogHeader>
																<AlertDialogFooter>
																	<AlertDialogCancel onClick={() => setDeleteId(null)}>
																		Batalkan
																	</AlertDialogCancel>
																	<AlertDialogAction
																		onClick={() => handleDelete(item.id)}
																		disabled={isDeleting}
																		className="bg-red-600 hover:bg-red-700"
																	>
																		{isDeleting ? 'Menghapus...' : 'Hapus'}
																	</AlertDialogAction>
																</AlertDialogFooter>
															</AlertDialogContent>
														)}
													</AlertDialog>
												</div>
											</div>
										</CardHeader>
										{item.hr_teams && item.hr_teams.length > 0 && (
											<CardContent>
												<div className="space-y-3">
													<h4 className="font-semibold text-sm">HR Team ({item.hr_teams.length})</h4>
													<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
														{item.hr_teams.map(member => (
															<div
																key={member.id}
																className="flex items-center gap-3 p-3 border rounded-lg"
															>
																<Avatar className="h-10 w-10">
																	{member.photo_path && (
																		<AvatarImage
																			src={`/storage/${member.photo_path}`}
																			alt={member.name}
																		/>
																	)}
																	<AvatarFallback>
																		{member.name
																			.split(' ')
																			.slice(0, 2)
																			.map(n => n[0])
																			.join('')
																			.toUpperCase()}
																	</AvatarFallback>
																</Avatar>
																<div className="flex-1 min-w-0">
																	<p className="font-medium text-sm truncate">
																		{member.name}
																	</p>
																	<p className="text-xs text-gray-500 truncate">
																		{member.position}
																	</p>
																</div>
															</div>
														))}
													</div>
												</div>
											</CardContent>
										)}
									</Card>
								))}
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</AppLayout>
	);
}
