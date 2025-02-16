"use client";

import React, { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const ChatInput = () => {
  const textRef = useRef<HTMLTextAreaElement>(null);

  return (
    <section className="w-full max-w-2xl cursor-text" onClick={() => textRef.current?.focus()}>
      <div className="relative flex flex-col items-end gap-5 rounded-lg bg-neutral-700 py-3 pl-3 pr-3">
        <Textarea
          ref={textRef}
          className="max-h-52 w-full rounded-lg border-neutral-700 bg-neutral-700 pr-2 placeholder:text-neutral-400"
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
          className="h-10 w-10 rounded-full bg-white p-4 text-black hover:bg-neutral-300 hover:text-black"
        >
          <Send className="!h-4 !w-4" />
        </Button>
      </div>
    </section>
  );
};

export default ChatInput;
