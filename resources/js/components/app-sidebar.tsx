import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { index, roles, users, produkUnggulan, produkInovasi } from '@/routes/admin/';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, User, Briefcase, Lightbulb , Trophy } from 'lucide-react';
import AppLogo from './app-logo';
import dosen from '@/routes/dosen';
import admin from '@/routes/admin/';

const adminNavItems: NavItem[] = [
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
        title: 'Produk Unggulan',
        href: produkUnggulan(),
        icon: Trophy,
    },
    {
        title: 'Produk Inovasi',
        href: produkInovasi(),
        icon: Lightbulb,
    },
];

const dosenNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Produk Unggulan',
        href: dosen.produkUnggulan(),
        icon: Trophy,
    },
    {
        title: 'Produk Inovasi',
        href: dosen.produkInovasi(),
        icon: Lightbulb,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/xisain/webapp-rtpu',
        icon: Folder,
    },
    {
        title: 'LMS',
        href: 'https://rtpu.vercel.app',
        icon: BookOpen,
    },
];

function getNavItemsForRole(role: string): NavItem[] {
    switch (role.toLowerCase()) {
        case 'admin':
            return adminNavItems;
        case 'dosen':
            return dosenNavItems;
        default:
            return [
                {
                    title: 'Dashboard',
                    href: dashboard(),
                    icon: LayoutGrid,
                },
            ];
    }
}

export function AppSidebar() {
    const { auth } = usePage().props as {
        auth: {
            user: {
                id: number;
                name: string;
                email: string;
                role: string;
            } | null
        }
    };

    // Get navigation items based on user role
    const navItems = auth.user ? getNavItemsForRole(auth.user.role) : [];
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
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
