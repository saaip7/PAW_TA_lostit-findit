"use client";
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FilterDropdown() {
  const [value, setValue] = useState('belum');

  const options = [
    { value: 'belum', label: 'Belum diambil' },
    { value: 'sudah', label: 'Sudah diambil' }
  ];

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="min-w-[100px] h-10 border border-[#1457D2] text-sm font-medium">
        <SelectValue placeholder="Filter status" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem 
            key={option.value} 
            value={option.value}
            className="text-sm"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}