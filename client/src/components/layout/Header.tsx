"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { SearchBar, InstalledModels, DownloadableModels, ErrorDisplay } from "@/components/header";
import { useModels } from "@/providers/ModelsProvider";
import { useModelStore } from "@/store/useModelStore";
import modelData from "@/data/modelData.json";

interface ModelDetails {
  name: string;
  parameters: string;
  volume: string;
}

interface ModelList {
  [key: string]: ModelDetails[];
}

const Header: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const { models: availableModels = [], error } = useModels(); // 설치된 모델
  const { selectedModel, setSelectedModel } = useModelStore(); // 선택한 모델

  const availableModelNames = availableModels.map((m) => m.name);

  // 다운로드 가능한 모델 필터링
  const downloadableModels = (): ModelList => {
    const filtered: ModelList = {};
    Object.entries(modelData).forEach(([category, models]) => {
      const available = models.filter((model) => !availableModelNames.includes(model.name));
      if (available.length > 0) filtered[category] = available;
    });
    return filtered;
  };

  const handleModelChange = (modelName: string) => {
    setSelectedModel(availableModels.find((m) => m.name === modelName) || null);
  };

  const handleDownload = (model: ModelDetails) => {
    console.log(model);
    // revalidateTag("models");
  };

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
            <span>{selectedModel?.name || "모델 선택"}</span>
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
                  <div>
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-3 py-2 text-foreground dark:hover:bg-neutral-700/50"
                    >
                      Ollama.com에서 &quot;{inputValue}&quot; 모델 다운로드
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-3">
                    <InstalledModels
                      availableModels={availableModels}
                      selectedModel={selectedModel}
                      onSelect={handleModelChange}
                    />
                    <DownloadableModels downloadableModels={downloadableModels()} onDownload={handleDownload} />
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
