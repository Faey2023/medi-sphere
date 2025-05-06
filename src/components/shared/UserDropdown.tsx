'use client';

import { useSession, signOut } from 'next-auth/react';
import { User } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const UserDropdown = () => {
  const { data: session } = useSession();

  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  return (
    <>
      {session ? (
        <button
          onClick={() => setUserMenuOpen(!isUserMenuOpen)}
          className="relative flex cursor-pointer items-center gap-2 rounded-full border-2 border-black p-1 lg:p-2 hover:border-cyan-800 hover:text-cyan-800"
        >
          <User />

          {isUserMenuOpen && (
            <div className="absolute top-full right-0 z-50 mt-2 w-48 rounded-md border bg-white p-4 text-sm shadow-lg">
              <p className="mb-1 font-semibold">{session?.user?.name}</p>
              {session?.user?.role === 'admin' && (
                <>
                <Link href="/admin/profile">Profile</Link></>
              )}
              {session?.user?.role === 'user' && (
                <Link href="/user/profile">Profile</Link>
              )}
              <p className="mb-3 text-gray-500">{session?.user?.email}</p>
              <button
                onClick={() => signOut()}
                className="w-full rounded bg-red-600 px-3 py-1.5 text-white hover:bg-red-700"
              >
                Log Out
              </button>
            </div>
          )}
        </button>
      ) : (
        <Link href="/login">
          <button className="flex cursor-pointer items-center gap-2 hover:text-cyan-800">
            <User />
            LogIn
          </button>
        </Link>
      )}
    </>
  );
};

export default UserDropdown;
