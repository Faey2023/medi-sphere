import AllMedicinesForHome from '@/components/Medicine/AllMedicinesForHome';

// import DummyNavbar from '@/components/shared/DummyNavbar';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import { toast } from 'react-toastify';

const Home = () => {
  // const toastA = () => {
  //   toast('toastify added');
  // };
  return (
    <div className="flex flex-col gap-5 bg-[#f2f3f5]">
      {/* dummy component */}
      <AllMedicinesForHome />
    </div>
  );
};

export default Home;
