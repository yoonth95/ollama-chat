"use client";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { CancelModelButton } from "@/components/layout/header/models";
import { useModelDownload } from "@/components/layout/header/hooks/useModelDownload";
import { downloadModel } from "@/components/layout/header/services";
import { ModelInfoType } from "@/types/modelType";
import { ArrowDownToLine, LoaderCircle } from "lucide-react";

interface SubMenuItemButtonProps {
  model: ModelInfoType;
}
const SubMenuItem = ({ model }: SubMenuItemButtonProps) => {
  const modelName = model.model;
  const queryClient = useQueryClient();

  const { isPending, downloadProgress, startDownload, updateProgress, finishOrCancelDownload } =
    useModelDownload(modelName);

  const handleDownload = async () => {
    startDownload();
    try {
      const { ok, message, detail } = await downloadModel({ modelName, updateProgress });

      if (detail !== "cancel") {
        if (ok) {
          queryClient.invalidateQueries({ queryKey: ["models"] });
          toast.success(message);
        } else {
          toast.error(message);
        }
      }
    } finally {
      finishOrCancelDownload();
    }
  };

  return (
    <div className="flex items-center justify-between px-1">
      <Button
        variant="ghost"
        aria-label="download-model"
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
