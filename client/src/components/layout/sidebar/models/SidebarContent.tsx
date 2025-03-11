"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatRoomList } from "@/components/layout/sidebar/models";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { PanelRightOpen, SquarePen } from "lucide-react";

const SidebarContent = () => {
  const router = useRouter();
  const { toggleSidebar } = useSidebarStore();

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
          <ChatRoomList />
        </div>
      </ScrollArea>
    </div>
  );
};

export default SidebarContent;
