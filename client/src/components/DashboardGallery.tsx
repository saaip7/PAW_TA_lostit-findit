"use client";
import React, { useState } from 'react';
import { DetailBarangLaporan } from '@/components/detailBarangLaporan';
import { type Product } from "@/components/BarangLaporan";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/pagination/pagination";

interface DashboardGalleryProps {
  products: Product[];
}

const DashboardGallery: React.FC<DashboardGalleryProps> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct) || [];
  const totalPages = Math.ceil((products?.length || 0) / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        {currentProducts.map((product) => (
          <DetailBarangLaporan
            key={product._id}
            foto={product.foto}
            namaBarang={product.namaBarang}
            deskripsiBarang={product.deskripsiBarang}
            tempatDitemukan={product.tempatDitemukan}
            waktuDitemukan={new Date(product.waktuDitemukan).toLocaleString('id-ID')}
            statusBarang={product.statusBarang}
          />
        ))}
      </div>

      {/* Remove the totalPages > 1 condition to always show pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) handlePageChange(currentPage - 1);
              }}
            />
          </PaginationItem>
          
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={currentPage === index + 1}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(index + 1);
                }}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) handlePageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default DashboardGallery;