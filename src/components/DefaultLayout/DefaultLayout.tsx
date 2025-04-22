import Navbar from '@/components/shared/Navbar';
import Footer from '../shared/Footer';
const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="mx-auto mt-5 max-w-7xl px-5">{children}</div>
      <Footer />
    </>
  );
};

export default DefaultLayout;
