'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import logo from '@/assets/medi-logo.png';
import { MenuIcon, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import SearchBar from '../Search/SearchBar';

const MobileNav = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const totalQuantity = cart.length;

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setMenuOpen(false);
    }
  };

  return (
    <div className="fixed top-0 right-0 left-0 z-50 bg-white lg:hidden">
      <div className="flex items-center justify-between border border-[#ddd] bg-white px-5 py-4">
        <div className="flex items-center">
          <Link href="/">
            <Image
              className="h-auto w-40"
              height={300}
              width={300}
              src={logo}
              alt="Logo"
            />
          </Link>
        </div>

        <div className="flex gap-3">
          <button className="block text-xl lg:hidden" onClick={toggleMenu}>
            <MenuIcon />
          </button>
          <div className="h-6 w-px self-center bg-gray-400" />
          <Link href="/cart">
            <div className="relative items-center gap-3">
              <ShoppingBag />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                  {totalQuantity}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
      {/* links */}
      <div
        className={`bg-opacity-50 fixed inset-0 z-50 transition-transform lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={closeMenu}
      >
        <div
          className={`absolute right-0 h-full w-64 transform bg-white p-5 text-cyan-900 transition-transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-3/4'
          }`}
        >
          <button onClick={toggleMenu} className="mb-5 text-xl">
            <X />
          </button>

          {/* mbl search */}
          <div className="mb-4">
            <SearchBar />
          </div>

          <ul className="space-y-3">
            <li>
              <Link href="/shop">Shop</Link>
            </li>
            <li>
              <Link href="/">Deals</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>{' '}
            <li>
              {session?.user?.role === 'admin' && (
                <Link href="/admin">Admin Dashboard</Link>
              )}
            </li>
            <li>
              <Link href="/cart">Cart ({totalQuantity})</Link>
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

export default MobileNav;
