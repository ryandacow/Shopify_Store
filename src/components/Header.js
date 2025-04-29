import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCart } from '../context/CartContext'; // ✅ Import Cart Context
import { MagnifyingGlassIcon, UserIcon, ShoppingCartIcon, HeartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import mockProducts from '../data/mockProducts';

export default function Header() {
  const router = useRouter();
  const { cartItems } = useCart(); // ✅ Get cart items
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0); // ✅ Calculate total quantity

  const isActive = (path) => router.pathname === path;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const highlightMatch = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, 'i');
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-amber-200 rounded">
          {part}
        </span>
      ) : (
        <React.Fragment key={i}>{part}</React.Fragment>
      )
    );
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchTerm('');
      }
    };

    if (isSearchOpen) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-stone-300 shadow-sm bg-[#f6ede6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 grid grid-cols-3 items-center">

        {/* Left: Logo + Site Name */}
        <Link href="/" className="flex flex-col items-center space-y-1 justify-self-start">
          <Image
            src="/favicon.ico"
            alt="AmazingStoreSG Logo"
            href='/'
            width={40}
            height={40}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
          />
          <span className="hidden sm:inline text-xs sm:text-sm font-medium text-stone-800">
            AmazingStoreSG
          </span>
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden md:flex justify-center space-x-10 text-sm font-medium text-stone-700">
          {[
            { href: '/', label: 'Home' },
            { href: '/shop', label: 'Shop' },
            { href: '/about-contact', label: 'Contact Us' },
            { href: '/personality', label: 'Personalize' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative py-2
                ${isActive(href) ? 'text-stone-900' : 'text-stone-700'}
                hover:text-stone-900 transition-colors duration-200
                after:content-['']
                after:absolute
                after:w-full
                after:h-0.5
                after:bg-stone-900
                after:left-0
                after:bottom-0
                after:transition-transform
                after:duration-300
                ${isActive(href) ? 'after:scale-x-100' : 'after:scale-x-0'}
                hover:after:scale-x-100
                after:origin-left`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right: Icons */}
        <div className="flex justify-end items-center space-x-6 text-stone-700">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden hover:text-stone-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>

          <button
            aria-label='Search'
            onClick={() => setIsSearchOpen(true)}
            className="hover:text-stone-900"
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
          </button>

          <Link
            aria-label='Manage Profile'
            href='/profile'
            className="hover:text-stone-900"
          >
            <UserIcon className="w-5 h-5" />
          </Link>

          <button
            aria-label='Favourites'
            className="hover:text-stone-900"
          >
            <HeartIcon className="w-5 h-5" />
          </button>

          {/* Cart Icon */}
          <Link
            aria-label='Shopping Cart'
            href="/cart"
            className="hover:text-stone-900 relative"
          >
            <ShoppingCartIcon className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-stone-700 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md z-50 md:hidden">
            <nav className="flex flex-col px-6 py-4 space-y-4">
              {[
                { href: '/', label: 'Home' },
                { href: '/shop', label: 'Shop' },
                { href: '/about-contact', label: 'Contact Us' },
                { href: '/personality', label: 'Personalize' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-stone-700 hover:text-stone-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        )}

        {isSearchOpen && (
          <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex flex-col items-center px-4 pt-24 sm:pt-32">
            {/* Close Button */}
            <button
              aria-label='Close Search Menu'
              onClick={() => {
                setIsSearchOpen(false);
                setSearchTerm('');
              }}
              className="absolute top-6 right-6 text-stone-700 hover:text-stone-900"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {/* Search Input */}
            <input
              aria-label='Input to Search Products'
              type="text"
              placeholder="Search products..."
              className="w-full max-w-md border border-stone-300 rounded-md px-4 py-2 mb-6 text-stone-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />

            <div className="w-full max-w-2xl space-y-4">
              {searchTerm.length > 0 ? (() => {
                const filtered = mockProducts
                  .filter((p) =>
                    p.title.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .slice(0, 5);

                if (filtered.length === 0) {
                  return (
                    <p className="text-stone-500 text-sm text-center">No products found for “{searchTerm}”.</p>
                  );
                }

                return filtered.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="flex items-center gap-4 p-3 bg-white rounded-md shadow hover:bg-stone-100 transition"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <Image
                      src={product.image.url}
                      alt={product.image.altText}
                      width={50}
                      height={50}
                      className="rounded object-cover w-[50px] h-[50px]"
                    />
                    <div className="text-stone-800 font-medium text-sm">
                      {highlightMatch(product.title, searchTerm)}
                    </div>
                  </Link>
                ));
              })() : (
                <p className="text-stone-500 text-sm text-center">Start typing to search...</p>
              )}
            </div>
          </div>
        )}

      </div>
    </header>
  );
}