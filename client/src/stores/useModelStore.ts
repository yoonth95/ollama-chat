import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ModelErrorType, ModelInfoType } from "@/types/modelType";

type ModelStoreType = {
  selectedModel: ModelInfoType | null;
  setSelectedModel: (model: ModelInfoType | null) => void;
  models: ModelInfoType[];
  setModels: (models: ModelInfoType[]) => void;
  error?: ModelErrorType;
  setError: (error?: ModelErrorType) => void;
  validateSelectedModel: () => void; // 모델 유효성 검증 함수 추가
};

export const useModelStore = create<ModelStoreType>()(
  persist(
    (set, get) => ({
      selectedModel: null,
      setSelectedModel: (model) => set({ selectedModel: model }),
      models: [],
      setModels: (models) => {
        set({ models });
        get().validateSelectedModel(); // 모델 목록이 변경될 때마다 선택된 모델 유효성 검증
      },
      error: undefined,
      setError: (error) => set({ error }),
      validateSelectedModel: () => {
        const { selectedModel, models } = get();
        if (!selectedModel) return;

        const modelExists = models.some((model) => model.model === selectedModel.model);
        if (!modelExists) {
          set({ selectedModel: null });
        }
      },
    }),
    {
      name: "model-storage",
      partialize: (state) => ({ selectedModel: state.selectedModel }),
    },
  ),
);
