import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-4 p-4 border rounded-lg shadow-md w-[300px] h-[400px]">
      {/* Gambar Produk */}
      <Skeleton className="h-[180px] w-full rounded-lg" />
      
      {/* Informasi Produk */}
      <div className="space-y-2">
        {/* Nama Produk */}
        <Skeleton className="h-6 w-3/4" />
        
        {/* Harga Produk */}
        <Skeleton className="h-5 w-1/2" />
        
        {/* Rating */}
        <Skeleton className="h-4 w-1/3" />
      </div>
      
      {/* Tombol */}
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  );
}
