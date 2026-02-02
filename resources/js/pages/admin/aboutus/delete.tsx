import React from "react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, router, usePage } from "@inertiajs/react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const breadcrumbs: BreadcrumbItem[] = [
	{ title: "About Us", href: "/admin/aboutus" },
	{ title: "Hapus About Us", href: "#" },
];

interface Props {
	about?: { id: number; section_title?: string } | null;
	user?: { id?: number; role?: { id: number } };
}

export default function AboutUsDelete({ about, user }: Props) {
	const item = about ?? null;

	const handleConfirm = () => {
		if (!item) return;
		const url = user?.role?.id === 1 ? `/admin/aboutus/${item.id}` : `/dosen/aboutus/${item.id}`;
		router.delete(url);
	};

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<div className="flex h-fill flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
				<Card>
					<CardHeader>
						<CardTitle>Hapus About Us</CardTitle>
						<CardDescription>Konfirmasi penghapusan data About Us</CardDescription>
					</CardHeader>

					<CardContent>
						<div className="space-y-4">
							<p>
								Anda akan menghapus data About Us{item?.section_title ? `: "${item.section_title}"` : ""}.
								Tindakan ini tidak dapat dibatalkan.
							</p>

							<div className="flex gap-3 justify-end">
								<Button variant="outline" asChild>
									<Link href="/admin/aboutus">Batal</Link>
								</Button>

								<AlertDialog>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
											<AlertDialogDescription>
												Apakah Anda yakin ingin menghapus item ini? Semua data terkait (termasuk foto HR) akan dihapus.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel>Batalkan</AlertDialogCancel>
											<AlertDialogAction onClick={handleConfirm} className="bg-red-600 text-white">
												Hapus
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</AppLayout>
	);
}

