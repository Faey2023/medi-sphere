'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'react-toastify';

const Home = () => {
  const toastA = () => {
    toast('toastify added');
  };
  return (
    <div className="flex flex-col gap-5">
      <h1>home</h1>
      <Link href={'/about'}>About</Link>
      <Link href={'/login'}>Login</Link>
      <Link href={'/register'}>Register</Link>
      <Link href={'/admin/users'}>Admin/users</Link>
      <Button onClick={toastA}>shadcn button</Button>
    </div>
  );
};

export default Home;
