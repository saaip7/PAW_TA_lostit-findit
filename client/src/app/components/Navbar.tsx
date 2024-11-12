"use client";

import React, { useState } from 'react';
import { Search, Menu, X, Plus } from 'lucide-react';
import Image from 'next/image';
import { Button } from './button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

  return (
    <nav className="bg-white px-4rem lg:px-[6rem] xl:px-[8rem] shadow-md border-b-2 border-gray-200">
      <div className="mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image src="/logo.svg" alt="Logo" width={62} height={62} />
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-darkBlue1" />
              </div>
              <input
                type="text"
                placeholder="Cari barangmu..."
                className="block w-full pl-10 pr-3 py-2 border border-darkBlue1 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-darkBlue1 focus:border-transparent text-darkBlue1 placeholder:text-darkBlue1"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <a href="/" target='_blank' rel="noopener noreferrer">
                <Button variant="outline" className="px-4 py-2 rounded-md">
                  <Plus/>
                </Button>
              </a>
            ): null}
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="px-4 py-2 rounded-md">
                Lapor Barang Temuan
              </Button>
            </a>
            {isLoggedIn ? (
              <a href="/profile" target="_blank" rel="noopener noreferrer">
                <Button variant="default" className="px-4 py-2 rounded-md">
                  Keluar
                </Button>
              </a>
            ) : (
              <a href="/" target="_blank" rel="noopener noreferrer">
                <Button variant="default" className="px-4 py-2 rounded-md">
                  Masuk Sekarang
                </Button>
              </a>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Mobile Search Bar */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-darkBlue1" />
              </div>
              <input
                type="text"
                placeholder="Cari barangmu..."
                className="block w-full pl-10 pr-3 py-2 border border-darkBlue1 bg-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button className="w-full text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg border border-blue-600 mb-2">
              Lapor Barang Temuan
            </button>
            {isLoggedIn ? (
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Profile
              </button>
            ) : (
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Masuk Sekarang
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;