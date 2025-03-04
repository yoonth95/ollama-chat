"use client";

import { useModelDownloadStore } from "@/components/layout/header/stores/useModelDownloadStore";
import { cancelModel } from "@/components/layout/header/services";
import { X } from "lucide-react";
import { toast } from "react-toastify";

const CancelModelButton = ({ model_name }: { model_name: string }) => {
  const { finishOrCancelDownload } = useModelDownloadStore();

  const handleModelDownloadCancel = async (model_name: string) => {
    const { ok, message } = await cancelModel({ model_name });

    if (ok) {
      toast.success(message);
    } else {
      toast.error(message);
      finishOrCancelDownload(model_name);
    }
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
