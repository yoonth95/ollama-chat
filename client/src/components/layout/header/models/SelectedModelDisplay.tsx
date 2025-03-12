"use client";

import { useModelSelectStore } from "@/stores/useModelSelectStore";

const SelectedModelDisplay = () => {
  const selectedModel = useModelSelectStore((state) => state.selectedModel);

  return <span className="font-medium">{selectedModel ? selectedModel.model : "모델 선택"}</span>;
};

export default SelectedModelDisplay;
