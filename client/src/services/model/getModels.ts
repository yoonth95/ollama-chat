const getModels = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/models`, {
      next: { tags: ["models"] },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`모델 조회 오류: ${response.status}`);
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: "An unknown error occurred" };
    }
  }
};

export default getModels;
