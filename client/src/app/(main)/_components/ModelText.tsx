"use client";

import { useModelStore } from "@/components/layout/header/stores/useModelStore";

const ModelText = () => {
  const { selectedModel } = useModelStore();

  return <h1 className="text-4xl font-medium text-foreground">{selectedModel?.model || "무엇을 도와드릴까요?"}</h1>;
};

export default ModelText;
