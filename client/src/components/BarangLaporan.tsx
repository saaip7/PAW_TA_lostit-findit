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

const BarangLaporan = () => {
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

        const response = await fetch('http://localhost:5000/api/barang/my-items', {
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

  return (
    <div className="mt-8">
      <DashboardGallery products={userProducts} />
    </div>
  );
};

export default BarangLaporan;