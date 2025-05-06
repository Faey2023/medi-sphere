'use client';

import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import logo from '@/assets/medi-logo.png';
import {
  BriefcaseMedical,
  Heart,
  Home,
  LayoutDashboard,
  Pill,
  Stethoscope,
  UserRoundPen,
} from 'lucide-react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const adminItems = [
  {
    title: 'Overview',
    url: '/admin/',
    icon: LayoutDashboard,
  },
  {
    title: 'Profile',
    url: '/admin/profile',
    icon: UserRoundPen,
  },
  {
    title: 'Manage Medicines',
    url: '/admin/medicines',
    icon: Pill,
  },
  {
    title: 'Manage Orders',
    url: '/admin/orders',
    icon: Stethoscope,
  },
  {
    title: 'Manage Users',
    url: '/admin/users',
    icon: BriefcaseMedical,
  },
  {
    title: 'Goto Home',
    url: '/',
    icon: Home,
  },
];

const userItems = [
  {
    title: 'Overview',
    url: '/userDashboard/',
    icon: LayoutDashboard,
  },
  {
    title: 'Profile',
    url: '/userDashboard/profile',
    icon: UserRoundPen,
  },
  {
    title: 'Wishlist',
    url: '/userDashboard/wishlist',
    icon: Heart,
  },
  {
    title: 'Orders',
    url: '/userDashboard/orders',
    icon: Stethoscope,
  },

  {
    title: 'Goto Home',
    url: '/',
    icon: Home,
  },
];

export function AppSidebar() {
  const { data: session } = useSession();
  return (
    <Sidebar className="h-screen">
      <SidebarHeader>
        <div className="p-4 text-lg font-bold">Admin Panel</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            {session?.user?.role === 'admin' && (
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Link href={item.url} passHref>
                      <SidebarMenuButton asChild>
                        <div className="flex items-center gap-2">
                          <item.icon size={18} />
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
          <SidebarGroupContent>
            {session?.user?.role === 'user' && (
              <SidebarMenu>
                {userItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Link href={item.url} passHref>
                      <SidebarMenuButton asChild>
                        <div className="flex items-center gap-2">
                          <item.icon size={18} />
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Link href="/">
          <Image height={300} width={300} src={logo} alt="Logo" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
