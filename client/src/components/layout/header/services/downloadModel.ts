import { toast } from "react-toastify";
import { revalidateTagAction } from "@/actions/revalidateTagAction";
import { DigestWithProgressType } from "@/components/layout/header/stores/useModelDownloadStore";

export default async function downloadModel(
  model_name: string,
  updateProgress: (progress: DigestWithProgressType) => void,
  finishOrCancelDownload: (model_name: string) => void,
  resetInput?: () => void,
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/model/download?model_name=${encodeURIComponent(model_name)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      finishOrCancelDownload(model_name);
      revalidateTagAction("models");
      toast.error(errorData.message || "다운로드 요청 실패");
      return;
    }

    const reader = response.body?.getReader();
    if (!reader) return;

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const data = JSON.parse(line);
          const { model_name, digest, progress, status } = data.data;

          if (progress !== undefined) {
            const digestValue = digest !== undefined ? digest : "";
            updateProgress({
              model_name,
              digest: digestValue,
              progress,
            });
          }

          if (status === "success") {
            finishOrCancelDownload(model_name);
            await revalidateTagAction("models");
            if (resetInput) resetInput();
            toast.success("모델 다운로드가 완료되었습니다.");
          }
        } catch (error) {
          finishOrCancelDownload(model_name);
          const errorMessage = error instanceof Error ? error.message : "JSON 파싱 오류";
          toast.error(errorMessage);
          break;
        }
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
    console.log(errorMessage);
    finishOrCancelDownload(model_name);
  }
}
