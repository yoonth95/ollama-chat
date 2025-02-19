import { ApiError, fetchAndCustomError } from "@/lib/fetchAndCustomError";

export default async function postModel(modelData: { name: string; description: string }) {
  try {
    return await fetchAndCustomError(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/models`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modelData),
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return { message: `에러 (${error.status}): ${error.message}` };
    }
    return { message: "알 수 없는 에러가 발생했습니다." };
  }
}
