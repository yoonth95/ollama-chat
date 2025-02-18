"use client";

import React, { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const ChatInput = () => {
  const textRef = useRef<HTMLTextAreaElement>(null);

  return (
    <section className="w-full max-w-2xl cursor-text" onClick={() => textRef.current?.focus()}>
      <div className="relative flex flex-col items-end gap-5 rounded-lg border border-border bg-background py-3 pl-3 pr-3">
        <Textarea
          ref={textRef}
          className="max-h-52 w-full rounded-lg border border-border bg-muted pr-2 text-foreground placeholder:text-muted-foreground"
          style={{ resize: "none", overflowY: "auto" }}
          placeholder="AI에게 메시지를 작성하세요"
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto"; // 높이를 초기화
            target.style.height = `${Math.min(target.scrollHeight, 208)}px`; // max-h-52 (208px) 유지
          }}
        />
        <Button
          variant="icon"
          className="h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-muted hover:text-muted-foreground"
        >
          <Send className="!h-4 !w-4" />
        </Button>
      </div>
    </section>
  );
};

export default ChatInput;
