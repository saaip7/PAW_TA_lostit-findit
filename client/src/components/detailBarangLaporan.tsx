import React, { useState } from 'react';
import { AiFillEdit } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { BsCheckLg } from "react-icons/bs";
import EditBarangModal, {EditBarangFormData} from './editBarangModal';
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogContent, 
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface DetailProps {
  foto: string;
  namaBarang: string;
  deskripsiBarang: string;
  tempatDitemukan: string;
  waktuDitemukan: string;
  statusBarang: string;
  barangId: string;
}
  
export const DetailBarangLaporan: React.FC<DetailProps> = ({
  foto,
  namaBarang,
  tempatDitemukan,
  waktuDitemukan,
  statusBarang,
  deskripsiBarang,
  barangId
}) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [localStatus, setLocalStatus] = useState(statusBarang);

    const handleEditClick = () => {
      setIsEditModalOpen(true);
    };

    const handleEditSubmit = (formData: EditBarangFormData) => {
      console.log(formData);
      // Handle form submission here
      setIsEditModalOpen(false);
    };

    const handleStatusUpdate = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/barang/${barangId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            statusBarang: 'Sudah diambil'
          })
        });

        if (response.ok) {
          setLocalStatus('Sudah diambil');
          alert('Status updated successfully');
          // You might want to trigger a refresh of the parent component
          window.location.reload();
        } else {
          console.error('Failed to update status');
        }
      } catch (error) {
        console.error('Error updating status:', error);
      }
    };

    const handleDelete = async () => {
      try {
        // Check if the image URL is from Cloudinary
        if (foto.includes('cloudinary.com')) {
          // Extract public_id from Cloudinary URL
          const urlParts = foto.split('/');
          const folderIndex = urlParts.indexOf('lost-found');
          
          if (folderIndex !== -1) {
            const publicId = urlParts.slice(folderIndex).join('/').split('.')[0];
        
            // Try to delete from Cloudinary first
            try {
              const cloudinaryResponse = await fetch('http://localhost:5000/api/upload', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ public_id: publicId })
              });
        
              if (!cloudinaryResponse.ok) {
                console.warn('Failed to delete image from Cloudinary');
              }
            } catch (cloudinaryError) {
              console.warn('Error deleting from Cloudinary:', cloudinaryError);
            }
          }
        }
    
        const response = await fetch(`http://localhost:5000/api/barang/${barangId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete item from database');
        }
    
        alert('Item deleted successfully');
        window.location.reload();
    
      } catch (error) {
        if (error instanceof Error) {
          console.warn('Delete operation failed:', error.message);
        } else {
          console.warn('Delete operation failed with unknown error');
        }
        alert('Failed to delete item. Please try again.');
      }
    };

  return (
    <article className="relative flex flex-wrap gap-9 items-start px-5 py-6 bg-white rounded-2xl border border-gray-200 border-solid shadow-md">
        {/* Add the buttons container */}
          <div className="absolute right-[12px] top-[12px] flex gap-3">
            <button className="p-2 bg-[#ECECEC] rounded-md hover:opacity-80 transition-opacity border border-[#9E9E9E]" onClick={handleEditClick}>
                <AiFillEdit className="w-7 h-7 text-[#202020]"/>
            </button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="p-2 bg-[#F9F2F2] rounded-md hover:opacity-80 transition-opacity border border-[#E2A1A1]">
                  <BsTrashFill className="w-7 h-7 text-[#BA1818]"/>
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
                  <p>Apakah Anda yakin ingin menghapus barang ini?</p>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Hapus
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            {localStatus !== 'Sudah diambil' && (
                <button className="p-2 bg-[#1457D2] rounded-md hover:opacity-80 transition-opacity border border-" onClick={handleStatusUpdate}>
                    <BsCheckLg className="w-7 h-7 text-white"/>
                </button>
            )}
          </div>
          <div className="flex overflow-hidden flex-col rounded-lg min-w-[240px] w-[404px]">
            <img loading="lazy" src={foto} alt={namaBarang} className="object-cover w-full aspect-[1.18] " />
          </div>
          <div className="flex flex-col items-start pl-3 font-bold min-w-[240px] w-[814px] max-md:max-w-full">
            <h2 className="flex flex-col max-w-full text-2xl text-stone-950">
              {namaBarang}
            </h2>
            <div className="flex flex-col self-stretch mt-5 w-full font-medium max-md:max-w-[1280px]">
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
                <div className="flex flex-wrap items-start py-2 w-full text-sm text-gray-500 border-solid border-b-gray-200 max-md:max-w-full">
                    <div className="gap-2.5 self-stretch px-3 pt-1 pb-0.5 leading-none whitespace-nowrap w-[194px] text-darkGray">
                      Deskripsi
                    </div>
                    <div className="flex-1 shrink gap-2.5 px-3 py-0.5 h-20 leading-5 min-w-[240px] text-darkGray">
                      : {deskripsiBarang}
                    </div>
                </div>
            </div>
          </div>
          <EditBarangModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={handleEditSubmit}
            barangId={barangId}
          />
    </article>
  );
};