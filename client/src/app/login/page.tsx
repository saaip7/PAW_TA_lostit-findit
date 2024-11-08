"use client";
import AuthImage from "@/app/components/authImage";
import CustomTextBox from "@/app/components/customTextBox";
import React, { useState } from "react";
import { Button } from "@/app/components/button";
import Link from "next/link";
import { Eye, EyeOff } from "react-feather"; // kalau nggak ke detect bisa install pake 'npm install react-feather --legacy-peer-deps'
import Logo from "@/app/components/logo";

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [showPassword, setShowPassword] = useState(false); 
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: { [key: string]: string } = {};
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        setErrors(newErrors);
    
        if (Object.keys(newErrors).length === 0) {
          console.log('Form submitted', { email, password });
        }
    };

    return (
        <div className="flex flex-col md:grid grid-cols-[45%_55%] gap-4 p-4 mx-auto min-h-screen bg-white w-[100%]">
            <div className="h-1/2 flex flex-col">
            <Link href="/" className="self-start">
                <div className="mb-16">
                    <Logo />
                </div>
            </Link>
            <div className="max-w-sm mx-auto flex flex-col space-y-4">
                <div className="text-black font-bold text-center text-4xl">
                    Masuk Sekarang
                </div>
                <div className="text-black text-md font-regular text-gray">
                    Masuk ke akunmu untuk menggunakan seluruh fitur kami.
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <div className="flex items-center justify-between mt-4">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="form-checkbox"></input>
                            <span className="text-darkGray">Ingat aku</span>
                        </label>
                        <Link href="" className="text-darkBlue1 hover:underline">
                            Lupa Password
                        </Link>
                    </div>
                    <Button variant="default" className="w-full h-12 mt-4">
                        Masuk
                    </Button>
                    <div className="flex items-center mt-4 justify-center">
                        <div className="flex items-center font-regular">
                            <span className="text-darkGray">Belum punya akun?</span>
                        </div>
                        <Link href="/register" className="text-darkBlue1 hover:underline ml-2">
                            Daftar
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

export default Login;
