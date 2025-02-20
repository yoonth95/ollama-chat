"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";
import { ArrowDownToLine } from "lucide-react";

interface ModelDetails {
  name: string;
  parameters: string;
  volume: string;
}

interface ModelList {
  [key: string]: ModelDetails[];
}

interface DownloadableModelsProps {
  downloadableModels: ModelList;
  onDownload: (model: ModelDetails) => void;
}

const DownloadableModels = ({ downloadableModels, onDownload }: DownloadableModelsProps) => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-muted-foreground">설치 가능한 모델</h4>
      <div className="space-y-1">
        {Object.entries(downloadableModels).map(([category, models]) => (
          <DropdownMenuSub key={category}>
            <DropdownMenuSubTrigger className="text-foregroun focus:text-foregroun px-4 py-2 dark:hover:bg-neutral-700/50">
              <span>{category}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="text-foregroun border-zinc-700 bg-zinc-900">
              {models.map((model) => (
                <Button
                  key={model.name}
                  variant="ghost"
                  className="text-foregroun focus:text-foregroun flex h-[55px] cursor-pointer items-center gap-3 dark:hover:bg-neutral-700/50"
                  onClick={() => onDownload(model)}
                >
                  <div className="flex w-[200px] flex-col items-start">
                    <span className="font-medium">{model.name}</span>
                    <span className="text-xs text-zinc-400">
                      Parameters: {model.parameters} | Volume: {model.volume}
                    </span>
                  </div>
                  <ArrowDownToLine />
                </Button>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ))}
      </div>
    </div>
  );
};

export default DownloadableModels;
