"use client";
import Navbar from '@/components/Navbar'
import React, { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/button';
import FilterDropdown from '@/components/FilterDropdown';
import BarangLaporan from '@/components/BarangLaporan';
import { Footer } from "@/components/Footer";
import CustomTextBox from "@/components/customTextBox";
import Loading from '@/components/Loading';
import LaporBarangModal, { LaporBarangFormData} from '@/components/laporBarangModal';

export default function Dashboard() {
  const [filterStatus, setFilterStatus] = useState('belum');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const handleFilterChange = (value: string) => {
    setFilterStatus(value);
    setCurrentPage(1); // Reset to page 1 when filter changes
  };
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitLaporan = (formData: LaporBarangFormData) => {
    console.log(formData);
    // Handle form submission here
    setIsModalOpen(false);
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Set loading to false after the component mounts
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <div className="text-black font-semibold text-3xl mt-16 ml-28">
            Dashboard Pelapor
          </div>
          <div className="mt-4 ml-28 mr-28 mb-16">
            <Tabs defaultValue="profile">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="barang">Barang</TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <div className="flex flex-row justify-between mt-14 pb-4 border-b border-gray-300">
                  <div className="text-black font-semibold text-2xl">
                    Pengaturan Profile
                  </div>
                </div>
                
                <div className="mt-8 w-full">
                  <form className="space-y-1">
                    <div className="grid grid-cols-[200px_1fr] items-center gap-8">
                      <label className="text-[#667479] text-lg">Nama</label>
                      <CustomTextBox
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Masukkan nama"
                      />
                    </div>

                    <div className="grid grid-cols-[200px_1fr] items-center gap-8">
                      <label className="text-[#667479] text-lg">Email</label>
                      <CustomTextBox
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Masukkan email"
                      />
                    </div>

                    <div className="grid grid-cols-[200px_1fr] items-center gap-8">
                      <label className="text-[#667479] text-lg">Password</label>
                      <CustomTextBox
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Masukkan password baru"
                        autoComplete="off"
                      />
                    </div>

                    <div className="grid grid-cols-[200px_1fr] items-center gap-8">
                      <label className="text-[#667479] text-lg">Konfirmasi Password</label>
                      <CustomTextBox
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Konfirmasi password baru"
                        autoComplete="off"
                      />
                    </div>

                    <div className="grid grid-cols-[200px_1fr] items-start gap-8">
                      <label className="text-[#667479] text-lg pt-2">Alamat</label>
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Masukkan alamat"
                        className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-black leading-tight border-gray-300 focus:outline-none focus:ring-2 focus:ring-lightBlue-500 min-h-[100px] resize-none"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button variant="default" className="px-7 py-3 text-lg rounded-md mt-10">
                        Simpan
                      </Button>
                    </div>
                  </form>
                </div>
              </TabsContent>

              <TabsContent value="barang">
                <div className="flex flex-row justify-between mt-14 pb-4 border-b border-gray-300">
                  <div className="text-black font-semibold text-2xl">
                    Barang Laporanmu
                  </div>
                  <div className="text-black font-medium text-lg flex items-center gap-2">
                    <span>Filter&nbsp;by:</span>
                    <FilterDropdown value={filterStatus} onValueChange={handleFilterChange} />
                    <Button 
                      variant="default" 
                      className="px-4 py-2 rounded-md ml-2"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Buat Laporan
                    </Button>

                    <LaporBarangModal 
                      isOpen={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                      onSubmit={handleSubmitLaporan}
                      />
                  </div>
                </div>
                <BarangLaporan 
                  filterStatus={filterStatus} 
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              </TabsContent>

            </Tabs>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}