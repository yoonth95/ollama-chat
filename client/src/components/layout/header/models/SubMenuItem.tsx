"use client";

import { Button } from "@/components/ui/button";
import { CancelModelButton } from "@/components/layout/header/models";
import { useModelDownload } from "@/components/layout/header/hooks/useModelDownload";
import downloadModel from "@/components/layout/header/services/downloadModel";
import { ModelInfoType } from "@/types/modelType";
import { ArrowDownToLine, LoaderCircle } from "lucide-react";

interface SubMenuItemButtonProps {
  model: ModelInfoType;
}
const SubMenuItem = ({ model }: SubMenuItemButtonProps) => {
  const { isPending, downloadProgress, startDownload, updateProgress, finishOrCancelDownload } = useModelDownload(
    model.model,
  );

  const handleDownload = async () => {
    startDownload();
    await downloadModel(model.model, updateProgress, finishOrCancelDownload);
  };

  return (
    <div className="flex items-center justify-between px-1">
      <Button
        variant="ghost"
        disabled={isPending}
        onClick={handleDownload}
        className="text-foregroun focus:text-foregroun flex h-[55px] cursor-pointer items-center justify-between gap-3 dark:hover:bg-neutral-700/50"
      >
        <div className="flex w-[200px] flex-col items-start">
          <span className="font-medium">{model.model}</span>
          <span className="text-xs text-zinc-400">
            Parameters: {model.parameter_size} | size: {model.size}
          </span>
        </div>
        {isPending && downloadProgress?.model_name === model.model ? (
          <div className="flex items-center gap-3">
            <LoaderCircle className="h-4 w-4 animate-spin" />
            <span className="w-10 text-xs font-medium">{downloadProgress?.progress}%</span>
          </div>
        ) : (
          <ArrowDownToLine className="h-4 w-4" />
        )}
      </Button>
      {isPending && downloadProgress?.model_name === model.model && (
        <div className="pr-3">
          <CancelModelButton model_name={downloadProgress?.model_name} />
        </div>
      )}
    </div>
  );
};

export default SubMenuItem;
