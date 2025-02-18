"use server";

import { revalidateTag } from "next/cache";
import postModel from "@/services/model/postModel";

export async function addModelAction(modelData: { name: string; description: string }) {
  try {
    const result = await postModel(modelData);

    if (result.success) {
      revalidateTag("models");
    }

    return result;
  } catch (error) {
    console.error("모델 추가 중 에러 발생:", error);
    return { success: false, message: "모델 추가 실패" };
  }
}
