import { customFetch } from "@/lib/customFetch";

export default async function cancelModel(modelData: { model_name: string }) {
  return customFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/model/download-cancel`, undefined, {
    method: "POST",
    body: modelData,
    isToast: true,
  });
}
