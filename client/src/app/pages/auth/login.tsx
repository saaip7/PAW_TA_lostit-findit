"use client";
import AuthImage from "@/app/components/authImage";
import CustomTextBox from "@/app/components/customTextBox";
import React, { useState } from "react";
import { Button } from "@/app/components/button";

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{[key: string]: string}>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        // Validate inputs
        const newErrors: { [key: string]: string } = {};
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        setErrors(newErrors);
    
        if (Object.keys(newErrors).length === 0) {
          // Handle form submission
          console.log('Form submitted', { email, password });
        }
      };
    return (
        <div className="flex flex-col md:grid grid-cols-[45%_55%] gap-4 p-4 min-h-screen">
            <div className="h-1/2 max-w-sm mx-auto justify-items-center">
              <div className="flex flex-col space-y-4">
                <div className="text-black font-semibold text-center text-4xl">
                    Masuk Sekarang
                </div>
                <div className="text-black text-lg font-thin">
                    Masuk ke akunmu untuk menggunakan seluruh fitur kami.
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <CustomTextBox
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Masukkan email"
                        error={errors.email}>
                    </CustomTextBox>
                    <CustomTextBox
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Masukkan email"
                        error={errors.password}>
                    </CustomTextBox>
                    <Button variant="default" className="w-full h-12 mt-4">
                        Masuk
                    </Button>
                </form>
                </div>  
            </div>
            <div className="h-1/2">
            <AuthImage />
            </div>
        </div>
    )
}

export default Login;