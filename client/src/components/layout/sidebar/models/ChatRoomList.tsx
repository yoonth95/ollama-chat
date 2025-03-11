"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ChatRoom } from "@/components/layout/sidebar/models";
import { useChatRooms, useGroupedChats } from "@/components/layout/sidebar/hooks";
import { LoaderCircle } from "lucide-react";

const ChatRoomList = () => {
  const { ref, inView } = useInView();
  const { data: chatRooms, fetchNextPage, hasNextPage, isFetchingNextPage } = useChatRooms();
  const groupedChats = useGroupedChats(chatRooms);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <>
      <ChatRoom title="오늘" chats={groupedChats.today} />
      <ChatRoom title="어제" chats={groupedChats.yesterday} />
      <ChatRoom title="지난 7일" chats={groupedChats.lastWeek} />
      <ChatRoom title="지난 30일" chats={groupedChats.older} />
      {(hasNextPage || isFetchingNextPage) && (
        <div ref={ref} className="flex justify-center text-sm text-muted-foreground">
          {isFetchingNextPage && <LoaderCircle className="h-4 w-4 animate-spin" />}
        </div>
      )}
    </>
  );
};

export default ChatRoomList;
