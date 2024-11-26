"use client";

import React, { useState, useEffect } from "react";
import { Search, Menu, X, Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/button";
import Cookies from "js-cookie";
import Link from "next/link";
import LaporBarangModal, { LaporBarangFormData } from "./laporBarangModal";
import { useRouter } from "next/navigation"; // For Next.js App Router
import {toast} from "react-toastify";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Add handler for form submission
  const handleSubmitLaporan = (formData: LaporBarangFormData) => {
    console.log(formData);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const loggedIn = Cookies.get("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    toast.info("Anda telah keluar", {closeOnClick: true});
    Cookies.remove("isLoggedIn");
    setIsLoggedIn(false);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-white px-[1rem] md:px-[4rem] lg:px-[6rem] xl:px-[7rem] shadow-md border-b-2 border-gray-200">
      <div className="mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" rel="noopener noreferrer">
            <div
              className={`hover:scale-110 transition-transform duration-300 will-change-transform`}
            >
              <Image src="/logo.svg" alt="Logo" width={62} height={62} />
            </div>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <div className="relative">
              <form
                onSubmit={handleSearch}
                className="hidden md:block flex-1 max-w-2xl mx-8"
              >
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-darkBlue1" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari barangmu..."
                    className="block w-full pl-10 pr-3 py-2 border border-darkBlue1 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-darkBlue1 focus:border-transparent text-darkBlue1 placeholder:text-darkBlue1"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Button
                  variant="outline"
                  className="px-4 py-2 rounded-md"
                  onClick={() => setIsModalOpen(true)} // Add onClick handler
                >
                  <Plus />
                </Button>
                <a href="/dashboard" rel="noopener noreferrer">
                  <Button variant="outline" className="px-4 py-2 rounded-md">
                    Dashboard
                  </Button>
                </a>
                <Link href="/" onClick={handleLogout} rel="noopener noreferrer">
                  <Button variant="default" className="px-4 py-2 rounded-md">
                    Keluar
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <a href="/login" rel="noopener noreferrer">
                  <Button variant="outline" className="px-4 py-2 rounded-md">
                    Lapor Barang Temuan
                  </Button>
                </a>
                <a href="/login" rel="noopener noreferrer">
                  <Button variant="default" className="px-4 py-2 rounded-md">
                    Masuk Sekarang
                  </Button>
                </a>
              </>
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
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-darkBlue1" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari barangmu..."
                    className="block w-full pl-10 pr-3 py-2 border border-darkBlue1 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-darkBlue1 focus:border-transparent text-darkBlue1 placeholder:text-darkBlue1"
                  />
                </div>
              </form>
            </div>

            {/* Mobile Navigation */}
            {isLoggedIn ? (
              <>
                <div className="flex flex-row w-full gap-2 justify-between">
                  <Button
                    variant="outline"
                    className="px-4 py-2 rounded-md w-[50%]"
                    onClick={() => setIsModalOpen(true)} // Add onClick handler
                  >
                    <Plus />
                  </Button>
                  <Link
                    href="/dashboard"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      className="px-4 py-2 rounded-md w-full"
                    >
                      Dashboard
                    </Button>
                  </Link>
                </div>
                <Button
                  variant="default"
                  className="px-4 py-2 rounded-md w-full"
                  onClick={handleLogout}
                >
                  Keluar
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="w-full text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg border mb-2"
                  >
                    Lapor Barang Temuan
                  </Button>
                </Link>
                <Link href="/login" rel="noopener noreferrer">
                  <Button
                    variant="default"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Masuk Sekarang
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <LaporBarangModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitLaporan}
      />
    </nav>
  );
};

export default Navbar;
