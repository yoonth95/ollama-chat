"use client";

import { DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";
import { SubMenuItem } from "@/components/layout/header/models";
import { useModelStore } from "@/components/layout/header/stores/useModelStore";
import { ModelInfoType } from "@/types/modelType";
import modelData from "@/data/modelData.json";

interface ModelList {
  [key: string]: ModelInfoType[];
}
const DownloadableModels = () => {
  const { models: availableModels = [] } = useModelStore();
  const availableModelNames = availableModels.map((m) => m.model);

  // 다운로드 가능한 모델 필터링
  const filterModels = (): ModelList => {
    const filtered: ModelList = {};
    Object.entries(modelData).forEach(([category, models]) => {
      const available = models.filter((model) => !availableModelNames.includes(model.model));
      if (available.length > 0) filtered[category] = available;
    });
    return filtered;
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-muted-foreground">설치 가능한 모델</h4>
      <div className="space-y-1">
        {Object.entries(filterModels()).map(([category, models]) => (
          <DropdownMenuSub key={category}>
            <DropdownMenuSubTrigger className="text-foregroun focus:text-foregroun px-4 py-2 dark:hover:bg-neutral-700/50">
              <span>{category}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="text-foregroun border-zinc-700 bg-zinc-900">
              {models.map((model) => (
                <SubMenuItem key={model.model} model={model} />
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ))}
      </div>
    </div>
  );
};

export default DownloadableModels;
