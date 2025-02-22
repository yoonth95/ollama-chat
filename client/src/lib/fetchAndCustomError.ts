import { toast } from "react-toastify";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

export const fetchAndCustomError = async (url: string, options?: RequestInit, isToast?: boolean) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(response.status, data.message || "API 요청 오류 발생");
    }

    if (isToast) toast.success(data.message || "요청이 성공적으로 처리되었습니다.");
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      toast.error(error.message);
      throw error;
    }

    toast.error("서버 오류가 발생했습니다.");
    throw new ApiError(500, "서버 오류가 발생했습니다.");
  }
};
