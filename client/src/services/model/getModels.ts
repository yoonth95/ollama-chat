import { ApiError, fetchAndCustomError } from "@/lib/fetchAndCustomError";

const getModels = async () => {
  try {
    const data = await fetchAndCustomError(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/models`, {
      next: { tags: ["models"] },
    });
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      return { data: [], error: { status: error.status, message: error.message } };
    }
    return { data: [], error: { status: 500, message: "알 수 없는 에러가 발생했습니다." } };
  }
};

export default getModels;
