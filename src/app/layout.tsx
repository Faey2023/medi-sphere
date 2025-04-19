import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/ToastProvider';
import DummyNavbar from '@/components/shared/DummyNavbar';
import Providers from '@/lib/Providers';

export const metadata: Metadata = {
  title: 'MediSphere',
  description: 'Your trusted online medicine shop',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <DummyNavbar></DummyNavbar>
        <Providers>{children}</Providers>
        <ToastProvider />
      </body>
    </html>
  );
}
