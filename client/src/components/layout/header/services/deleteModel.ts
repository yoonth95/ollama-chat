import { revalidateTagAction } from "@/actions/revalidateTagAction";
import { customFetch } from "@/lib/customFetch";

export default async function deleteModel(model_name: string) {
  const response = await customFetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/model/delete/${model_name}`,
    undefined,
    {
      method: "DELETE",
      isToast: true,
    },
  );

  if (response.ok === true) {
    await revalidateTagAction("models");
  }

  return response;
}
