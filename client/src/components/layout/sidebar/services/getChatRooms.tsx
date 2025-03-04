import { customFetch } from "@/lib/customFetch";
import { ChatRoomArraySchema, ChatRoomType } from "@/types/chatRoomType";

const getChatRooms = async () => {
  return customFetch<ChatRoomType[]>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/chat/get-rooms`,
    ChatRoomArraySchema,
    { next: { tags: ["rooms"] } },
  );
};

export default getChatRooms;
