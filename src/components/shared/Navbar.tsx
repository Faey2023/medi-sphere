'use client';

import { useSession } from 'next-auth/react';
import logo from '@/assets/medi-logo.png';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import SearchBar from '../Search/SearchBar';
import { useState, useEffect } from 'react';
import UserDropdown from './UserDropdown';

const Navbar = () => {
  const { data: session } = useSession();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const totalQuantity = cart.length;

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="hidden md:block">
      {/* top bar */}
      <div className="flex justify-between bg-cyan-900 px-5 py-2.5 text-sm text-white">
        <p className="inline-flex items-center text-xl uppercase">
          Free Shipping on Orders Over $50!
        </p>
        <div className="bg-opacity-20 flex items-center bg-[#47CFFF33] px-4 py-2 font-semibold text-white uppercase">
          get upto
          <span className="mx-1 text-cyan-300">20%</span>
          discount
        </div>

        <div></div>
        <Link href="/shop">
          <button className="flex cursor-pointer items-center gap-2 border border-white p-3 font-semibold uppercase transition-all duration-300 hover:bg-white hover:text-cyan-900">
            shop now <ArrowRight />
          </button>
        </Link>
      </div>

      {/* main navbar */}
      <div className="flex items-center justify-between border border-[#ddd] bg-white px-5 py-4">
        <div className="flex items-center">
          <Link href="/">
            <Image height={300} width={300} src={logo} alt="Logo" />
          </Link>
        </div>

        {/* searchBar */}
        <div className="block w-[40%]">
          <SearchBar />
        </div>

        <div className="flex items-center gap-5">
          <UserDropdown />

          <div className="h-10 w-px self-center bg-gray-400" />

          <Link href="/cart">
            <div className="relative flex items-center gap-3">
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

      {/* nav Links */}
      <nav
        className={`w-full bg-cyan-900 text-white transition-all duration-300 ease-in-out ${isSticky ? 'fixed top-0 left-0 z-50 shadow-md' : ''}`}
      >
        <ul className="flex justify-center gap-5 py-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/shop">Shop</Link>
          </li>
          <li>
            <Link href="/deals">Deals</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          {session?.user?.role === 'user' && (
            <>
              <li>
                <Link href="/userDashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/userDashboard/orders">Orders</Link>
              </li>
            </>
          )}
          {session?.user?.role === 'admin' && (
            <li>
              <Link href="/admin">Dashboard</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
