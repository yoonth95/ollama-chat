import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ModelInfoType } from "@/types/modelType";

type ModelStoreType = {
  selectedModel: ModelInfoType | null;
  setSelectedModel: (model: ModelInfoType | null) => void;
  models: ModelInfoType[];
  setModels: (models: ModelInfoType[]) => void;
};

export const useModelStore = create<ModelStoreType>()(
  persist(
    (set) => ({
      selectedModel: null,
      setSelectedModel: (model) => set({ selectedModel: model }),
      models: [],
      setModels: (models) => set({ models }),
    }),
    {
      name: "model-storage", // 로컬스토리지 키 이름
      partialize: (state) => ({ selectedModel: state.selectedModel }),
    },
  ),
);
