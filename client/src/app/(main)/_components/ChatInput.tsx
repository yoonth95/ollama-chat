"use client";

import React, { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const ChatInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  return (
    <section className="mx-auto mb-8 w-full max-w-3xl cursor-text px-4" onClick={() => textareaRef.current?.focus()}>
      <div className="flex w-full flex-col rounded-3xl dark:bg-accent">
        <Textarea
          ref={textareaRef}
          onInput={handleInput}
          rows={1}
          placeholder="무엇이든 물어보세요"
          className="h-[48px] w-full resize-none rounded-t-3xl border-0 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-transparent focus:outline-none focus:ring-0 dark:border-accent dark:bg-accent dark:text-white dark:ring-offset-accent dark:focus-visible:ring-0 dark:focus-visible:ring-transparent"
        />
        <div className="flex items-center justify-end px-3 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-primary dark:bg-foreground dark:text-primary"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ChatInput;
