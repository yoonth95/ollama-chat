"use client";

import { UserChatBox, BotChatBox } from "@/app/(layout)/chat/[chatRoomId]/components";
import { ModelText } from "@/app/(layout)/(home)/components";
import { useSendMessageStore } from "@/stores/useSendMesaage";

const ChatLayout = () => {
  const { isSendMessage, chatMessage } = useSendMessageStore();

  const content = chatMessage?.content ?? "";

  return (
    <>
      {isSendMessage ? (
        <>
          <section className="flex w-full flex-1 flex-col items-end justify-start overflow-y-auto md:px-5 lg:px-4 xl:px-5">
            <UserChatBox content={content} />
            <BotChatBox />
          </section>
        </>
      ) : (
        <section className="mb-6">
          <ModelText />
        </section>
      )}
    </>
  );
};

export default ChatLayout;
