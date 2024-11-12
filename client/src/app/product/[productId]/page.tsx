// app/product/[productId]/page.tsx

import { notFound } from 'next/navigation';

// Data produk sementara (bisa menggunakan API atau sumber data lain di aplikasi sebenarnya)
const products = [
  {
    productId: '1',
    name: 'Botol Tumbler tutup biru',
    location: 'Depan KMTETI di tempat refill deket pintu',
    eventDate: new Date('2024-11-10T10:30:00+07:00'),
    description: 'Botol tumbler ada sticker KMTETI, lecet di bagian tutup, tutup biru, botol putih',
    imageUrl: '/image.png',
  },
  {
    productId: '2',
    name: 'Botol Minum Pink',
    location: 'Di kantin dekat lobi utama',
    eventDate: new Date('2024-11-12T14:00:00+07:00'),
    description: 'Botol pink, baru, belum pernah dipakai',
    imageUrl: '/image.png',
  },
  // Add more products as needed...
];

export default function ProductDetailPage({ params }: { params: { productId: string } }) {
  const product = products.find((p) => p.productId === params.productId);

  if (!product) {
    return notFound(); // Show 404 page if product is not found
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} className="w-full h-auto mt-4" />
      <p className="text-lg mt-2">{product.description}</p>
      <p className="text-sm text-gray-500 mt-1"><strong>Lokasi:</strong> {product.location}</p>
      <p className="text-sm text-gray-500"><strong>Waktu:</strong> {product.eventDate.toLocaleString('id-ID')}</p>
    </div>
  );
}
