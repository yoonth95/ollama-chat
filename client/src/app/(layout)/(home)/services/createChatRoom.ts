import { customFetch } from "@/lib/customFetch";
import { ChatRoomSchema, ChatRoomType, CreateChatRoomRequestType } from "@/app/(layout)/(home)/types/ChatRoomType";

export default async function createChatRoom(chatData: { message: string; model: string }) {
  return customFetch<ChatRoomType, CreateChatRoomRequestType>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/chat/create-room`,
    ChatRoomSchema,
    {
      method: "POST",
      body: chatData,
    },
  );
}
