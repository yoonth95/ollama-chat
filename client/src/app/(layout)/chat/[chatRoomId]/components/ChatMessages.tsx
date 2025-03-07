import React from "react";
import { UserChatBox, BotChatBox } from "@/app/(layout)/chat/[chatRoomId]/components";
import { getChatRoomMessage } from "@/app/(layout)/chat/[chatRoomId]/actions/getChatRoomMessageAction";

const ChatMessages = async ({ chatRoomId }: { chatRoomId: string }) => {
  // 서버에서 채팅 내역 불러오기
  const message = await getChatRoomMessage(chatRoomId);

  return (
    <section className="flex w-full flex-1 flex-col items-end justify-start overflow-y-auto">
      <UserChatBox content={message} />
      <BotChatBox />
    </section>
  );
};

export default ChatMessages;
