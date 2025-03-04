"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import createChatRoom from "@/app/(layout)/(home)/services/createChatRoom";

// 질문 전송
export const sendMessageAction = async (_prevState: unknown, queryData: FormData) => {
  const text = queryData.get("message") as string;
  const model = queryData.get("model") as string;

  const response = await createChatRoom({ message: text, model });
  const { ok, data, message, status } = response;

  if (ok && data) {
    const cookiesStore = await cookies();
    cookiesStore.set(`chat_${data.id}`, encodeURIComponent(text), { maxAge: 60 });
    redirect(`/chat/${data.id}`);
  }
  return { ok, data, message, status };
};
