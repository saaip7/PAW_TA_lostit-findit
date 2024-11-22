import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface SortDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function SortDropdown({ value, onValueChange }: SortDropdownProps) {
  const options = [
    { value: 'asc', label: 'Terlama' },
    { value: 'desc', label: 'Terbaru' }
  ];

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="min-w-[100px] h-10 border border-[#1457D2] text-sm font-medium">
        <SelectValue placeholder="Sort by" />
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