"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { isToday, isYesterday, subDays, parseISO, isAfter } from "date-fns";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChatRoom } from "@/components/layout/sidebar/models";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { ChatRoomType } from "@/types/chatRoomType";
import { PanelRightOpen, SquarePen } from "lucide-react";

const Sidebar = ({ chatRooms }: { chatRooms: ChatRoomType[] }) => {
  const { isOpen, toggleSidebar } = useSidebarStore();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();

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

  const SidebarContent = (
    <div className="flex h-full w-[260px] flex-col bg-secondary">
      <div className="flex items-center justify-between p-4">
        <Button variant="icon" className="h-8 w-8 text-secondary-foreground" onClick={toggleSidebar}>
          <PanelRightOpen className="!h-5 !w-5" />
        </Button>
        <Button variant="icon" className="h-8 w-8 text-secondary-foreground" onClick={() => router.push("/")}>
          <SquarePen className="!h-5 !w-5" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="h-[calc(100dvh-130px)] space-y-4 overflow-y-auto px-4">
          <ChatRoom title="오늘" chats={groupedChats.today} />
          <ChatRoom title="어제" chats={groupedChats.yesterday} />
          <ChatRoom title="지난 7일" chats={groupedChats.lastWeek} />
          <ChatRoom title="지난 30일" chats={groupedChats.older} />
        </div>
      </ScrollArea>
    </div>
  );

  return isMobile ? (
    <Sheet open={isOpen} onOpenChange={toggleSidebar}>
      <SheetTrigger asChild>
        <Button variant="icon" className="fixed left-4 top-4 z-50">
          <PanelRightOpen className="!h-5 !w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        {SidebarContent}
      </SheetContent>
    </Sheet>
  ) : (
    <aside className={`transition-all ${isOpen ? "w-[260px]" : "w-0"}`}>{isOpen && SidebarContent}</aside>
  );
};

export default Sidebar;
