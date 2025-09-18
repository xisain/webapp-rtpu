import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { index,roles,users,produkUnggulan, produkInovasi } from '@/routes/admin/';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, User, Briefcase } from 'lucide-react';
import AppLogo from './app-logo';
import { usePage } from '@inertiajs/react'


const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: index(),
        icon: LayoutGrid,
    },
    {
        title: 'Pengguna',
        href: users(),
        icon: User,
    },
    {
        title: 'Role',
        href: roles(),
        icon: Briefcase,
    },
    {
        title: 'Produk Unggulan',
        href: produkUnggulan(),
        icon: LayoutGrid,
    },
    {
        title: 'Produk Inovasi',
        href: produkInovasi(),
        icon: LayoutGrid,
    },

];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { props } = usePage<any>();
    const userRole = props?.auth?.user?.role; // Pastikan struktur sesuai props user

    // Menu default hanya Dashboard
    const limitedNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
    ];

    // Tentukan menu berdasarkan role
    const navItems = userRole === 'admin' ? mainNavItems : limitedNavItems;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
