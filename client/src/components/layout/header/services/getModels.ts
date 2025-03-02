import { customFetch } from "@/lib/customFetch";
import { ModelInfoArraySchema, ModelInfoType } from "@/types/modelType";

export async function getModels() {
  return customFetch<ModelInfoType[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/models`, ModelInfoArraySchema, {
    next: { tags: ["models"] },
  });
}

export default getModels;
