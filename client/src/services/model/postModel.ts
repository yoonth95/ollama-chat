export default async function postModel(modelData: { name: string; description: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/models`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modelData),
  });

  if (!res.ok) {
    return { success: false, message: "API 요청 실패" };
  }

  return { success: true, message: "모델 추가 성공" };
}
