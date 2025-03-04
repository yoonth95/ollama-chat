import { revalidateTagAction } from "@/actions/revalidateTagAction";
import { customFetch } from "@/lib/customFetch";

const deleteChatRoom = async (room_id: string) => {
  const response = await customFetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/chat/delete-room/${room_id}`,
    undefined,
    { method: "DELETE" },
  );

  if (response.ok === true) {
    await revalidateTagAction("rooms");
  }

  return response;
};

export default deleteChatRoom;
