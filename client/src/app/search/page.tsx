"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SearchCardGallery from "@/components/SearchCardGallery";
import { Footer } from "@/components/Footer";
import Loading from "@/components/Loading";
import SortDropdown from "@/components/FilterSortDropdown";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState(""); // Query untuk pencarian
  const [totalItems, setTotalItems] = useState(0); // Jumlah total item hasil pencarian
  const [sortOrder, setSortOrder] = useState("asc"); // Urutan sort (default: ascending)

  useEffect(() => {
    // Set loading menjadi false setelah komponen mount
    setIsLoading(false);
  }, []);

  // Kondisi ketika sedang loading
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="bg-whiteBg flex flex-col justify-between min-h-screen">
        <div className="mt-16 flex-grow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-10 lg1:px-0 lg:px-[6rem] xl:px-[8rem] 2xl:px-[10rem] gap-4 sm:gap-0">
            <div className="flex flex-col items-start sm:mb-0 mb-4">
              <div className="flex flex-row items-center gap-2 ">
                <h2 className="font-bold md:text-2xl text-base">Hasil pencarian</h2>
                <p className="font-bold md:text-2xl text-base">&quot;{query}&quot;</p>
              </div>
              <div className="flex flex-row gap-1 text-darkBlue1 font-medium">
                <p className="md:text-lg text-xs">Menampilkan</p>
                <p className="md:text-lg text-xs">{totalItems}</p>
                <p className="md:text-lg text-xs">barang</p>
              </div>
            </div>
            <div className="flex flex-row justify-end sm:items-end sm:mt-0 text-black font-medium lg:text-lg text-sm items-center gap-2">
              <span>Urutkan</span>
              <SortDropdown value={sortOrder} onValueChange={setSortOrder} />
            </div>
          </div>
          <div className="mt-8 px-4rem lg:px-[6rem] xl:px-[8rem] 2xl:px-[10rem]">
            <SearchCardGallery
              setQuery={setQuery}
              setTotalItems={setTotalItems}
              sortOrder={sortOrder}
            />
          </div>
        </div>
        <div className="pt-40 bg-whiteBg">
          <Footer />
        </div>
      </div>
    </>
  );
}
