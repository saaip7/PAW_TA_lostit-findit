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
import useAuth from '@/hooks/useAuth';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export default function Dashboard() {
  useAuth();

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
  const [noHP, setnoHP] = useState('');

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        toast.warn('Passwords do not match!', {closeOnClick: true});
        return;
      }
    }
  
    try {
      const token = Cookies.get('authToken');
      const userData: any = {};
  
      if (name) userData.nama = name;
      if (email) userData.email = email; 
      if (password) userData.password = password;
      if (noHP) userData.noHP = noHP;
  
      // Get the current user first to get their ID
      const userResponse = await fetch('http://localhost:5000/api/user/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const user = await userResponse.json();
  
      // Then update using the user's ID
      const response = await fetch(`http://localhost:5000/api/user/${user._id}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });
  
      if (response.ok) {
        toast.success('Profile updated successfully!', {closeOnClick: true});
        setPassword('');
        setConfirmPassword('');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to update profile", {closeOnClick: true});
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("An error occurred while updating profile", {closeOnClick: true});
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get('authToken');
        const response = await fetch('http://localhost:5000/api/user/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (response.ok) {
          const userData = await response.json();
          // Populate the form fields with user data
          setName(userData.nama);
          setEmail(userData.email);
          setnoHP(userData.noHP); // If address exists in your user model
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchUserData();
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
            <Tabs defaultValue="barang">
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
                  <form onSubmit={handleUpdateProfile} className="space-y-1">
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
                        placeholder="********"
                        autoComplete="off"
                      />
                    </div>

                    <div className="grid grid-cols-[200px_1fr] items-center gap-8">
                      <label className="text-[#667479] text-lg">Konfirmasi Password</label>
                      <CustomTextBox
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="********"
                        autoComplete="off"
                      />
                    </div>

                    <div className="grid grid-cols-[200px_1fr] items-center gap-8">
                      <label className="text-[#667479] text-lg">No WhatsApp</label>
                      <CustomTextBox
                        type="tel"
                        value={noHP}
                        onChange={(e) => setnoHP(e.target.value)}
                        placeholder="Masukkan Nomor WhatsApp"
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