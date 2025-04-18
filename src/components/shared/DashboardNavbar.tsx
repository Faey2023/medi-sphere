"use client"
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/login", label: "Login" },
  // { href: "/login", label: "login" },
  { href: "/profile", label: "Profile" },
  { href: "/register", label: "Register" },
];

const DashNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="mb-6 flex gap-6 bg-white shadow-md p-4 rounded-lg justify-between">
      {navLinks.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={
            pathname === href
              ? "text-blue-600 font-bold"
              : "text-gray-800 hover:text-blue-500"
          }
        >
          {label}
        </Link>
      ))}
      <div>
          <button onClick={()=>signOut()} className="bg-red-600 text-white rounded text-center px-5 py-2">Logout</button>
      </div>
    </nav>
  );
};

export default DashNavbar;
