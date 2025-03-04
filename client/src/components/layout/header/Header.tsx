"use client";

import React, { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  SearchBar,
  InstalledModels,
  DownloadableModels,
  ErrorDisplay,
  AddModelButton,
} from "@/components/layout/header/models";
import { useModelStore } from "@/stores/useModelStore";
import { ModelErrorType, ModelInfoType } from "@/types/modelType";
import { ChevronDown } from "lucide-react";

interface HeaderProps {
  initialModels: ModelInfoType[];
  initialError?: ModelErrorType;
}

const Header = ({ initialModels, initialError }: HeaderProps) => {
  const [inputValue, setInputValue] = useState("");
  const { selectedModel, error, setModels, setError } = useModelStore();

  useEffect(() => {
    setModels(initialModels);
    setError(initialError);
  }, [initialModels, initialError, setModels, setError]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <header className="flex justify-between px-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-fit p-0 text-lg text-foreground dark:ring-offset-background dark:hover:bg-background dark:focus-visible:ring-0 dark:focus-visible:ring-transparent"
          >
            <span className="font-medium">{selectedModel?.model || "모델 선택"}</span>
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[20rem] border border-border bg-accent p-0" align="start">
          {error ? (
            <ErrorDisplay error={error} />
          ) : (
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
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <ThemeToggle />
    </header>
  );
};

export default Header;
