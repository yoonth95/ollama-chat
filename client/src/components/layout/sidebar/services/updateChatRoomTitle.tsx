import { customFetch } from "@/lib/customFetch";

const updateChatRoomTitle = async (chatId: string, newTitle: string) => {
  const bodyData = {
    chat_id: chatId,
    new_title: newTitle,
  };

  return customFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/room/update-room-title`, undefined, {
    method: "POST",
    body: bodyData,
  });
};

export default updateChatRoomTitle;
