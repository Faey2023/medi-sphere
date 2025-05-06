'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/login', label: 'Login' },
  // { href: "/login", label: "login" },
  { href: '/profile', label: 'Profile' },
  { href: '/register', label: 'Register' },
];

const DashNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="mb-6 flex justify-between gap-6 rounded-lg bg-white p-4 shadow-md">
      {navLinks.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={
            pathname === href
              ? 'font-bold text-cyan-600'
              : 'text-gray-800 hover:text-cyan-500'
          }
        >
          {label}
        </Link>
      ))}
      <div>
        <button
          onClick={() => signOut()}
          className="rounded bg-red-600 px-5 py-2 text-center text-white"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default DashNavbar;
