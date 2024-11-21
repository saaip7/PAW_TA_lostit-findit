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
  currentPage: number;
  onPageChange: (page: number) => void;
}

const DashboardGallery: React.FC<DashboardGalleryProps> = ({ 
  products,
  currentPage, 
  onPageChange
}) => {
  const itemsPerPage = 5;
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct) || [];
  const totalPages = Math.ceil((products?.length || 0) / itemsPerPage);

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
            barangId={product._id}
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
                if (currentPage > 1) onPageChange(currentPage - 1);
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
                  onPageChange(index + 1);
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
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default DashboardGallery;