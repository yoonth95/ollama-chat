"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChatRoomMenu } from "@/components/layout/sidebar/models";
import { cn } from "@/lib/utils";
import { ChatRoomType } from "@/types/chatRoomType";
import { MoreHorizontal } from "lucide-react";

const ChatRoom = ({ title, chats }: { title: string; chats: ChatRoomType[] }) => {
  const pathname = usePathname();
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [openedRoom, setOpenedRoom] = useState<string | null>(null);

  if (chats.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="sticky top-0 z-10 mb-2 bg-secondary px-2 py-1 text-sm font-bold transition-colors">{title}</h2>
      <ul className="space-y-1">
        {chats.map((chat) => {
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
              <Link
                href={`/chat/${chat.id}`}
                className={cn(`block flex-1 cursor-pointer truncate rounded-md p-2 text-sm`)}
              >
                {chat.title}
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

                <ChatRoomMenu roomId={chat.id} />
              </DropdownMenu>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatRoom;
