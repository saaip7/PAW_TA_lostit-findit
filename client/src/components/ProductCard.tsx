"use client";
import React from "react";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation"; // Using next/navigation for routing in Next.js 13

interface Product {
    productId: string;
    name: string;
    location: string;
    eventDate: Date;
    description: string;
    imageUrl: string;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const formattedDate = new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Jakarta',
    }).format(product.eventDate); 
    const router = useRouter();

    const handleButtonClick = () => {
        router.push(`/product/${product.productId}`);
    };

    return (
        <div className="h-[472px] w-[288px] p-3 bg-whiteBg rounded-lg shadow border border-[#e8e8e8] flex flex-col justify-start items-start gap-2">
            <div className="h-[264px] w-[264px] bg-white rounded-[10px] flex justify-end items-center overflow-hidden">
                <img className="w-full h-full object-cover" src={product.imageUrl} alt={`Image of ${product.name}`} />
            </div>
            <div className="px-2 pt-2 pb-1 flex flex-col justify-start items-start gap-4 flex-grow">
                <div className="flex flex-col justify-start items-start gap-1">
                    <div className="self-stretch text-darkBlue1 text-lg font-bold leading-normal">{product.name}</div>
                    <div className="self-stretch flex gap-1.5 justify-start items-start text-black text-xs">
                        <div className="font-semibold">Tempat : </div>
                        <div className="font-medium overflow-hidden text-ellipsis whitespace-nowrap max-w-[185px]">{product.location}</div>
                    </div>
                    <div className="flex gap-1.5 items-start text-black text-xs leading-[18px]">
                        <div className="font-semibold">Waktu : </div>
                        <div className="font-medium">{formattedDate} WIB</div>
                    </div>
                    <div className="text-gray text-sm font-normal leading-tight overflow-hidden text-ellipsis line-clamp-2 max-w-[264px]">{product.description}</div>
                </div>
                <Button variant="default" className="bg-lightBlue1 w-[247px] text-darkBlue1 hover:text-white mt-auto" onClick={handleButtonClick}>Buka Detail</Button>
            </div>
        </div>       
    );
};

export default ProductCard;
