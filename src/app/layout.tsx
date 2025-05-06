// app/layout.tsx
import './globals.css';
import { Montserrat } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import { Providers } from './providers';
import ReduxProvider from '@/redux/ReduxProvider';
import 'react-toastify/dist/ReactToastify.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'Medi Sphere',
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
    <html lang="en" className={montserrat.variable}>
      <body suppressHydrationWarning>
        <ReduxProvider>
          <Providers>{children}</Providers>
          <ToastContainer />
        </ReduxProvider>
      </body>
    </html>
  );
}
