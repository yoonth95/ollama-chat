import { ApiError, fetchAndCustomError } from "@/lib/fetchAndCustomError";
import { revalidateTagAction } from "@/actions/revalidateTagAction";

export default async function deleteModel(model_name: string) {
  try {
    const response = await fetchAndCustomError(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/model/delete/${model_name}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      },
      true,
    );
    if (response.ok === true) {
      await revalidateTagAction("models");
      return response;
    }
  } catch (error) {
    if (error instanceof ApiError) {
      return { data: null, error: { status: error.status, message: error.message } };
    }
    return { data: null, error: { status: 500, message: "알 수 없는 에러가 발생했습니다." } };
  }
}
