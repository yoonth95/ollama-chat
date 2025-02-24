import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PanelRightOpen, SquarePen } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-[260px] bg-secondary">
      <div className="space-y-5 p-4">
        <div className="flex items-center justify-between">
          <Button variant="icon" className="h-8 w-8 text-secondary-foreground">
            <PanelRightOpen className="!h-5 !w-5" />
          </Button>
          <Button variant="icon" className="h-8 w-8 text-secondary-foreground">
            <SquarePen className="!h-5 !w-5" />
          </Button>
        </div>

        <ScrollArea className="h-full">
          {/* Menu Items */}
          <div className="space-y-4">
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="text-text-primary w-full justify-start px-2 text-sm dark:hover:bg-neutral-700/50"
              >
                채팅1
              </Button>
              <Button
                variant="ghost"
                className="text-text-primary w-full justify-start px-2 text-sm dark:hover:bg-neutral-700/50"
              >
                채팅2
              </Button>
              <Button
                variant="ghost"
                className="text-text-primary w-full justify-start px-2 text-sm dark:hover:bg-neutral-700/50"
              >
                채팅3
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Sidebar;
