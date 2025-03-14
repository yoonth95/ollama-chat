"use client";

import React, { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="flex items-center border-b-[1px] border-border px-5 py-2">
      <Search className="h-4 w-4 text-foreground" />
      <Input placeholder="모델 검색" value={value} onChange={onChange} />
    </div>
  );
};

export default SearchBar;
