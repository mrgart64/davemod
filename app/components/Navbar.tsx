'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import useModal from '@/state/useModal';

interface NavItem {
  label: string;
  href: string;
}

const navLinks: NavItem[] = [
  { label: 'Home', href: '/#home' },
  { label: 'Coba AI', href: '/#analisis-pesan' },
  { label: 'Fitur', href: '/#kemampuan-ai' },
  { label: 'Kontak', href: '/#kontak-developer' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modal = useModal();

  return (
    <header className="fixed top-4 left-0 right-0 z-30 px-4 max-w-7xl mx-auto">
      <nav className="backdrop-blur-md bg-white/95 border border-neutral-400 rounded-2xl overflow-hidden shadow-sm text-slate-800 transition-all duration-300">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">

            {/* Bagian Kiri: Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-semibold flex items-center gap-3 tracking-tight">
                <img
                  src="/images/dave-dark.webp"
                  alt="Logo DaveMod"
                  width={128}
                  height={128}
                  className="w-12 h-12 object-contain drop-shadow-md"
                  loading="eager"
                />

                <div>
                  <span className="font-extrabold italic text-lg text-slate-900 drop-shadow-sm">
                    DaveMod
                  </span>
                  <div className="text-[10px] italic font-medium font-mono tracking-wider uppercase text-neutral-700">
                    AI Moderator Penipuan
                  </div>
                </div>
              </Link>
            </div>

            {/* Bagian Tengah: Menu Desktop */}
            <div className="hidden md:flex items-center space-x-8 font-medium text-sm text-neutral-800">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="relative transition-colors duration-300 group py-1 hover:text-slate-900"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full rounded-full" />
                </Link>
              ))}
            </div>

            {/* Bagian Kanan: CTA Button dengan Icon */}
            <div className="hidden md:flex items-center">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  modal.onOpen();
                }}
                className="flex items-center gap-2 px-5 py-2 border border-neutral-700 bg-neutral-900 hover:bg-neutral-600 text-white text-sm font-semibold rounded-xl backdrop-blur-[1px] transition-all duration-200 active:scale-95"
              >
                <Heart className="w-4 h-4 fill-white/20 text-white" />
                <span className="text-white">Donasi</span>
              </a>
            </div>

            {/* Tombol Hamburger (Mobile) */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="focus:outline-none p-2 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Menu Mobile */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-200 px-4 pt-3 pb-5 space-y-2 text-sm font-medium bg-white text-slate-700">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="block px-4 py-2.5 rounded-xl transition-all duration-200 hover:bg-slate-100 hover:text-slate-900"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-200 mt-2">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  modal.onOpen();
                  setIsOpen(false);
                }}
                className="flex items-center justify-center gap-2 px-5 py-2.5 border border-neutral-700 bg-neutral-900 hover:bg-neutral-600 text-white text-sm font-semibold rounded-xl backdrop-blur-[1px] transition-all duration-200 active:scale-95"
              >
                <Heart className="w-4 h-4 fill-white/20 text-white" />
                <span className="text-white">Donasi</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}