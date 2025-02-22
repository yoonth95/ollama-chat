"use client";

import { fetchAndCustomError } from "@/lib/fetchAndCustomError";
import { useModelDownloadStore } from "@/store/useModelDownloadStore";
import { X } from "lucide-react";

const CancelModelButton = ({ model_name }: { model_name: string }) => {
  const { finishOrCancelDownload } = useModelDownloadStore();

  const handleModelDownloadCancel = async (model_name: string) => {
    try {
      await fetchAndCustomError(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/model/download-cancel`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model_name }),
        },
        true,
      );
      finishOrCancelDownload(model_name);
    } catch (error) {
      console.error(error);
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
