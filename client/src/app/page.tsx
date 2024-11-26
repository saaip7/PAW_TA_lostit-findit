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
        <div className="relative flex flex-col h-auto lg2:h-[300px] bg-darkBlue1 md:mx-[4rem] mx-[3rem] sm:mx-[6rem] lg:mx-[8rem] 2xl:mx-[10rem] rounded-2xl overflow-hidden mt-12">
          <div
            className="absolute bg-darkBlue2 -bottom-[480px] -right-[100px] h-[977px] w-[814px]"
            style={{ transform: "rotate(-120deg)", borderRadius: "99px" }}
          ></div>
          <div className="flex flex-col lg3:grid grid-cols-[40%_60%] items-center justify-center ">
            <div className="relative justify-center hidden lg3:block">
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
            <div className="text-white z-10 lg3:text-right lg3:mr-10 lg3:mb-14 items-center justify-center mt-5 lg3:mt-2 lg3:ml-44 lg3:place-items-end text-center">
              <div className="font-black lg3:text-6xl text-3xl md:text-5xl mt-5">
                Lost It? Find It!
              </div>
              <div className="font-bold text-base md:text-lg lg3:text-2xl">
                Temukan Barang Hilangmu
              </div>
              <p className="mt-6 text-white leading-relaxed lg3:w-[400px] mx-6 md:w-[520px] text-xs lg1:w-[350px]">
                Kehilangan barang di kampus? Jangan khawatir! Melalui platform
                kami, kamu dapat dengan mudah mencari dan menemukan kembali
                barang-barang yang hilang di area kampus.
              </p>
              <div className="flex flex-row lg3:mt-4 mt-8 lg3:justify-end mb-10 justify-center">
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
          <div className="relative flex h-auto md:h-[300px] bg-lightBlue1 mx-[3rem] md:mx-[8rem] 2xl:mx-[10rem] rounded-2xl overflow-hidden">
            <div className="flex flex-row items-center md:justify-center z-10">
              <div className="flex flex-col md:items-start md:px-[4rem] mt-10 px-[2rem]">
                <div className="font-bold text-3xl text-black">
                  Tidak ada barangmu?
                </div>
                <div className="text-sm text-black md:mt-2 leading-relaxed md:w-[400px] w-[200px] mt-6">
                  Coba cari di halaman barang yang sudah ditemukan, siapa tahu
                  tertukar dengan orang lain.
                </div>
                <div className="flex flex-row items-center mt-4 mb-10">
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
                <div className="ml-10 hidden lg1:block">
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
