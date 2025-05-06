import Navbar from '@/components/shared/Navbar';
import Footer from '../shared/Footer';
import MobileNav from '../shared/MobileNav';
const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <MobileNav />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default DefaultLayout;
