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

import {
  BriefcaseMedical,
  Home,
  LayoutDashboard,
  Pill,
  Stethoscope,
} from 'lucide-react';

const items = [
  {
    title: 'Dashboard',
    url: '/admin/',
    icon: LayoutDashboard,
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

export function AppSidebar() {
  return (
    <Sidebar className="h-screen">
      <SidebarHeader>
        <div className="p-4 text-lg font-bold">Admin Panel</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
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
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 text-sm">© Habibur Rahman</div>
      </SidebarFooter>
    </Sidebar>
  );
}
