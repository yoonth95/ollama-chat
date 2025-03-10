"use server";

import { cookies } from "next/headers";
import createChatRoom from "@/app/(layout)/(home)/services/createChatRoom";
import { fetchTimeout } from "@/utils/fetchTimeoutUtil";

// 질문 전송
export const sendMessageAction = async (_prevState: unknown, queryData: FormData) => {
  const text = queryData.get("message") as string;
  const model = queryData.get("model") as string;
  const roomId = queryData.get("roomId") as string;

  // 새 채팅 시작
  if (roomId === "") {
    // 채팅방 생성 API
    const response = await fetchTimeout(createChatRoom({ message: text, model }), 1000);
    const { ok, data, message, status } = response;

    if (ok && data) {
      const cookiesStore = await cookies();
      cookiesStore.set(`chat_${data.id}`, encodeURIComponent(text), { maxAge: 60 });
    }
    return { ok, data, message, status };
  }

  // 질문 전송 API
  else {
  }
};
