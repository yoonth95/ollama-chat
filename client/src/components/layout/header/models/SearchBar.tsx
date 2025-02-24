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
      <Input
        placeholder="모델 검색"
        value={value}
        onChange={onChange}
        className="border-0 text-foreground placeholder:text-muted-foreground focus:border-transparent focus:outline-none focus:ring-0 dark:border-accent dark:bg-accent dark:ring-offset-accent dark:focus-visible:ring-0 dark:focus-visible:ring-transparent"
      />
    </div>
  );
};

export default SearchBar;
