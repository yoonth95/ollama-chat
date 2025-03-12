import { customFetch } from "@/lib/customFetch";
import { ModelInfoArraySchema, ModelInfoType } from "@/types/modelType";

export const getModels = async () => {
  return await customFetch<ModelInfoType[]>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/models`,
    ModelInfoArraySchema,
    {
      cache: "no-store",
    },
  );
};

export default getModels;
