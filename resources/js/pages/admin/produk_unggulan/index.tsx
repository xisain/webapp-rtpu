import App from "@/actions/App";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { produkUnggulan } from "@/routes/admin";




export default function produkUnggulans(){
    const { props } = usePage<{ produk_unggulan: any[] }>();
    const produk_unggulan = props.produk_unggulan;
    const dummyData = [
    {
        id: 1,
        name: "Smart Cat House",
        uploader: "John Doe",
        uploadDate: "2025-09-14",
    },
    {
        id: 2,
        name: "AI Learning Platform",
        uploader: "Jane Smith",
        uploadDate: "2025-09-10",
    },
    {
        id: 3,
        name: "IoT Greenhouse Monitor",
        uploader: "Michael Chen",
        uploadDate: "2025-09-01",
    },
];
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Produk Unggulan',
            href: produkUnggulan().url
        },
    ];
    return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Manage Produk Unggulan"/>
        <div className="p-4">
            <h1 className="text 2xl font-bold mb-4"> Manage Produk Unggulan</h1>
            <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2"> Uploader</th>
                            <th className="border border-gray-300 px-4 py-2"> Upload Date</th>
                            <th className="border border-gray-300 px-4 py-2"> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dummyData.map((produk) => (
                            <tr key={produk.id}>
            <td className="border border-gray-300 px-4 py-2">{produk.id}</td>
            <td className="border border-gray-300 px-4 py-2">{produk.name}</td>
            <td className="border border-gray-300 px-4 py-2">{produk.uploader}</td>
            <td className="border border-gray-300 px-4 py-2">{produk.uploadDate}</td>
            <td className="border border-gray-300 px-4 py-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded">
                    Edit
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                    Delete
                </button>
            </td>
        </tr>
    ))}
</tbody>
                </table>
        </div>
    </AppLayout>
    );
}
