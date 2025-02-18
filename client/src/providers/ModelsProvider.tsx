"use client";

import { createContext, useContext, ReactNode } from "react";
import { ModelInfoType, ModelListType } from "@/types/modelType";

const ModelsContext = createContext<ModelListType | null>(null);

export function ModelsProvider({ models, children }: { models: ModelInfoType[]; children: ReactNode }) {
  return <ModelsContext.Provider value={{ models }}>{children}</ModelsContext.Provider>;
}

export function useModels() {
  const context = useContext(ModelsContext);
  if (!context) throw new Error("useModels must be used within ModelsProvider");
  return context;
}
