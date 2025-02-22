import { create } from "zustand";

export interface DigestWithProgressType {
  model_name: string;
  digest: string | undefined;
  progress: number;
}

interface ModelDownloadState {
  // 각 모델의 다운로드 진행 상태를 추적
  downloads: {
    [key: string]: DigestWithProgressType;
  };

  // 각 모델의 다운로드 pending 상태를 추적
  pendingDownloads: Set<string>;

  // Actions
  startDownload: (modelName: string) => void;
  updateProgress: (progressData: DigestWithProgressType) => void;
  finishOrCancelDownload: (modelName: string) => void;
}

export const useModelDownloadStore = create<ModelDownloadState>((set) => ({
  downloads: {},
  pendingDownloads: new Set(),

  // 다운로드 시작
  startDownload: (modelName) =>
    set((state) => {
      const newPendingDownloads = new Set(state.pendingDownloads);
      newPendingDownloads.add(modelName);

      return {
        pendingDownloads: newPendingDownloads,
        downloads: {
          ...state.downloads,
          [modelName]: {
            model_name: modelName,
            digest: undefined,
            progress: 0,
          },
        },
      };
    }),

  // 다운로드 진행 상태 업데이트
  updateProgress: (progressData) =>
    set((state) => ({
      downloads: {
        ...state.downloads,
        [progressData.model_name]: progressData,
      },
    })),

  // 다운로드 완료 또는 취소
  finishOrCancelDownload: (modelName) =>
    set((state) => {
      const newPendingDownloads = new Set(state.pendingDownloads);
      newPendingDownloads.delete(modelName);

      const newDownloads = { ...state.downloads };
      delete newDownloads[modelName];

      return {
        pendingDownloads: newPendingDownloads,
        downloads: newDownloads,
      };
    }),
}));
