"use client";
import AuthImage from "@/components/authImage";
import CustomTextBox from "@/components/customTextBox";
import React, { useState } from "react";
import { Button } from "@/components/button";
import Link from "next/link";
import { Eye, EyeOff } from "react-feather";
import Logo from "@/components/logo";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ApiResponse } from "../types/user";
import { toast } from "react-toastify";

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [showPassword, setShowPassword] = useState(false); 
    const [rememberMe, setRememberMe] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const newErrors: { [key: string]: string } = {};
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        setErrors(newErrors);
    
        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await fetch("http://localhost:5000/api/user/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });
    
                const data: ApiResponse = await response.json();
                
                if (response.ok && data.token) {
                    // Set cookies
                    Cookies.set("authToken", data.token, {
                        expires: rememberMe ? 7 : 1 / 24,
                        sameSite: "Strict",
                        secure: process.env.NODE_ENV === "production",
                    });
                    Cookies.set('isLoggedIn', 'true');
    
                    // Check user role and redirect
                    const userResponse = await fetch('http://localhost:5000/api/user/me', {
                        headers: {
                            'Authorization': `Bearer ${data.token}`
                        }
                    });
    
                    if (userResponse.ok) {
                        const userData = await userResponse.json();
                        if (userData.role === 'admin') {
                            router.push('/admin');
                        } else {
                            router.push('/');
                        }
                    }
                    toast.success('Login successful!', {closeOnClick: true});
                } else {
                    toast.error(data.message || 'Login failed!', {closeOnClick: true});
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error('An error occurred. Please try again', {closeOnClick: true});
            }
        }
    };

    return (
        <div className="flex flex-col md:grid grid-cols-[45%_55%] gap-4 p-4 mx-auto min-h-screen bg-white w-[100%]">
            <div className="h-1/2 flex flex-col">
            <div className="self-start">
                <div className="mb-16">
                    <Logo />
                </div>
            </div>
            <div className="max-w-sm mx-auto flex flex-col space-y-4">
                <div className="text-black font-bold text-center text-4xl">
                    Masuk Sekarang
                </div>
                <div className="text-md font-regular text-gray">
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
                            <input type="checkbox" name="rememberMe" className="form-checkbox" checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}></input>
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
