import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import UserDropdown from '@/components/shared/UserDropdown';
import { AppSidebar } from '@/components/app-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="relative flex min-h-screen w-full">
        <div className="absolute top-4 right-4 z-50">
          <UserDropdown />
        </div>
        <AppSidebar />
        <main className="w-full p-4">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
