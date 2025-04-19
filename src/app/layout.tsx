import { ToastContainer } from 'react-toastify';
import './globals.css';
import { Providers } from './providers';
import ReduxProvider from '@/redux/ReduxProvider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MediSphere',
  description: 'Your trusted online medicine shop',
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ReduxProvider>
          <Providers>{children}</Providers>
          <ToastContainer />
        </ReduxProvider>
      </body>
    </html>
  );
}
