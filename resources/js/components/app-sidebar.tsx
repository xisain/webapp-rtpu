import { NavFooter } from '@/components/nav-footer';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { index, users, produkUnggulan, produkInovasi } from '@/routes/admin/';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, User, Lightbulb, Trophy } from 'lucide-react';
import AppLogo from './app-logo';
import dosen from '@/routes/dosen';

// =============================
// 🔹 NAVIGATION ITEMS PER ROLE
// =============================
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

// =============================
// 🔹 FUNGSI PEMILIH MENU BERDASARKAN ROLE
// =============================
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

// =============================
// 🔹 NAVIGATION MAIN COMPONENT
// =============================
function NavMain({ items }: { items: NavItem[] }) {
  const { url } = usePage(); // ambil URL aktif saat ini

  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === '/'
            ? url === '/'
            : url.startsWith(item.href);

        return (
          <Link
            key={item.title}
            href={item.href}
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors duration-150 ${
              isActive
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}

// =============================
// 🔹 APP SIDEBAR UTAMA
// =============================
export function AppSidebar() {
  const { auth } = usePage().props as {
    auth: {
      user: {
        id: number;
        name: string;
        email: string;
        role: string;
      } | null;
    };
  };

  const navItems = auth.user ? getNavItemsForRole(auth.user.role) : [];

  return (
    <Sidebar collapsible="icon" variant="inset">
      {/* Header */}
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

      {/* Content */}
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
