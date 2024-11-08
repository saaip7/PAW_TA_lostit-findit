"use client";
import AuthImage from "@/app/components/authImage";
import CustomTextBox from "@/app/components/customTextBox";
import React, { useState } from "react";
import { Button } from "@/app/components/button";
import Link from "next/link";
import { Eye, EyeOff } from "react-feather"; // kalau nggak ke detect bisa install pake 'npm install react-feather --legacy-peer-deps'
import Logo from "@/app/components/logo";

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState<{[key: string]: string}>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        const newErrors: { [key: string]: string } = {};
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        if (!name) newErrors.name = 'Name is required';
        if (!phone) newErrors.phone = 'No Whatsapp is required';
        else if (!/^\d{10,13}$/.test(phone)) {
            newErrors.phone = 'No Whatsapp should be 10-13 digits';
        }
        setErrors(newErrors);
    
        if (Object.keys(newErrors).length === 0) {
          console.log('Form submitted', { email, password });
        }
    };

    return (
        <div className="flex flex-col md:grid grid-cols-[45%_55%] gap-4 p-4 mx-3 min-h-screen">
            <div className="h-1/2 flex flex-col">
            <Link href="/" className="self-start">
                <div className="mb-16">
                    <Logo />
                </div>
            </Link>
            <div className="max-w-sm mx-auto flex flex-col space-y-4">
                <div className="text-black font-semibold text-center text-4xl">
                    Daftarkan Dirimu
                </div>
                <div className="text-black text-md font-extralight">
                    Buat akun untuk merasakan segala fitur yang tersedia 
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <CustomTextBox
                        label="Nama"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Isi namamu"
                        error={errors.name}
                    />
                    <CustomTextBox
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Masukkan email"
                        error={errors.email}
                    />
                    <div className="relative">
                        <CustomTextBox
                            label="Password"
                            type={showPassword ? "text" : "password"} 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Masukkan password"
                            error={errors.password}
                            autoComplete="off"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)} 
                            className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    <CustomTextBox
                        label="No WhatsApp"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Cth: 081234567891"
                        error={errors.phone}
                    />
                    <Button variant="default" className="w-full h-12 mt-4">
                        Daftar
                    </Button>
                    <div className="flex items-center mt-4 justify-center">
                        <div className="flex items-center font-extralight">
                            <span>Sudah punya akun?</span>
                        </div>
                        <Link href="/login" className="text-darkBlue1 hover:underline ml-2">
                            Masuk
                        </Link>
                    </div>
                </form>
              </div>  
            </div>
            <div className="h-1/2 hidden md:block py-3 px-3">
                <AuthImage />
            </div>
        </div>
    );
}

export default Register;
