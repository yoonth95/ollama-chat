"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ErrorDisplay, SelectedModelDisplay, HeaderDropdownMenu } from "@/components/layout/header/models";
import { SidebarActionButton } from "@/components/common";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { useModelSelectStore } from "@/stores/useModelSelectStore";
import { useGetModels } from "@/components/layout/header/hooks/useGetModels";
import { ChevronDown } from "lucide-react";

const ThemeToggle = dynamic(() => import("@/components/common").then((mod) => mod.ThemeToggle), {
  ssr: false,
});

const Header = () => {
  const { selectedModel, setSelectedModel } = useModelSelectStore();
  const isOpen = useSidebarStore((state) => state.isOpen);

  const { models, error } = useGetModels();

  useEffect(() => {
    if (selectedModel && !models.some((m) => m.model === selectedModel.model)) {
      setSelectedModel(null);
    }
  }, [models, selectedModel, setSelectedModel]);

  return (
    <header className="flex justify-between p-4">
      <div className="flex items-center gap-3">
        {!isOpen && <SidebarActionButton />}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              aria-label="dropdown"
              className="h-fit p-0 text-lg text-foreground dark:ring-offset-background dark:hover:bg-background dark:focus-visible:ring-0 dark:focus-visible:ring-transparent"
            >
              <SelectedModelDisplay />
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[20rem] border border-border bg-accent p-0" align="start">
            {error ? <ErrorDisplay error={error} /> : <HeaderDropdownMenu />}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
