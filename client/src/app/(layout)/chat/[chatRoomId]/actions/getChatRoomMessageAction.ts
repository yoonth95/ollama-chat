"use server";

import { cookies } from "next/headers";

// 질문 가져오기
export const getChatRoomMessage = async (chatRoomId: string) => {
  const cookiesStore = await cookies();
  const message = decodeURIComponent(cookiesStore.get(`chat_${chatRoomId}`)?.value as string);

  if (message) {
    // await createChatRoom(chatRoomId);
    // await saveMessage(chatRoomId, "user", message);

    // 쿠키에서 질문 삭제
    // cookiesStore.set(`chat_${chatRoomId}`, "", { maxAge: 0 });
  }

  return message;
};