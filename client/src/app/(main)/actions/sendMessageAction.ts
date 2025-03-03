"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import createChatRoom from "@/app/(main)/services/createChatRoom";

// 질문 전송
export const sendMessageAction = async (_prevState: unknown, queryData: FormData) => {
  const message = queryData.get("message") as string;
  const model = queryData.get("model") as string;

  const response = await createChatRoom({ message, model });
  const { ok, data } = response;

  if (ok && data) {
    const cookiesStore = await cookies();
    cookiesStore.set(`chat_${data.id}`, encodeURIComponent(message), { maxAge: 60 });
    redirect(`/chat/${data.id}`);
  }
  return;
};

// 질문 가져오기
export const getChatRoomMessage = async (chatRoomId: string) => {
  const cookiesStore = await cookies();
  const message = decodeURIComponent(cookiesStore.get(`chat_${chatRoomId}`)?.value as string);

  if (message) {
    // await createChatRoom(chatRoomId);
    // await saveMessage(chatRoomId, "user", message);

    // 쿠키에서 질문 삭제
    cookiesStore.set(`chat_${chatRoomId}`, "", { maxAge: 0 });
  }

  return message;
};
