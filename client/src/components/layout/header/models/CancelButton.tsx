"use client";

import { useModelDownloadStore } from "@/components/layout/header/stores/useModelDownloadStore";
import { cancelModel } from "@/components/layout/header/services";
import { X } from "lucide-react";

const CancelModelButton = ({ model_name }: { model_name: string }) => {
  const { finishOrCancelDownload } = useModelDownloadStore();

  const handleModelDownloadCancel = async (model_name: string) => {
    const response = await cancelModel({ model_name });
    const { ok } = response;

    if (!ok) finishOrCancelDownload(model_name);
  };

  return (
    <X
      className="h-4 w-4 cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        handleModelDownloadCancel(model_name);
      }}
    />
  );
};

export default CancelModelButton;
