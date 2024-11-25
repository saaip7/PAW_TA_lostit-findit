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

const SearchCardGallery: React.FC<{ setQuery: (query: string) => void, setTotalItems: (total: number) => void, sortOrder: string }> = ({ setQuery, setTotalItems, sortOrder }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;
  const [products, setProducts] = useState([]);
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    if (!query) return;

    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/barang/search?query=${query}&sort=${sortOrder}`
        );
        setProducts(response.data);
        setQuery(query);
        setTotalItems(response.data.length);
      } catch (error) {
        console.error("Error fetching products:", error);
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