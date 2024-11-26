// src/components/BarangLaporan.tsx
"use client";
import React, { useState, useEffect } from 'react';
import DashboardGallery from './DashboardGallery';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export interface Product {
  _id: string;
  foto: string;
  namaBarang: string;
  deskripsiBarang: string;
  tempatDitemukan: string;
  waktuDitemukan: string;
  statusBarang: string;
}

interface BarangLaporanProps {
  filterStatus: string;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const BarangLaporan: React.FC<BarangLaporanProps> = ({ 
  filterStatus, 
  currentPage,
  onPageChange 
}) => {
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const token = Cookies.get('authToken');
        
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch(`${API_URL}/api/barang/my-items`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setUserProducts(data);
      } catch (error) {
        console.error('Error fetching user products:', error);
      }
    };

    fetchUserProducts();
  }, [router]);

  const filteredProducts = userProducts.filter(product => {
    if (filterStatus === 'sudah') {
      return product.statusBarang === 'Sudah diambil';
    } else if (filterStatus === 'belum') {
      return product.statusBarang === 'Belum diambil';
    }
    return true;
  });

  return (
    <div className="mt-8">
      <DashboardGallery 
        products={filteredProducts}
        currentPage={currentPage}
        onPageChange={onPageChange} />
    </div>
  );
};

export default BarangLaporan;