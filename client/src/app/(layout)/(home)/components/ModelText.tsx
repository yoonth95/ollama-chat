"use client";

import { useModelSelectStore } from "@/stores/useModelSelectStore";

const ModelText = () => {
  const selectedModel = useModelSelectStore((state) => state.selectedModel);

  return <h1 className="text-4xl font-medium text-foreground">{selectedModel?.model || "무엇을 도와드릴까요?"}</h1>;
};

export default ModelText;
