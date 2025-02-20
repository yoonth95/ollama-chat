"use client";

import { createContext, useContext, ReactNode } from "react";
import { ModelInfoType } from "@/types/modelType";

interface ModelErrorType {
  status: number;
  message: string;
}
interface ModelListType {
  models: ModelInfoType[];
  error?: ModelErrorType;
}

const ModelsContext = createContext<ModelListType | null>(null);

export function ModelsProvider({
  models,
  error,
  children,
}: {
  models: ModelInfoType[];
  error?: ModelErrorType;
  children: ReactNode;
}) {
  return <ModelsContext.Provider value={{ models, error }}>{children}</ModelsContext.Provider>;
}

export function useModels() {
  const context = useContext(ModelsContext);
  if (!context) throw new Error("useModels must be used within ModelsProvider");
  return context;
}
