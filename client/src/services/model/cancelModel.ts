import { ApiError, fetchAndCustomError } from "@/lib/fetchAndCustomError";

export default async function cancelModel(modelData: { model_name: string }) {
  try {
    return await fetchAndCustomError(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/model/download-cancel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modelData),
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return { data: null, error: { status: error.status, message: error.message } };
    }
    return { data: null, error: { status: 500, message: "알 수 없는 에러가 발생했습니다." } };
  }
}
