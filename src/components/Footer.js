import Link from 'next/link';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';



export default function Footer() {
  return (
    <footer className="text-stone-700 border-t border-stone-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 pl-10 py-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* Shop Links */}
        <div>
          <h3 className="font-semibold mb-3">Navigation</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/shop" className="hover:underline">Shop</Link></li>
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/personality" className="hover:underline">Personalize</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">FAQs</a></li>
            <li><a href="#" className="hover:underline">Returns & Exchanges</a></li>
          </ul>
        </div>

        {/* Contact & Connect */}
        <div>
          <h3 className="font-semibold mb-3">Get in Touch</h3>
          <ul className="space-y-3 text-sm text-stone-700">
            <li className="flex items-start gap-2">
              <MapPinIcon className="h-5 w-5 text-stone-900 mt-0.5" />
              <a href="/contact" className="hover:underline">Contact Page</a>
            </li>
            <li className="flex items-start gap-2">
              <EnvelopeIcon className="h-5 w-5 text-stone-900 mt-0.5" />
              <a href="mailto:support@kidstreasures.com" className="hover:underline">Placeholder@gmail.com</a>
            </li>
            <li className="flex items-start gap-2">
              <PhoneIcon className="h-5 w-5 text-stone-900 mt-0.5" />
              <a href="tel:+6591234567" className="hover:underline">+65 Placeholder</a>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="mt-6 flex items-center space-x-4 text-stone-600">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
              <FaInstagram className='w-5 h-5' />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              <FaTiktok className='w-5 h-4' />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              <FaFacebook className='w-5 h-5' />
            </a>
          </div>
        </div>
      </div>
      <div className = 'flex justify-center py-6 text-sm text-stone-500'>
          © {new Date().getFullYear()} KidsTreasures. All rights reserved.
      </div>
    </footer>
  );
}