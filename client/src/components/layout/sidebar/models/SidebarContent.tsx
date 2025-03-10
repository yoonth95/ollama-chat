"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatRoom, ChatRoomSkeleton } from "@/components/layout/sidebar/models";
import { useChatRooms, useGroupedChats } from "@/components/layout/sidebar/hooks";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { LoaderCircle, PanelRightOpen, SquarePen } from "lucide-react";

const SidebarContent = () => {
  const router = useRouter();
  const { ref, inView } = useInView();
  const { data: chatRooms, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useChatRooms();
  const { toggleSidebar } = useSidebarStore();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const groupedChats = useGroupedChats(chatRooms);

  return (
    <div className="flex h-full w-[260px] flex-col bg-secondary">
      <div className="flex items-center justify-between p-4">
        <Button
          variant="icon"
          aria-label="on-off-sidebar"
          className="h-8 w-8 text-secondary-foreground"
          onClick={toggleSidebar}
        >
          <PanelRightOpen className="!h-5 !w-5" />
        </Button>
        <Button
          variant="icon"
          aria-label="new-post"
          className="h-8 w-8 text-secondary-foreground"
          onClick={() => router.push("/")}
        >
          <SquarePen className="!h-5 !w-5" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="h-[calc(100dvh-130px)] space-y-4 overflow-y-auto px-4">
          {isLoading ? (
            <ChatRoomSkeleton />
          ) : (
            <>
              <ChatRoom title="오늘" chats={groupedChats.today} />
              <ChatRoom title="어제" chats={groupedChats.yesterday} />
              <ChatRoom title="지난 7일" chats={groupedChats.lastWeek} />
              <ChatRoom title="지난 30일" chats={groupedChats.older} />
              {(hasNextPage || isFetchingNextPage) && (
                <div ref={ref} className="flex justify-center py-2 text-sm text-muted-foreground">
                  {isFetchingNextPage && <LoaderCircle className="h-4 w-4 animate-spin" />}
                </div>
              )}
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SidebarContent;
