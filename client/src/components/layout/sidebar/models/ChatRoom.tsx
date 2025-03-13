"use client";

import { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ContentEditable from "react-contenteditable";
import debounce from "lodash/debounce";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChatRoomMenu } from "@/components/layout/sidebar/models";
import { cn } from "@/lib/utils";
import { ChatRoomType } from "@/types/chatRoomType";
import { MoreHorizontal } from "lucide-react";

const ChatRoom = ({ title, chats }: { title: string; chats: ChatRoomType[] }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [openedRoom, setOpenedRoom] = useState<string | null>(null);
  const [editingRoom, setEditingRoom] = useState<string | null>(null);
  const editableRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  if (chats.length === 0) return null;

  const handleChatClick = (chatId: string, e: React.MouseEvent) => {
    if (editingRoom === chatId) {
      e.preventDefault();
      return;
    }

    router.push(`/chat/${chatId}`);
  };

  const handleNameChange = debounce(async (chatId: string, newTitle: string) => {
    console.log(chatId, newTitle);
    // try {
    //   const { ok, message } = await updateChatRoomTitle(chatId, newTitle);
    //   if (ok) {
    //     toast.success("채팅방 이름이 변경되었습니다.");
    //     revalidateTagAction("rooms");
    //   } else {
    //     toast.error(message || "이름 변경 실패");
    //   }
    // } catch (error) {
    //   toast.error("이름 변경 중 오류가 발생했습니다.");
    // }
  }, 500);

  const handleKeyDown = (chatId: string, e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const content = editableRefs.current[chatId]?.innerHTML || "";
      handleNameChange(chatId, content);
      setEditingRoom(null);

      if (editableRefs.current[chatId]) {
        editableRefs.current[chatId]?.blur();
      }
    }
  };

  return (
    <div className="mb-8">
      <h2 className="sticky top-0 z-10 mb-2 bg-secondary px-2 py-1 text-sm font-bold transition-colors">{title}</h2>
      <ul className="space-y-1">
        {chats.map((chat) => {
          const isEnterRoom = chat.id && pathname.includes(chat.id);
          const isActive = openedRoom === chat.id || (hoveredRoom === chat.id && !openedRoom) || isEnterRoom;
          const isEditing = editingRoom === chat.id;

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
              <div
                className={cn(`block flex-1 cursor-pointer truncate rounded-md p-2 text-sm`)}
                onClick={(e) => handleChatClick(chat.id, e)}
              >
                <ContentEditable
                  innerRef={(el: HTMLElement | null) => (editableRefs.current[chat.id] = el)}
                  html={chat.title}
                  disabled={!isEditing}
                  onChange={() => {}} // We handle changes on blur and Enter key
                  onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => handleKeyDown(chat.id, e)}
                  onBlur={(e: React.FocusEvent<HTMLElement>) => {
                    if (isEditing) {
                      const content = e.currentTarget.innerHTML;
                      handleNameChange(chat.id, content);
                      setEditingRoom(null);
                    }
                  }}
                  className={cn(
                    "outline-none focus:outline-none",
                    isEditing ? "border-b border-dashed border-primary px-1" : "",
                  )}
                />
              </div>

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

                <ChatRoomMenu
                  roomId={chat.id}
                  onRename={() => {
                    setEditingRoom(chat.id);
                    // Set a timeout to focus the element after the state update
                    setTimeout(() => {
                      if (editableRefs.current[chat.id]) {
                        editableRefs.current[chat.id]?.focus();
                        // Move cursor to end
                        const selection = window.getSelection();
                        const range = document.createRange();
                        if (selection && editableRefs.current[chat.id]?.firstChild) {
                          range.setStart(
                            editableRefs.current[chat.id]?.firstChild as Node,
                            (editableRefs.current[chat.id]?.textContent || "").length,
                          );
                          range.collapse(true);
                          selection.removeAllRanges();
                          selection.addRange(range);
                        }
                      }
                    }, 10);
                  }}
                />
              </DropdownMenu>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatRoom;
