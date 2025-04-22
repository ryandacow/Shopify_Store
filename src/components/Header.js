import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MagnifyingGlassIcon, UserIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <header className="bg-[#f6ede6] border-b border-stone-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo + Site Name */}
          <div className="flex flex-col items-center space-y-1">
            <Image
              src="/favicon.ico"
              alt="KidsTreasures Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-sm font-medium text-stone-800">TheAmazingStore</span>
          </div>

          {/* Center: Navigation */}
          <nav className="hidden md:flex space-x-10 text-sm font-medium text-stone-700">
            <Link href="/" className="hover:text-stone-900">Home</Link>
            <Link href="/shop" className="hover:text-stone-900">Shop</Link>
            <Link href="/about" className="hover:text-stone-900">About</Link>
            <Link href="/contact" className="hover:text-stone-900">Contact</Link>
            <Link href="/personalize" className="hover:text-stone-900">Personalize</Link>
          </nav>

          {/* Right: Icons */}
          <div className="flex items-center space-x-6 text-stone-700">
            <button className="hover:text-stone-900">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
            <button className="hover:text-stone-900">
              <UserIcon className="w-5 h-5" />
            </button>
            <button className="hover:text-stone-900 relative">
              <ShoppingCartIcon className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-stone-700 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}