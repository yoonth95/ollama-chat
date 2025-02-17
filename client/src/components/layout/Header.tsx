"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const Header = () => {
  const [position, setPosition] = useState("model");
  const [modelList, setModelList] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // fetch("/api/ollama")
    //   .then((res) => res.json())
    //   .then(setModelList)
    //   .catch((err) => setError(err.message));
  }, []);

  return (
    <header>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="hover:bg-neutral-800 hover:text-white focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <span>{position}</span>
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            {modelList.map((model) => (
              <DropdownMenuRadioItem key={model} value={model}>
                {model}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
