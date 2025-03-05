import ChatInputContainer from "@/components/chat/ChatInputContainer";
import { UserChatBox, BotChatBox } from "@/app/(layout)/chat/[chatRoomId]/components";
import { getChatRoomMessage } from "@/app/(layout)/chat/[chatRoomId]/actions/getChatRoomMessageAction";

export default async function Page({ params }: { params: Promise<{ chatRoomId: string }> }) {
  const { chatRoomId } = await params;
  const message = await getChatRoomMessage(chatRoomId);
  console.log(message);

  return (
    <div className="flex h-full w-full flex-col">
      <section className="flex w-full flex-1 flex-col items-center justify-start overflow-y-auto">
        <UserChatBox />
        <BotChatBox />
      </section>
      <ChatInputContainer chatRoomId={chatRoomId} />
    </div>
  );
}
