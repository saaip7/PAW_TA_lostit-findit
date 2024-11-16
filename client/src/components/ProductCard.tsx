"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation"; 

interface Product {
    _id: string;
    foto: string;
    namaBarang: string;
    deskripsiBarang: string;
    tempatDitemukan: string;
    waktuDitemukan: Date;
    namaPenemu: string;
    kontak: string;
    statusBarang: string;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [formattedDate, setFormattedDate] = useState("");
    const router = useRouter();

    useEffect(() => {
        const date = new Intl.DateTimeFormat('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Jakarta',
        }).format(new Date(product.waktuDitemukan));
        setFormattedDate(date + " WIB");
    }, [product.waktuDitemukan]);

    const handleButtonClick = () => {
        router.push(`/product/${product._id}`);
    };

    return (
        <div className="h-[472px] w-[288px] p-3 bg-whiteBg rounded-lg shadow border border-[#e8e8e8] flex flex-col justify-start items-start gap-2">
            <div className="h-[264px] w-[264px] bg-white rounded-[10px] flex justify-end items-center overflow-hidden">
                <img className="w-full h-full object-cover" src={product.foto} alt={`Image of ${product.namaBarang}`} />
            </div>
            <div className="px-2 pt-2 pb-1 flex flex-col justify-start items-start gap-4 flex-grow">
                <div className="flex flex-col justify-start items-start gap-1">
                    <div className="self-stretch text-darkBlue1 text-lg font-bold leading-normal">{product.namaBarang}</div>
                    <div className="self-stretch flex gap-1.5 justify-start items-start text-black text-xs">
                        <div className="font-semibold">Tempat : </div>
                        <div className="font-medium overflow-hidden text-ellipsis whitespace-nowrap max-w-[185px]">{product.tempatDitemukan}</div>
                    </div>
                    <div className="flex gap-1.5 items-start text-black text-xs leading-[18px]">
                        <div className="font-semibold">Waktu : </div>
                        <div className="font-medium">{formattedDate} WIB</div>
                    </div>
                    <div className="text-gray text-sm font-normal leading-tight overflow-hidden text-ellipsis line-clamp-2 max-w-[264px]">{product.deskripsiBarang}</div>
                </div>
                <Button variant="default" className="bg-lightBlue1 w-[247px] text-darkBlue1 hover:text-white mt-auto" onClick={handleButtonClick}>Buka Detail</Button>
            </div>
        </div>       
    );
};

export default ProductCard;
