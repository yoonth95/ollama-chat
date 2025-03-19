"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SquarePen } from "lucide-react";

const SidebarActionButton = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between gap-2">
      <SidebarTrigger className="h-8 w-8 text-secondary-foreground [&>svg]:!h-5 [&>svg]:!w-5" />
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
