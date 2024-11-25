"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Loading from "@/components/Loading";
import SortDropdown from "@/components/FilterSortDropdown";
import FoundCardGallery from "@/components/FoundCardGallery";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    // Set loading to false after the component mounts
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  }


  return (
    <>
      <Navbar />
      <div className="bg-whiteBg flex flex-col justify-center">
        <div className="mt-16">
          <div className="flex flex-row items-center justify-between px-4rem lg:px-[6rem] xl:px-[8rem] 2xl:px-[10rem]">
            <div className="flex flex-col items-start">
              <div className="flex flex-row items-center gap-2">
                <h2 className="font-bold text-2xl">Barang Sudah Ditemukan</h2>
              </div>
                <div className="flex flex-row gap-1 text-darkBlue1 font-medium">
                    <p className="text-lg">Menampilkan</p>
                    <p className="text-lg">{totalItems}</p>
                    <p className="text-lg">barang</p>
                </div>
            </div>
            <div className="text-black font-medium text-lg flex items-center gap-2">
              <span>Urutkan</span>
              <SortDropdown value={sortOrder} onValueChange={setSortOrder} />
            </div>
          </div>
          <div className="mt-8">
            <FoundCardGallery setTotalItems={setTotalItems} sortOrder={sortOrder} />
          </div>
        </div>
      </div>
      <div className="pt-40 bg-whiteBg">
        <Footer />
      </div>
    </>
  );
}
