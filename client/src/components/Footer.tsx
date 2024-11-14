import React from 'react';
import { Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-darkBlue1 text-white rounded-t-3xl">
      <div className="max-w-7xl mx-auto px-4 py-2 pt-8">
        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-between">
          <nav className="flex gap-8 flex-wrap">
            <a href="/login" className="hover:text-blue-100 transition-colors">
              Masuk
            </a>
            <a href="/report" className="hover:text-blue-100 transition-colors">
              Laporkan Barang
            </a>
            <a href="/faq" className="hover:text-blue-100 transition-colors">
              FAQ
            </a>
            <a href="/found" className="hover:text-blue-100 transition-colors">
              Barang Ditemukan
            </a>
          </nav>
          
          <div className="flex gap-4 items-center">
            <a href="https://twitter.com" className="hover:text-blue-100 transition-colors">
              <Twitter size={24} />
            </a>
            <a href="https://instagram.com" className="hover:text-blue-100 transition-colors">
              <Instagram size={24} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white my-8" />

        {/* Bottom Section */}
        <div className="flex flex-wrap items-center justify-between mb-8">
          <p className="text-sm">
            © 2024 Lost It? Find It!. All rights reserved.
          </p>
          
          <img src="/LogoWhite.png" alt="logo" className="w-18 h-14" />
          
          <div className="flex gap-6">
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