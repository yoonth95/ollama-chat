import { DigestWithProgressType, useModelDownloadStore } from "@/store/useModelDownloadStore";

export const useModelDownload = (modelName: string) => {
  const { pendingDownloads, downloads, startDownload, updateProgress, finishOrCancelDownload } =
    useModelDownloadStore();

  return {
    isPending: pendingDownloads.has(modelName),
    downloadProgress: downloads[modelName],
    startDownload: () => startDownload(modelName),
    updateProgress: (progress: DigestWithProgressType) => updateProgress(progress),
    finishOrCancelDownload: () => finishOrCancelDownload(modelName),
  };
};
