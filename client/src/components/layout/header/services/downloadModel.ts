import { ApiError } from "@/lib/fetchAndCustomError";
import { revalidateTagAction } from "@/actions/revalidateTagAction";
import { toast } from "react-toastify";
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
      const result = await response.json();
      throw new ApiError(response.status, result.message || "API 요청 오류 발생");
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
            await revalidateTagAction("models");
            if (resetInput) resetInput();
            toast.success("모델 다운로드가 완료되었습니다.");
            finishOrCancelDownload(model_name);
          }
        } catch (error) {
          console.error("JSON 파싱 오류", error);
          finishOrCancelDownload(model_name);
          break;
        }
      }
    }

    console.log(model_name, "다운로드 완료!");
  } catch (error) {
    if (error instanceof ApiError) {
      toast.error(error.message);
      finishOrCancelDownload(model_name);
      return { data: null, error: { status: error.status, message: error.message } };
    }
    return { data: null, error: { status: 500, message: "알 수 없는 에러가 발생했습니다." } };
  }
}
