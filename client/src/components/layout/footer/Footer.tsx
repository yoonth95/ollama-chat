import React from "react";
import { ThemeToggle } from "@/components/common/ThemeToggle";

const Footer = () => {
  return (
    <footer className="flex h-12 items-end justify-end text-center text-xs text-muted-foreground">
      <ThemeToggle />
    </footer>
  );
};

export default Footer;
