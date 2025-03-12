"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { PanelRightClose, SquarePen } from "lucide-react";

const SidebarActionButton = () => {
  const router = useRouter();
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

  return (
    <div className="flex items-center justify-between gap-2">
      <Button
        variant="icon"
        aria-label="on-off-sidebar"
        className="h-8 w-8 text-secondary-foreground"
        onClick={toggleSidebar}
      >
        <PanelRightClose className="!h-5 !w-5" />
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
  );
};

export default SidebarActionButton;
