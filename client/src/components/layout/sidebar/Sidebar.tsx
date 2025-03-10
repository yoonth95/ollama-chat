"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarContent } from "@/components/layout/sidebar/models";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { PanelRightOpen } from "lucide-react";

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebarStore();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return isMobile ? (
    <Sheet open={isOpen} onOpenChange={toggleSidebar}>
      <SheetTrigger asChild>
        <Button variant="icon" className="fixed left-4 top-4 z-50">
          <PanelRightOpen className="!h-5 !w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  ) : (
    <aside className={`transition-all ${isOpen ? "w-[260px]" : "w-0"}`}>{isOpen && <SidebarContent />}</aside>
  );
};

export default Sidebar;
