"use client";

import React, { useEffect, useState } from "react";
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
  const { setModels, setError } = useModelStore();

  useEffect(() => {
    setModels(initialModels);
    setError(initialError);
  }, [initialModels, initialError, setModels, setError]);

  const [inputValue, setInputValue] = useState("");
  const { selectedModel, setSelectedModel, models, error } = useModelStore();

  useEffect(() => {
    if (!selectedModel) return;

    const modelSet = new Set(models.map((model) => model.model));
    if (!modelSet.has(selectedModel.model)) {
      setSelectedModel(null);
    }
  }, [models, selectedModel, setSelectedModel]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <header>
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
    </header>
  );
};

export default Header;
