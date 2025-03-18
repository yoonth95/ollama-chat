"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatRoomList } from "@/components/layout/sidebar/models";
import { SidebarActionButton } from "@/components/common";

const SidebarContent = () => {
  return (
    <div className="flex h-full w-[260px] flex-col bg-secondary">
      <div className="p-4">
        <SidebarActionButton />
      </div>
      <ScrollArea className="flex-1">
        <div className="h-[calc(100dvh-130px)] overflow-y-auto px-4">
          <ChatRoomList />
        </div>
      </ScrollArea>
    </div>
  );
};

export default SidebarContent;
