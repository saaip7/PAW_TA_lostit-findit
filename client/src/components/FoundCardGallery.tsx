"use client";
import ProductCard from "@/components/ProductCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/pagination/pagination";

const FoundCardGallery: React.FC<{ 
  setTotalItems: (total: number) => void, 
  sortOrder: string 
}> = ({ setTotalItems, sortOrder }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/barang");
        const foundProducts = response.data.filter((product: any) => 
          product.statusBarang === "Sudah diambil"
        );
        setProducts(foundProducts);
        setTotalItems(foundProducts.length);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [setTotalItems, sortOrder]);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products
    .sort((a: any, b: any) => {
      if (sortOrder === "asc") {
        return new Date(a.waktuDitemukan).getTime() - new Date(b.waktuDitemukan).getTime();
      } else {
        return new Date(b.waktuDitemukan).getTime() - new Date(a.waktuDitemukan).getTime();
      }
    })
    .slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="bg-whiteBg flex flex-col justify-center">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 mx-auto">
        {currentProducts.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default FoundCardGallery;