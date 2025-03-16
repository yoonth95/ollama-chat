"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChatRoomItemMenu } from "@/components/layout/sidebar/models";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";

interface ChatRoomType {
  id: string;
  title: string;
}

interface ChatRoomItemPropsType {
  chat: ChatRoomType;
}

const ChatRoomItem = ({ chat }: ChatRoomItemPropsType) => {
  const pathname = usePathname();
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [openedRoom, setOpenedRoom] = useState<string | null>(null);
  const [roomTitle, setRoomTitle] = useState(chat.title);

  const isEnterRoom = chat.id && pathname.includes(chat.id);
  const isActive = openedRoom === chat.id || (hoveredRoom === chat.id && !openedRoom) || isEnterRoom;

  return (
    <li
      key={chat.id}
      className={cn(
        `group relative flex w-full justify-between rounded-md transition-colors ${isActive ? "bg-neutral-700/50" : ""}`,
        "dark:hover:bg-neutral-700/50",
      )}
      onMouseEnter={() => setHoveredRoom(chat.id)}
      onMouseLeave={() => {
        if (!openedRoom) setHoveredRoom(null);
      }}
    >
      <Link href={`/chat/${chat.id}`} className={cn(`block flex-1 cursor-pointer truncate rounded-md p-2 text-sm`)}>
        {roomTitle}
      </Link>

      <DropdownMenu
        onOpenChange={(open) => {
          if (open) {
            setOpenedRoom(chat.id);
          } else {
            setOpenedRoom(null);
            setHoveredRoom(null);
          }
        }}
      >
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            aria-label="sub-menu-button"
            className={cn(
              `absolute right-2 top-1/2 -translate-y-1/2 transform p-2 opacity-0 transition-opacity group-hover:opacity-100 dark:ring-offset-transparent dark:hover:bg-transparent dark:focus-visible:ring-0 dark:focus-visible:ring-transparent ${isActive ? "opacity-100" : ""}`,
            )}
          >
            <MoreHorizontal size={18} />
          </Button>
        </DropdownMenuTrigger>

        <ChatRoomItemMenu
          roomId={chat.id}
          roomTitle={roomTitle}
          setRoomTitle={setRoomTitle}
          setHoveredRoom={setHoveredRoom}
        />
      </DropdownMenu>
    </li>
  );
};

export default ChatRoomItem;
