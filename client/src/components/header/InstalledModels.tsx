"use client";

import React from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ModelInfoType } from "@/types/modelType";
import { Check } from "lucide-react";

interface InstalledModelsProps {
  availableModels: ModelInfoType[];
  selectedModel: ModelInfoType | null;
  onSelect: (modelName: string) => void;
}

const InstalledModels = ({ availableModels, selectedModel, onSelect }: InstalledModelsProps) => {
  return (
    <div className="space-y-2">
      <h4 className="mt-2 text-sm font-medium text-muted-foreground">설치된 모델</h4>
      <div className="space-y-1">
        {availableModels.length > 0 ? (
          <>
            {availableModels.map((model) => (
              <DropdownMenuItem
                key={model.name}
                onSelect={() => onSelect(model.name)}
                className="w-full cursor-pointer justify-between px-4 py-2 font-normal text-foreground dark:hover:bg-neutral-700/50"
              >
                {model.name}
                {selectedModel?.name === model.name && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </>
        ) : (
          <div className="px-3 py-2 text-sm text-muted-foreground">모델 없음</div>
        )}
      </div>
    </div>
  );
};

export default InstalledModels;
