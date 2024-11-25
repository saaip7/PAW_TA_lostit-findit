"use client";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import { Button } from "@/components/button";
import { ArrowLeft, House  } from 'lucide-react';


export default function Home() {
  return (
    <>
      <Navbar />
      <div className="bg-whiteBg flex flex-col justify-center">
        <div className="flex flex-col justify-center items-center mt-10">
          <Image
            src="/404image.png"
            alt="Picture of the author"
            width={400}
            height={400}
          />
          <div>
            <h2 className="text-3xl font-bold text-center">
                404, Halaman Tidak Ditemukan
            </h2>
            <div className="relative w-[500px] mt-2">
                <p className="text-md font-regular text-center">
                    Ada yang salah, mungkin kamu mengetikkan URL yang salah atau halaman yang kamu cari sudah dihapus.
                </p>
            </div>
          </div>
          <div className="flex flew-row gap-2 mt-4  ">
            <Button variant={"default"} className="rounded-md">
                <ArrowLeft className="w-6 h-6 mr-2" />
                Kembali
            </Button>
            <Button variant={"outline"}>
              <House className="w-6 h-6 mr-2" />
                Beranda
            </Button>
          </div>
        </div>
      </div>
      <div className="pt-40 bg-whiteBg">
        <Footer />
      </div>
    </>
  );
}
