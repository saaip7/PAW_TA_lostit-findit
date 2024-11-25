"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import CardGallery from "@/components/CardGallery";
import { Button } from "@/components/button";
import { Footer } from "@/components/Footer";
import Loading from "@/components/Loading";
import { Plus } from "lucide-react";
const LaporBarangModal = dynamic(() => import("@/components/laporBarangModal"));
import { LaporBarangFormData } from "@/components/laporBarangModal";
import Cookies from "js-cookie";
import Image from "next/image";
import dynamic from "next/dynamic";



export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Set loading to false after the component mounts
    setIsLoading(false);

    // Check login status from cookies
    const loggedIn = Cookies.get("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  // Handler for form submission in the modal
  const handleSubmitLaporan = (formData: LaporBarangFormData) => {
    console.log(formData);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="bg-whiteBg flex flex-col justify-center">
        <div className="relative flex h-[300px] bg-darkBlue1 mx-[4rem] sm:mx-[6rem] md:mx-[8rem] 2xl:mx-[10rem] rounded-2xl overflow-hidden mt-10">
          <div
            className="absolute bg-darkBlue2 -bottom-[480px] -right-[100px] h-[977px] w-[814px]"
            style={{ transform: "rotate(-120deg)", borderRadius: "99px" }}
          ></div>
          <div className="flex flex-col md:grid grid-cols-[40%_60%] items-center justify-center ">
            <div className="relative justify-center hidden md:block">
              <Image
                src="/manConfused.png"
                alt="man confused picture"
                width={600}
                height={600}
                className="object contain absolute z-0"
              />
              <Image
                src="/Man_Searching.png"
                alt="man searching picture"
                width={440}
                height={400}
                className="object contain ml-36 relative z-5"
              />
            </div>
            <div className="text-white z-10 md:text-right md:mr-10 md:mb-14 items-center md:mt-2 ml-10 md:ml-44 md:place-items-end">
              <div className="font-black lg:text-6xl text-4xl md:text-2xl">
                Lost It? Find It!
              </div>
              <div className="font-bold text-lg md:text-xl lg:text-2xl">
                Temukan Barang Hilangmu
              </div>
              <p className="mt-2 text-white leading-relaxed md:w-[400px] w-[300px] text-xs">
                Kehilangan barang di kampus? Jangan khawatir! Melalui platform
                kami, kamu dapat dengan mudah mencari dan menemukan kembali
                barang-barang yang hilang di area kampus.
              </p>
              <div className="flex flex-row mt-4 md:justify-end justify-start">
                <a href="/faq" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="px-4 py-2 rounded-md text-white hover:bg-darkBlue1 border-white hover:border-darkBlue1"
                  >
                    FAQ
                  </Button>
                </a>
                <a href="/dashboard" rel="noopener noreferrer">
                  <Button
                    variant="default"
                    className="px-4 py-2 rounded-md ml-4 bg-white border text-darkBlue1 hover:bg-transparent hover:text-white"
                  >
                    Nemu Barang?
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <CardGallery />
        </div>
        <section className="py-[4rem]">
          <div className="relative flex h-[300px] bg-lightBlue1 mx-[4rem] sm:mx-[6rem] md:mx-[8rem] 2xl:mx-[10rem] rounded-2xl overflow-hidden">
            <div className="flex flex-row items-center md:justify-center z-10">
              <div className="flex flex-col items-start px-[4rem]">
                <div className="font-bold text-3xl text-black">
                  Tidak ada barangmu?
                </div>
                <div className="text-sm text-black mt-2 leading-relaxed md:w-[400px] w-[300px]">
                  Coba cari di halaman barang yang sudah ditemukan, siapa tahu
                  tertukar dengan orang lain.
                </div>
                <div className="flex flex-row items-center mt-4">
                  <a href="/found" rel="noopener noreferrer">
                    <Button
                      variant="default"
                      className="px-4 py-2 rounded-md bg-white border text-darkBlue1 hover:bg-transparent hover:border-darkBlue1"
                    >
                      Barang Ditemukan
                    </Button>
                  </a>
                </div>
              </div>
                <div className="ml-10 hidden lg:block">
                <Image
                  src="/manConfused.png"
                  alt="orang bingung"
                  className="absolute -bottom-[320px] right-28"
                  width={600}
                  height={600}
                />
                </div>
            </div>
            <div
              className="absolute -bottom-[60px] transform -translate-x-1/2 -left-14 bg-lightBlue2  h-full w-full"
              style={{
                transform: "rotate(150deg)",
                borderRadius: "99px",
                width: "700px",
                height: "500px",
              }}
            />
          </div>
        </section>
      </div>

      {/* Floating Add Button - Only show if user is logged in */}
      {isLoggedIn && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <Plus size={24} />
        </button>
      )}

      {/* Modal for Adding Items */}
      <LaporBarangModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitLaporan}
      />

      <Footer />
    </>
  );
}
