import React from 'react';
import { Button } from './button';

interface DetailProps {
    imageUrl: string;
    title: string;
    location: string;
    date: string;
    status: string;
    description: string;
  }
  
export const DetailProductCard: React.FC<DetailProps> = ({
  imageUrl,
  title,
  location,
  date,
  status,
  description
}) => {
  return (
    <article className="flex flex-wrap gap-9 items-start px-5 py-6 bg-white rounded-2xl border border-gray-200 border-solid shadow-md mx-[4rem] sm:mx-[6rem] md:mx-[8rem]">
      <div className="flex overflow-hidden flex-col rounded-lg min-w-[240px] w-[404px]">
        <img loading="lazy" src={imageUrl} alt={title} className="object-contain w-full aspect-[1.18]" />
      </div>
      <div className="flex flex-col items-start pl-3 font-bold min-w-[240px] w-[529px] max-md:max-w-full">
        <h2 className="flex flex-col max-w-full text-2xl text-stone-950 w-[302px]">
          {title}
        </h2>
        <div className="flex flex-col self-stretch mt-5 w-full font-medium max-w-[517px] max-md:max-w-[1280px]">
            <div className="flex flex-wrap items-start py-2 w-full text-sm leading-none text-gray-500 border-b border-solid border-b-gray-200 max-md:max-w-full">
                <div className="gap-2.5 self-stretch px-3 pt-1 pb-0.5 whitespace-nowrap w-[194px] text-darkGray">
                Tempat
                </div>
                <div className="flex-1 shrink gap-2.5 px-3 pt-1 pb-0.5 min-w-[240px] text-darkGray">
                : {location}
                </div>
            </div>
            <div className="flex flex-wrap items-start py-2 w-full text-sm leading-none text-gray-500 border-b border-solid border-b-gray-200 max-md:max-w-full">
                <div className="gap-2.5 self-stretch px-3 pt-1 pb-0.5 whitespace-nowrap w-[194px] text-darkGray">
                Tanggal
                </div>
                <div className="flex-1 shrink gap-2.5 px-3 pt-1 pb-0.5 min-w-[240px] text-darkGray">
                : {date}
                </div>
            </div>
            <div className="flex flex-wrap items-start py-2 w-full border-b border-solid border-b-gray-200 max-md:max-w-full">
                <div className="gap-2.5 self-stretch px-3 pt-1 pb-0.5 text-sm leading-none text-gray-500 whitespace-nowrap w-[194px] text-darkGray">
                Status
                </div>
                <div className="flex flex-1 shrink gap-2.5 items-start px-3 pt-1 pb-0.5 text-base leading-none text-red-700 basis-0 min-w-[240px]">
                    {/* Ganti status dengan status yang sesuai */}
                {status === 'Found' ? (
                    <div className="gap-1 self-stretch px-2 py-1 bg-green-50 border border-green-300 border-solid rounded-[50px] text-green-700">
                        {status}
                    </div>
                ) : (
                    <div className="gap-1 self-stretch px-2 py-1 bg-red-50 border border-red-300 border-solid rounded-[50px] text-red-700">
                        {status}
                    </div>
                )}
                </div>
            </div>
            <div className="flex flex-wrap items-start py-2 w-full text-sm text-gray-500 border-b border-solid border-b-gray-200 max-md:max-w-full">
                <div className="gap-2.5 self-stretch px-3 pt-1 pb-0.5 leading-none whitespace-nowrap w-[194px] text-darkGray">
                Deskripsi
                </div>
                <div className="flex-1 shrink gap-2.5 px-3 py-0.5 h-20 leading-5 min-w-[240px] text-darkGray">
                : {description}
                </div>
            </div>
        </div>
      </div>
    </article>
  );
};