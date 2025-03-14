import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border-0 bg-white px-3 py-2 text-base text-foreground ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-muted-foreground focus:border-transparent focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-accent dark:bg-accent dark:ring-offset-accent dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-0 dark:focus-visible:ring-transparent md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
