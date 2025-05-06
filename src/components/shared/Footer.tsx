import Link from 'next/link';
import logo from '@/assets/medi-logo-white.png';
import Image from 'next/image';
import { Facebook, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cyan-900 text-white">
      <div className="mx-auto mt-10 w-full px-8 lg:px-20">
        <div className="grid grid-cols-2 gap-[40px] px-4 py-6 md:grid-cols-4 lg:py-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/">
              <Image height={300} width={300} src={logo} alt="Logo" />
            </Link>
            <p className="mt-4">
              Providing reliable healthcare essentials and personalized service
              to support your wellness journey—every day, with care.
            </p>
            <div className="my-5 flex gap-5">
              <Facebook />
              <Twitter />
              <Linkedin />
            </div>
          </div>
          <div className="links-container">
            <h2 className="mb-6 text-xl leading-[1.4] font-bold text-white">
              Product
            </h2>
            <ul>
              <li className="mb-4">
                <Link href="/shop">Shop</Link>
              </li>
              <li className="mb-4">Features</li>
              <li className="mb-4">Pricing</li>
              <li className="mb-4">Case Studies</li>
            </ul>
          </div>
          <div className="links-container">
            <h2 className="mb-6 text-xl leading-[1.4] font-bold text-white">
              Service
            </h2>
            <ul>
              <li className="mb-4">Blog</li>
              <li className="mb-4">Roadmap</li>
              <li className="mb-4">Testimonials</li>
            </ul>
          </div>
          <div className="links-container">
            <h2 className="mb-6 text-xl leading-[1.4] font-bold text-white">
              Solutions
            </h2>
            <ul>
              <li className="mb-4">Process Management</li>
              <li className="mb-4">Request Management</li>
              <li className="mb-4">Workflow Management</li>
              <li className="mb-4">Finance</li>
            </ul>
          </div>
        </div>
      </div>
      <p className="bg-cyan-950 px-4 py-6 text-center text-sm">
        © Copyright 2025 by Medi Sphere. All right reserved.
      </p>
    </footer>
  );
};

export default Footer;
