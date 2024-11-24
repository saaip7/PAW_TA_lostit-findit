"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EllipsisVertical } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import EditBarangModal from "@/components/editBarangModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useSearchParams } from "next/navigation";

interface Barang {
  _id: string;
  foto: string;
  namaBarang: string;
  deskripsiBarang?: string;
  tempatDitemukan: string;
  waktuDitemukan: string;
  namaPenemu: string;
  kontak: string;
  statusBarang: "Sudah diambil" | "Belum diambil";
}

interface BarangTableProps {
  searchQuery: string;
}

export default function BarangTable({ searchQuery }: BarangTableProps ) {
  const [barangList, setBarangList] = useState<Barang[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchBarang();
  }, [searchQuery]);

  const fetchBarang = async () => {
    try {
      let url = "http://localhost:5000/api/barang";

      // Jika ada searchQuery, tambahkan query param ke URL
      if (searchQuery) {
        console.log(searchQuery);
        url += `/search?query=${encodeURIComponent(searchQuery)}`;
      }

      const response = await axios.get(url);
      const data = response.data;
      setBarangList(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:5000/api/barang/${id}`);
    fetchBarang();
  };

  const openEditModal = (id: string) => {
    setEditingId(id);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleModalSubmit = (updatedData: any) => {
    fetchBarang();
    closeEditModal();
  };

  const handleStatusChange = async (id: string, currentStatus: string) => {
    try {
      const newStatus =
        currentStatus === "Sudah diambil" ? "Belum diambil" : "Sudah diambil";

      const response = await fetch(`http://localhost:5000/api/barang/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ statusBarang: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Only refresh data if update was successful
      await fetchBarang();
      alert(`Status berhasil diubah menjadi ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Gagal mengubah status barang");
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Foto</TableHead>
            <TableHead>Nama Barang</TableHead>
            <TableHead>Deskripsi Barang</TableHead>
            <TableHead>Tempat Ditemukan</TableHead>
            <TableHead>Waktu Ditemukan</TableHead>
            <TableHead>Nama Penemu</TableHead>
            <TableHead>Kontak</TableHead>
            <TableHead className="w-[10vw]">Status Barang</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {barangList.map((barang) => (
            <TableRow key={barang._id}>
              <TableCell>
                <div className="w-24 h-24 overflow-hidden">
                  <img
                    src={barang.foto}
                    alt={barang.namaBarang}
                    className="w-full h-full object-cover"
                  />
                </div>
              </TableCell>
              <TableCell>{barang.namaBarang}</TableCell>
              <TableCell>{barang.deskripsiBarang}</TableCell>
              <TableCell>{barang.tempatDitemukan}</TableCell>
              <TableCell>
                {new Date(barang.waktuDitemukan).toLocaleString()}
              </TableCell>
              <TableCell>{barang.namaPenemu}</TableCell>
              <TableCell>
                <a
                  href={`https://wa.me/${barang.kontak}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp size={24} color="#25D366" />
                </a>
              </TableCell>
              <TableCell>
                {barang.statusBarang === "Sudah diambil" ? (
                  <div className="flex items-center justify-center gap-1 w-fit self-stretch px-[0.75vw] py-[0.5vw] bg-green-50 border border-green-300 border-solid rounded-full text-green-700 text-[0.675vw]">
                    Sudah Diambil
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-1 w-fit self-stretch px-[0.75vw] py-[0.5vw] bg-red-50 border border-red-300 border-solid rounded-full text-red-700 text-[0.675vw]">
                    Belum Diambil
                  </div>
                )}
              </TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button>
                      <EllipsisVertical size={20} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => openEditModal(barang._id)}>
                      Edit Barang
                    </DropdownMenuItem>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 
                        text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground w-full"
                        >
                          Hapus Barang
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogTitle>
                          Konfirmasi Penghapusan
                        </AlertDialogTitle>
                        <AlertDialogHeader>
                          <p>Apakah Anda yakin ingin menghapus barang ini?</p>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(barang._id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Hapus
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <DropdownMenuItem
                      onClick={() =>
                        handleStatusChange(barang._id, barang.statusBarang)
                      }
                    >
                      Ganti Status
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isModalOpen && editingId && (
        <EditBarangModal
          isOpen={isModalOpen}
          onClose={closeEditModal}
          onSubmit={handleModalSubmit}
          barangId={editingId}
        />
      )}
    </div>
  );
}
