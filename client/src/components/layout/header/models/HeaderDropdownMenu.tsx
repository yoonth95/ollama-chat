"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchBar, AddModelButton, InstalledModels, DownloadableModels } from "@/components/layout/header/models";

const HeaderDropdownMenu = () => {
  const [inputValue, setInputValue] = useState("");

  // input 입력
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <SearchBar value={inputValue} onChange={handleSearchChange} />
      <ScrollArea className="my-2 px-3">
        {inputValue ? (
          <AddModelButton inputValue={inputValue} setInputValue={setInputValue} />
        ) : (
          <div className="grid gap-3">
            <InstalledModels />
            <DownloadableModels />
          </div>
        )}
      </ScrollArea>
    </>
  );
};

export default HeaderDropdownMenu;
