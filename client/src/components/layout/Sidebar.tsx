import React from "react";
import { Button } from "../ui/button";
import { PanelRightOpen, SquarePen } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

const Sidebar = () => {
  return (
    <div className="w-[260px] border-r border-neutral-900 bg-neutral-900">
      <div className="space-y-5 p-4">
        <div className="flex items-center justify-between">
          <Button variant="icon" className="h-8 w-8">
            <PanelRightOpen className="!h-5 !w-5" />
          </Button>
          <Button variant="icon" className="h-8 w-8">
            <SquarePen className="!h-5 !w-5" />
          </Button>
        </div>

        <ScrollArea className="h-full">
          {/* Menu Items */}
          <div className="space-y-4">
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start text-sm" active>
                채팅1
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                채팅2
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
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
