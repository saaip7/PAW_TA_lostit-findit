import Image from "next/image";
import AuthImage from "./components/authImage";
import Login from "./login/page";
import ProductCard from "./components/ProductCard";

const product = {
  productId: '1',
  name: 'Botol Tumbler tutup biru',
  location: 'Depan KMTETI di tempat refill deket pintu',
  eventDate: new Date('2024-11-10T10:30:00+07:00'), // Pastikan waktu di-set dalam zona waktu yang sesuai
  description: 'Botol tumbler ada sticker KMTETI, lecet di bagian tutup, tutup biru, botol putih',
  imageUrl: '/image.png',
};

export default function Home() {
  return (
    <div >
          <ProductCard product={product}/>
    </div>
  );
}
