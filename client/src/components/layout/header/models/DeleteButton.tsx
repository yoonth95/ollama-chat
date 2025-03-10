"use client";

import { Button } from "@/components/ui/button";
import { deleteModel } from "@/components/layout/header/services";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const DeleteModelButton = ({ model }: { model: string }) => {
  const handleModelDelete = async (e: React.MouseEvent, model_name: string) => {
    e.stopPropagation();
    const { ok, message } = await deleteModel(model_name);

    if (ok) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <Button
      variant="ghost"
      aria-label="delete-model"
      onClick={(e) => handleModelDelete(e, model)}
      className="h-4 w-4 rounded p-0 hover:bg-neutral-200 dark:hover:bg-transparent"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
};

export default DeleteModelButton;
