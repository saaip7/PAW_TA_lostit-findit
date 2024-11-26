import React from "react";
import FaqAccordion from "@/components/FaqAccordion";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from '@/components/button';
import { FaWhatsapp } from "react-icons/fa";

export default function FAQPage() {
    
    return(
        <>
        <Navbar />
        <div className="bg-white min-h-screen">
        <div className="bg-white border-b border-gray-300 text-lg font-semibold pt-10 pb-4 text-left mx-14">
            Frequently Asked Questions
        </div>

            <div className="flex flex-col md:grid grid-cols-[65%_35%] gap-4 p-10">
                <div className="p-5 pb-16">
                    <FaqAccordion />
                </div>
                <div className="bg-darkBlue2 w-[90%] max-w-[432px] h-auto mx-auto my-9 p-6 rounded-lg self-start">
                    <div className="flex flex-col justify-center">
                        <div className="text-white text-base md:text-lg font-semibold mb-2 text-left">Tidak menemukan jawaban? Hubungi kami</div>
                        <div className="text-white text-sm md:text-base font-normal text-left">Kami siap membantu anda menemukan jawaban yang kamu cari</div>
                        <div className='py-2'>
                            <a href='https://wa.me/6282324105677' target="_blank" rel="noopener noreferrer">
                                <Button variant="default" className="px-4 py-3 rounded-md bg-whiteBg hover:border-white border border-transparent hover:bg-darkBlue2">
                                    <div className='flex flex-row items-start align-center gap-1 text-darkBlue2 hover:text-white'>
                                        <FaWhatsapp size={20}/>
                                        <div>
                                        Tanya Admin
                                        </div>
                                    </div>
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}