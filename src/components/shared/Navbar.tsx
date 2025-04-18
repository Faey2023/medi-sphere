'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import logo from '@/assets/logo.png';
import { MenuIcon, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setMenuOpen(false);
    }
  };

  return (
    <div>
      {/* Topbar */}
      <div className="flex justify-between bg-blue-900 px-5 py-2.5 text-sm text-white">
        <div>Free Shipping on Orders Over $50!</div>
        <div className="hidden gap-3 lg:flex">
          <Link href="/profile">Profile</Link>
          <Link href="/orders">Track Order</Link>
          {session ? (
            <button
              onClick={() => signOut()}
              className="rounded bg-red-600 px-5 text-white"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex items-center justify-between border border-[#ddd] bg-white px-5 py-4">
        <div className="flex items-center">
          <Link href="/">
            <Image height={300} width={300} src={logo} alt="Logo" />
          </Link>
        </div>

        <button className="block text-xl lg:hidden" onClick={toggleMenu}>
          <MenuIcon />
        </button>

        <div className="hidden w-[40%] overflow-hidden rounded-3xl border border-[#ddd] lg:flex">
          <input
            className="w-full border-none p-2.5 pl-4 outline-0"
            type="text"
            placeholder="Search for products..."
          />
          <button className="cursor-pointer border-none bg-blue-900 px-5 py-2.5 text-white">
            Search
          </button>
        </div>

        <Link href="/cart">
          <div className="hidden justify-center gap-3 lg:flex">
            <ShoppingBag /> Cart (0)
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="hidden justify-center bg-blue-900 text-white lg:flex">
        <ul className="flex justify-center gap-5 py-4">
          <li>
            <Link href="/shop">Shop</Link>
          </li>
          <li>
            <Link href="/">Deals</Link>
          </li>
          <li>
            <Link href="/">Contact</Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`bg-opacity-50 fixed inset-0 z-50 transition-transform lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={closeMenu}
      >
        <div
          className={`absolute right-0 h-full w-64 transform bg-blue-900 p-5 text-white transition-transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-3/4'
          }`}
        >
          <button onClick={toggleMenu} className="mb-5 text-xl">
            <X />
          </button>
          <ul className="space-y-3">
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            <li>
              <Link href="/">Deals</Link>
            </li>
            <li>
              <Link href="/">Contact</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <Link href="/cart">Cart (0)</Link>
            </li>
            <li>
              <Link href="/orders">Track Order</Link>
            </li>
            <li>
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="rounded bg-red-600 px-5 text-white"
                >
                  Logout
                </button>
              ) : (
                <Link href="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
