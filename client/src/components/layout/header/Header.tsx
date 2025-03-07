"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { useSidebarStore } from "@/stores/useSidebarStore";
import { ModelErrorType, ModelInfoType } from "@/types/modelType";
import { ChevronDown, PanelRightClose, SquarePen } from "lucide-react";

interface HeaderProps {
  initialModels: ModelInfoType[];
  initialError?: ModelErrorType;
}

const Header = ({ initialModels, initialError }: HeaderProps) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const { selectedModel, error, setModels, setError } = useModelStore();
  const { isOpen, toggleSidebar } = useSidebarStore();

  useEffect(() => {
    setModels(initialModels);
    setError(initialError);
  }, [initialModels, initialError, setModels, setError]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <header className="flex justify-between px-4 pb-4">
      <div className="flex items-center gap-3">
        {!isOpen && (
          <div className="flex items-center justify-between">
            <Button variant="icon" className="h-8 w-8 text-secondary-foreground" onClick={toggleSidebar}>
              <PanelRightClose className="!h-5 !w-5" />
            </Button>
            <Button variant="icon" className="h-8 w-8 text-secondary-foreground" onClick={() => router.push("/")}>
              <SquarePen className="!h-5 !w-5" />
            </Button>
          </div>
        )}
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
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
