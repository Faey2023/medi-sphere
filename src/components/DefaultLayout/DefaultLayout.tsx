import Navbar from '@/components/shared/Navbar';
import Footer from '../shared/Footer';
const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default DefaultLayout;
