import React from 'react';
import { Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-darkBlue1 text-white rounded-t-3xl">
      <div className="max-w-7xl mx-auto px-4 py-2 pt-8">
        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center lg:justify-between">
          <nav className="flex flex-wrap gap-4 md:gap-8">
            <a href="/dashboard" className="hover:text-blue-100 transition-colors">
              Laporkan Barang
            </a>
            <a href="/faq" className="hover:text-blue-100 transition-colors">
              FAQ
            </a>
            <a href="/found" className="hover:text-blue-100 transition-colors">
              Barang Ditemukan
            </a>
          </nav>
        </div>

        {/* Divider */}
        <div className="h-px bg-white my-8" />

        {/* Bottom Section */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-center md:text-left w-full md:w-auto">
            © 2024 Lost It? Find It!. All rights reserved.
          </p>

          <img
            src="/LogoWhite.png"
            alt="logo"
            className="w-18 h-14 mx-auto md:mx-0"
          />

          <div className="flex flex-wrap gap-4 md:gap-6 justify-center md:justify-end w-full md:w-auto">
            <a href="/terms" className="text-sm hover:text-blue-100 transition-colors">
              Terms of Service
            </a>
            <a href="/privacy" className="text-sm hover:text-blue-100 transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
