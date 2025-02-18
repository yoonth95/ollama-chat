"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, Search, Check } from "lucide-react";
import { useModels } from "@/providers/ModelsProvider";
import { useModelStore } from "@/store/useModelStore";

const Header = () => {
  const [inputValue, setInputValue] = useState("");

  const { models } = useModels();
  const { selectedModel, setSelectedModel } = useModelStore();

  const handleModelChange = (model: string) => {
    setSelectedModel(models.find((m) => m.name === model) || null);
  };

  return (
    <header>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-fit p-0 text-lg text-foreground focus-visible:ring-0 focus-visible:ring-offset-0 dark:hover:bg-background dark:hover:text-foreground"
          >
            <span>{selectedModel?.name || "모델 선택"}</span>
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[32rem] border border-border bg-accent p-0" align="start">
          <div className="flex items-center border-b-[1px] border-border px-5 py-2">
            <Search className="h-4 w-4 text-foreground" />
            <Input
              placeholder="모델 검색"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border-0 text-foreground placeholder:text-muted-foreground focus:border-transparent focus:outline-none focus:ring-0 dark:border-accent dark:bg-accent dark:ring-offset-accent dark:focus-visible:ring-0 dark:focus-visible:ring-transparent"
            />
          </div>
          <ScrollArea className="my-2 px-3">
            <div className="grid">
              <div>
                {models.length > 0 ? (
                  <div className="grid gap-2">
                    {models.map((model) => (
                      <Button
                        key={model.name}
                        variant="ghost"
                        onClick={() => handleModelChange(model.name)}
                        className="w-full justify-between font-normal text-foreground dark:hover:bg-neutral-700/50"
                      >
                        {model.name}
                        {selectedModel?.name === model.name && <Check className="h-4 w-4" />}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="px-3 py-2 text-sm text-muted-foreground">모델 없음</div>
                )}
              </div>
              {inputValue && (
                <div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-3 py-2 text-foreground dark:hover:bg-neutral-700/50"
                  >
                    Ollama.com에서 &quot;{inputValue}&quot; 가져오기
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
