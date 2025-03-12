import { DigestWithProgressType } from "@/components/layout/header/stores/useModelDownloadStore";

interface DownloadModelPropsType {
  modelName: string;
  updateProgress: (progress: DigestWithProgressType) => void;
}
const downloadModel = async ({ modelName, updateProgress }: DownloadModelPropsType) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/model/download?model_name=${encodeURIComponent(modelName)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { ok: false, message: errorData.message || "다운로드 요청 실패" };
    }

    const reader = response.body?.getReader();
    if (!reader) {
      return { ok: false, message: "서버 응답이 올바르지 않습니다." };
    }

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

          if (status === "cancelled") {
            return { ok: true, message: "모델 다운로드가 완료되었습니다.", detail: "cancel" };
          }

          if (status === "success") {
            return { ok: true, message: "모델 다운로드가 완료되었습니다." };
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "JSON 파싱 오류";
          return { ok: false, message: errorMessage };
        }
      }
    }

    // 모든 데이터를 읽었지만 `success` 상태를 받지 못한 경우
    console.log("여기333333333333333333333333333");
    return { ok: false, message: "다운로드가 예상치 못한 상태로 종료되었습니다." };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
    return { ok: false, message: errorMessage };
  }
};
export default downloadModel;
