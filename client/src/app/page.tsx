"use client";
import ProductCard from "@/components/ProductCard";
import React, {useState} from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/pagination/pagination"
import Navbar from "@/components/Navbar";

const products = [
  {
    productId: '1',
    name: 'Botol Tumbler tutup biru',
    location: 'Depan KMTETI di tempat refill deket pintu',
    eventDate: new Date('2024-11-10T10:30:00+07:00'),
    description: 'Botol tumbler ada sticker KMTETI, lecet di bagian tutup, tutup biru, botol putih',
    imageUrl: '/image.png',
    status: 'Not Found',
  },
  {
    productId: '2',
    name: 'Botol Minum Pink',
    location: 'Di kantin dekat lobi utama',
    eventDate: new Date('2024-11-12T14:00:00+07:00'),
    description: 'Botol pink, baru, belum pernah dipakai',
    imageUrl: '/image.png',
    status: 'Not Found',
  },
  {
    productId: '3',
    name: 'Botol Air Kaca',
    location: 'Di luar ruang kerja bersama',
    eventDate: new Date('2024-11-13T09:00:00+07:00'),
    description: 'Botol kaca besar, ada goresan di sisi kanan',
    imageUrl: '/image.png',
    status: 'Not Found',
  },
  {
    productId: '4',
    name: 'Botol Tumbler Hitam',
    location: 'Di depan pintu masuk kantin',
    eventDate: new Date('2024-11-14T08:00:00+07:00'),
    description: 'Botol tumbler hitam dengan logo baru, kondisi sangat baik',
    imageUrl: '/image.png',
    status: 'Not Found',
  },
  {
    productId: '5',
    name: 'Botol Air Biru',
    location: 'Dekat meja kerja di lantai 2',
    eventDate: new Date('2024-11-15T11:00:00+07:00'),
    description: 'Botol biru besar, ada sedikit penyok',
    imageUrl: '/image.png',
    status: 'Not Found',
  },
  {
    productId: '6',
    name: 'Botol Air Biru',
    location: 'Dekat meja kerja di lantai 2',
    eventDate: new Date('2024-11-15T11:00:00+07:00'),
    description: 'Botol biru besar, ada sedikit penyok',
    imageUrl: '/image.png',
    status: 'Not Found',
  },
  {
    productId: '7',
    name: 'Botol Air Biru',
    location: 'Dekat meja kerja di lantai 2',
    eventDate: new Date('2024-11-15T11:00:00+07:00'),
    description: 'Botol biru besar, ada sedikit penyok',
    imageUrl: '/image.png',
    status: 'Not Found',
  },
  {
    productId: '8',
    name: 'Botol Air Biru',
    location: 'Dekat meja kerja di lantai 2',
    eventDate: new Date('2024-11-15T11:00:00+07:00'),
    description: 'Botol biru besar, ada sedikit penyok',
    imageUrl: '/image.png',
    status: 'Not Found',
  },
  {
    productId: '9',
    name: 'Botol Air Biru',
    location: 'Dekat meja kerja di lantai 2',
    eventDate: new Date('2024-11-15T11:00:00+07:00'),
    description: 'Botol biru besar, ada sedikit penyok',
    imageUrl: '/image.png',
    status: 'Not Found',
  },
  {
    productId: '10',
    name: 'Botol Air Biru',
    location: 'Dekat meja kerja di lantai 2',
    eventDate: new Date('2024-11-15T11:00:00+07:00'),
    description: 'Botol biru besar, ada sedikit penyok',
    imageUrl: '/image.png',
    status: 'Not Found',
  },
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-whiteBg flex flex-col justify-center">
      <div>
        <Navbar />
      </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 mx-auto mt-10">
        {currentProducts.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
    
  );
}
