"use client"

import React, { useMemo } from "react";
import { isToday, isYesterday, subDays, parseISO, isAfter } from "date-fns";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatRoom from "@/components/layout/sidebar/models/ChatRoom";
import { ChatRoomType } from "@/types/chatRoomType";
import { PanelRightOpen, SquarePen } from "lucide-react";

const Sidebar = ({ chatRooms }: { chatRooms: ChatRoomType[] }) => {
  const groupedChats = useMemo(() => {
    const today: ChatRoomType[] = [];
    const yesterday: ChatRoomType[] = [];
    const lastWeek: ChatRoomType[] = [];
    const older: ChatRoomType[] = [];

    const sevenDaysAgo = subDays(new Date(), 7);

    for (const chat of chatRooms) {
      const chatDate = parseISO(chat.created_at);
      if (isToday(chatDate)) today.push(chat);
      else if (isYesterday(chatDate)) yesterday.push(chat);
      else if (isAfter(chatDate, sevenDaysAgo)) lastWeek.push(chat);
      else older.push(chat);
    }

    return { today, yesterday, lastWeek, older };
  }, [chatRooms]);

  return (
    <div className="w-[260px] bg-secondary">
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4">
          <Button variant="icon" className="h-8 w-8 text-secondary-foreground">
            <PanelRightOpen className="!h-5 !w-5" />
          </Button>
          <Button variant="icon" className="h-8 w-8 text-secondary-foreground">
            <SquarePen className="!h-5 !w-5" />
          </Button>
        </div>
        <ScrollArea className="h-full">
          <div className="space-y-4 h-[calc(100dvh-130px)] overflow-y-auto">
            <div className="px-4">
              <ChatRoom title="오늘" chats={groupedChats.today} />
              <ChatRoom title="어제" chats={groupedChats.yesterday} />
              <ChatRoom title="지난 7일" chats={groupedChats.lastWeek} />
              <ChatRoom title="지난 30일" chats={groupedChats.older} />
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Sidebar;