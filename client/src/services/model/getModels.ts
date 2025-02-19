import { ApiError, fetchAndCustomError } from "@/lib/fetchAndCustomError";

const getModels = async () => {
  try {
    return await fetchAndCustomError(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/models`, {
      next: { tags: ["models"] },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return { message: `에러 (${error.status}): ${error.message}` };
    }
    return { message: "알 수 없는 에러가 발생했습니다." };
  }
};

export default getModels;
