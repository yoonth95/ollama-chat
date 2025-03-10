"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatRoom } from "@/components/layout/sidebar/models";
import { useChatRooms, useGroupedChats } from "@/components/layout/sidebar/hooks";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { LoaderCircle, PanelRightOpen, SquarePen } from "lucide-react";

const SidebarContent = () => {
  const router = useRouter();
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useChatRooms();
  const { toggleSidebar } = useSidebarStore();

  useEffect(() => {
    console.log("inView", inView);
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const chatRooms = useMemo(() => {
    if (!data || !data.pages) return [];

    return data.pages.flatMap((page) => {
      if (!page || !Array.isArray(page)) return [];
      return page;
    });
  }, [data]);

  const groupedChats = useGroupedChats(chatRooms);

  if (status === "pending" && !data) {
    return (
      <div className="flex h-full w-[260px] flex-col items-center justify-center bg-secondary">
        <LoaderCircle className="h-4 w-4 animate-spin" />
      </div>
    );
  }

  return (
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
          {(hasNextPage || isFetchingNextPage) && (
            <div ref={ref} className="flex justify-center py-2 text-sm text-muted-foreground">
              {isFetchingNextPage && <LoaderCircle className="h-4 w-4 animate-spin" />}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SidebarContent;
