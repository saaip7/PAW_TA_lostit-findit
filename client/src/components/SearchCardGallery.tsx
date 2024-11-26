"use client";
import ProductCard from "@/components/ProductCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/pagination/pagination";
import { SkeletonCard } from "./SkeletonCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const SearchCardGallery: React.FC<{ setQuery: (query: string) => void, setTotalItems: (total: number) => void, sortOrder: string }> = ({ setQuery, setTotalItems, sortOrder }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    const updateItemsPerPage = () => {
      const screenWidth = window.innerWidth;
      setItemsPerPage(screenWidth < 768 ? 7 : 16);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  useEffect(() => {
    if (!query) return;

    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/barang/search?query=${query}&sort=${sortOrder}`
        );
        setProducts(response.data);
        setQuery(query);
        setTotalItems(response.data.length);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [query, setQuery, setTotalItems, sortOrder]);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-whiteBg flex flex-col justify-center">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md2:grid-cols-2 md1:grid-cols-3 lg1:grid-cols-4 mx-auto">
      {isLoading
          ? Array.from({ length: itemsPerPage }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : currentProducts.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
      {totalPages > 1 && (
        <Pagination className="mt-10">
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
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default SearchCardGallery;