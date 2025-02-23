"use client";

import { Button } from "@/components/ui/button";
import deleteModel from "@/services/model/deleteModel";
import { Trash2 } from "lucide-react";

const DeleteModelButton = ({ model }: { model: string }) => {
  const handleModelDelete = async (e: React.MouseEvent, model_name: string) => {
    e.stopPropagation();
    await deleteModel(model_name);
  };

  return (
    <Button
      variant="ghost"
      onClick={(e) => handleModelDelete(e, model)}
      className="h-4 w-4 rounded hover:bg-neutral-200 dark:hover:bg-transparent"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
};

export default DeleteModelButton;
