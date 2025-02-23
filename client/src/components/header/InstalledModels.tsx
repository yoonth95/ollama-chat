"use client";

import React from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DeleteModelButton } from "@/components/header";
import { useModels } from "@/providers/ModelsProvider";
import { useModelStore } from "@/store/useModelStore";
import { Check } from "lucide-react";

const InstalledModels = () => {
  const { models } = useModels(); // 설치된 모델
  const { selectedModel, setSelectedModel } = useModelStore(); // 선택한 모델

  const handleModelChange = (modelName: string) => {
    setSelectedModel(models.find((m) => m.model === modelName) || null);
  };

  return (
    <div className="space-y-2">
      <h4 className="mt-2 text-sm font-medium text-muted-foreground">설치된 모델</h4>
      <div className="space-y-1">
        {models.length > 0 ? (
          <>
            {models.map((model) => (
              <DropdownMenuItem
                key={model.model}
                onSelect={() => handleModelChange(model.model)}
                className="w-full cursor-pointer justify-between gap-4 px-4 py-3 font-normal text-foreground dark:hover:bg-neutral-700/50"
              >
                <DeleteModelButton model={model.model} />
                <span className="flex-grow text-left">{model.model}</span>
                {selectedModel?.model === model.model && <Check className="h-4 w-4" />}
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
