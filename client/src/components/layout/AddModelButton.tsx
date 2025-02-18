"use client";

import { useTransition } from "react";
import { addModelAction } from "@/app/(main)/_actions/modelActions";
import { Button } from "@/components/ui/button";

export default function AddModelButton({ inputValue }: { inputValue: string }) {
  const [isPending, startTransition] = useTransition();

  const handleAddModel = () => {
    startTransition(async () => {
      await addModelAction({
        name: "New Model",
        description: "This is a new model.",
      });
    });
  };

  return (
    <div>
      <Button
        variant="ghost"
        onClick={handleAddModel}
        disabled={isPending}
        className="w-full justify-start px-3 py-2 text-foreground dark:hover:bg-neutral-700/50"
      >
        Ollama.com에서 &quot;{inputValue}&quot; 가져오기
      </Button>
    </div>
  );
}
