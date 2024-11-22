// app/product/[productId]/page.tsx

import { notFound } from "next/navigation";
import { DetailProductCard } from "@/components/detailProductCard";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/button";
import { Footer } from "@/components/Footer";
import React from "react";

interface Product {
  productId: string;
  foto: string;
  namaBarang: string;
  deskripsiBarang: string;
  tempatDitemukan: string;
  waktuDitemukan: string;
  namaPenemu: string;
  kontak: string;
  statusBarang: string;
}

async function getProductData(productId: string): Promise<Product | null> {
  try {
    const response = await fetch(`http://localhost:5000/api/barang/${productId}`, {
      method: "GET",  
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Product = await response.json(); 
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: { productId: string }
}) {

  const { productId } = await params;
  const product = await getProductData(productId);
  if (!product) {
    return notFound(); // Show 404 page if product is not found
  }

  return (
    <>
    <Navbar/>
    <div className="relative bg-white min-h-screen w-full">
      <div className="py-[4rem]">
        <DetailProductCard
          foto={product.foto}
          namaBarang= {product.namaBarang}
          tempatDitemukan={product.tempatDitemukan}
          waktuDitemukan={new Date(product.waktuDitemukan).toLocaleString('id-ID')}
          statusBarang={product.statusBarang}
          deskripsiBarang={product.deskripsiBarang}
        />
      </div>
      
      <section className="py-[4rem]">
        <div className="relative flex h-[300px] bg-darkBlue1 mx-[4rem] sm:mx-[6rem] md:mx-[8rem] rounded-2xl overflow-hidden">
          <div className="flex flex-row items-center justify-center z-10">
            <div className="flex flex-col items-start px-[4rem]">
              <div className="font-bold text-3xl text-white">
                Masih Bingung Caranya?
              </div>
              <div className="text-sm text-white mt-2">
                Jangan khawatir, pergi ke halaman FAQ atau hubungi admin.
              </div>
              <div className="flex flex-row items-center mt-4">
                <a href="/" target="_blank" rel="noopener noreferrer">
                  <Button variant="default" className="px-4 py-2 rounded-md bg-white border text-darkBlue1 hover:bg-transparent hover:text-white">
                    FAQ
                  </Button>
                </a>
                <a href="/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="px-4 py-2 rounded-md ml-4 text-white hover:bg-darkBlue1 border-white hover:border-darkBlue1">
                    Tanya Admin
                  </Button>
                </a>
              </div>
            </div>
            <div className="ml-10 hidden lg:block">
              <img src="/manConfused.png" alt="orang bingung" 
                    className="absolute -bottom-[320px] right-28"
                    style={{width:'600px', height:'600px'}}/>
            </div>

          </div>
          <div className="absolute -bottom-[300px] -right-20 transform -translate-x-1/2 bg-lightBlue1 opacity-30 h-full w-full"
                style={{ transform: 'rotate(153deg)', borderRadius:'99px'}}/>
          <div className="absolute -bottom-[60px] transform -translate-x-1/2 -left-14 bg-[#063FA8]  h-full w-full"
                style={{ transform: 'rotate(150deg)', borderRadius:'99px', width:'700px', height:'500px'}}/>
        </div>
      </section>

      <Footer/>
    </div>
    </>
  );
}
