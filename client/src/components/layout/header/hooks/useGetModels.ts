import { useQuery } from "@tanstack/react-query";
import { getModels } from "@/components/layout/header/services";

export const useGetModels = () => {
  const { data: modelsResponse } = useQuery({
    queryKey: ["models"],
    queryFn: getModels,
    staleTime: 0,
  });

  const models = modelsResponse?.data || [];
  const error = !modelsResponse?.ok
    ? {
        status: modelsResponse?.status || 500,
        message: modelsResponse?.message || "모델 조회 실패",
      }
    : undefined;

  return { models, error };
};
