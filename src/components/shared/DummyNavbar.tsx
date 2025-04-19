import Link from 'next/link';
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Heart, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import logo from '../../../public/assets/images/logo/logo.png';
import SearchBar from '../Search/SearchBar';

export default function DummyNavbar() {
  return (
    <header className="w-full">
      {/* Top announcement bar */}
      <div className="w-full bg-teal-500 px-4 py-2 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-sm font-medium">
            Free Shipping for all Order of $99
          </p>
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-white hover:text-teal-100">
              <Facebook size={16} />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-white hover:text-teal-100">
              <Twitter size={16} />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-white hover:text-teal-100">
              <Instagram size={16} />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-white hover:text-teal-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8" />
                <path d="M12 8v8" />
              </svg>
              <span className="sr-only">Google Plus</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative mr-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-500">
                <Image src={logo} alt="medi-sphere" />
                {/* <span className="text-white text-xl font-bold">+</span> */}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-800">
                mediSphere
              </span>
              <span className="text-sm text-gray-500">Online Pharmacy</span>
            </div>
          </Link>

          {/* Search bar */}
          <SearchBar />

          {/* User actions */}
          <div className="flex items-center space-x-6">
            <Link
              href="/auth"
              className="text-sm font-medium hover:text-teal-500"
            >
              SIGN IN / SIGN UP
            </Link>
            <Link href="/wishlist" className="relative">
              <Heart className="h-6 w-6 text-gray-700" />
              <span className="sr-only">Wishlist</span>
            </Link>
            <div className="flex items-center">
              <Link href="/cart" className="relative mr-2">
                <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-xs font-bold text-white">
                  4
                </div>
                <ShoppingBag className="h-6 w-6 text-gray-700" />
                <span className="sr-only">Cart</span>
              </Link>
              <span className="font-semibold">$460.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="border-t border-gray-200">
        <div className="container mx-auto px-4">
          <ul className="flex items-center space-x-8 py-4">
            <li>
              <Link
                href="/"
                className="flex items-center text-gray-700 hover:text-teal-500"
              >
                Home
                {/* <Plus className="ml-1 h-4 w-4" /> */}
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className="flex items-center text-gray-700 hover:text-teal-500"
              >
                Shop
                {/* <Plus className="ml-1 h-4 w-4" /> */}
              </Link>
            </li>
            <li>
              <Link
                href="/page"
                className="flex items-center text-gray-700 hover:text-teal-500"
              >
                Page
                {/* <Plus className="ml-1 h-4 w-4" /> */}
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="flex items-center text-gray-700 hover:text-teal-500"
              >
                Blog
                {/* <Plus className="ml-1 h-4 w-4" /> */}
              </Link>
            </li>
            <li>
              <Link
                href="/on-sale"
                className="text-gray-700 hover:text-teal-500"
              >
                On sale
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-teal-500"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
