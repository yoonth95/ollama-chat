"use client";

import { ChatRoomItem } from "@/components/layout/sidebar/models";
import { ChatRoomType } from "@/types/chatRoomType";

const ChatRoom = ({ title, chats }: { title: string; chats: ChatRoomType[] }) => {
  if (chats.length === 0) return null;

  return (
    <div className="mb-8 w-full">
      <h2 className="sticky top-0 z-10 mb-2 w-full bg-secondary px-2 py-1 text-sm font-bold transition-colors">
        {title}
      </h2>
      <ul className="w-full space-y-1">
        {chats.map((chat) => (
          <ChatRoomItem key={chat.id} chat={chat} />
        ))}
      </ul>
    </div>
  );
};

export default ChatRoom;
