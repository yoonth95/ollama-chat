import { create } from "zustand";
import { ModelInfoType } from "@/types/modelType";

type ModelStoreType = {
  selectedModel: ModelInfoType | null;
  setSelectedModel: (model: ModelInfoType | null) => void;
  models: ModelInfoType[];
  setModels: (models: ModelInfoType[]) => void;
};

export const useModelStore = create<ModelStoreType>((set) => ({
  selectedModel: null,
  setSelectedModel: (model) => set({ selectedModel: model }),
  models: [],
  setModels: (models) => set({ models }),
}));
