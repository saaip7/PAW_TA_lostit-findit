import React from 'react';
import { Button } from './button';
import { FaWhatsapp } from "react-icons/fa";

interface DetailProps {
  foto: string;
  namaBarang: string;
  deskripsiBarang: string;
  tempatDitemukan: string;
  waktuDitemukan: string;
  statusBarang: string;
  kontak : string;
}
  
export const DetailProductCard: React.FC<DetailProps> = ({
  foto,
  namaBarang,
  tempatDitemukan,
  waktuDitemukan,
  statusBarang,
  deskripsiBarang,
  kontak
}) => {

  const formatWhatsAppLink = (phoneNumber: string) => {
    // Remove any non-digit characters
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    // Add country code if not present
    const formattedNumber = cleanNumber.startsWith('62') ? cleanNumber : `62${cleanNumber.substring(1)}`;
    return `https://wa.me/${formattedNumber}`;
  };
  return (
    <article className="flex flex-wrap gap-9 items-start px-5 py-6 bg-white rounded-2xl border border-gray-200 border-solid shadow-md mx-[4rem] sm:mx-[6rem] md:mx-[8rem] 2xl:mx-[10rem]">
      <div className="flex overflow-hidden flex-col rounded-lg min-w-[240px] w-[404px]">
        <img loading="lazy" src={foto} alt={namaBarang} className="object-cover w-full aspect-[1.18] " />
      </div>
      <div className="flex flex-col items-start pl-3 font-bold min-w-[240px] w-[529px] max-md:max-w-full">
        <h2 className="flex flex-col max-w-full text-2xl text-stone-950 w-[302px]">
          {namaBarang}
        </h2>
        <div className="flex flex-col self-stretch mt-5 w-full font-medium max-w-[517px] max-md:max-w-[1280px]">
            <div className="flex flex-wrap items-start py-2 w-full text-sm leading-none text-gray-500 border-b border-solid border-b-gray-200 max-md:max-w-full">
                <div className="gap-2.5 self-stretch px-3 pt-1 pb-0.5 whitespace-nowrap w-[194px] text-darkGray">
                Tempat
                </div>
                <div className="flex-1 shrink gap-2.5 px-3 pt-1 pb-0.5 min-w-[240px] leading-5 text-darkGray">
                : {tempatDitemukan}
                </div>
            </div>
            <div className="flex flex-wrap items-start py-2 w-full text-sm leading-none text-gray-500 border-b border-solid border-b-gray-200 max-md:max-w-full">
                <div className="gap-2.5 self-stretch px-3 pt-1 pb-0.5 whitespace-nowrap w-[194px] text-darkGray">
                Tanggal
                </div>
                <div className="flex-1 shrink gap-2.5 px-3 pt-1 pb-0.5 min-w-[240px] text-darkGray">
                : {waktuDitemukan}
                </div>
            </div>
            <div className="flex flex-wrap items-start py-2 w-full border-b border-solid border-b-gray-200 max-md:max-w-full">
                <div className="gap-2.5 self-stretch px-3 pt-1 pb-0.5 text-sm leading-none text-gray-500 whitespace-nowrap w-[194px] text-darkGray">
                Status
                </div>
                <div className="flex flex-1 shrink gap-2.5 items-start px-3 pt-1 pb-0.5 text-base leading-none text-red-700 basis-0 min-w-[240px]">
                    {/* Ganti status dengan status yang sesuai */}
                {statusBarang === 'Sudah diambil' ? (
                    <div className="gap-1 self-stretch px-2 py-1 bg-green-50 border border-green-300 border-solid rounded-[50px] text-green-700 text-sm">
                        Sudah Diambil
                    </div>
                ) : (
                    <div className="gap-1 self-stretch px-2 py-1 bg-red-50 border border-red-300 border-solid rounded-[50px] text-red-700 text-sm">
                        Belum Diambil
                    </div>
                )}
                </div>
            </div>
            <div className="flex flex-wrap items-start py-2 w-full text-sm text-gray-500 border-b border-solid border-b-gray-200 max-md:max-w-full">
                <div className="gap-2.5 self-stretch px-3 pt-1 pb-0.5 leading-none whitespace-nowrap w-[194px] text-darkGray">
                Deskripsi
                </div>
                <div className="flex-1 shrink gap-2.5 px-3 py-0.5 h-20 leading-5 min-w-[240px] text-darkGray">
                : {deskripsiBarang}
                </div>
            </div>
            <div className='py-2'>
            <a href={formatWhatsAppLink(kontak)} target="_blank" rel="noopener noreferrer">
              <Button variant="default" className="px-4 py-2 rounded-md">
                <div className='flex flex-row items-start align-center gap-1'>
                  <FaWhatsapp size={20}/>
                  <div>
                    Lapor Barang Temuan
                  </div>
                </div>
              </Button>
            </a>
            </div>
        </div>
      </div>
    </article>
  );
};