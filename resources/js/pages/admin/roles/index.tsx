import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { roles } from '@/routes/admin/';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

interface Role {
    id: number;
    name: string;
}

export default function Roles() {
    const { props } = usePage<{ roles: Role[] }>();
    const roles = props.roles;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Roles',
            href: dashboard().url
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Role" />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Manage Roles</h1>
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role) => (
                            <tr key={role.id}>
                                <td className="border border-gray-300 px-4 py-2">{role.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{role.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
