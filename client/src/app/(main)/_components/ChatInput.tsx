"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import TiptapEditor from "@/components/common/TiptapEditor";
import { Send } from "lucide-react";

const ChatInput = () => {
  const [content, setContent] = useState(""); // 입력된 텍스트 상태

  // 메시지 제출 함수
  const handleSend = () => {
    if (content.trim() === "") return;
    console.log("전송된 메시지:", content);
  };

  return (
    <section className="mx-auto mb-8 w-full max-w-3xl cursor-text px-4">
      <div className="flex w-full flex-col rounded-2xl bg-background dark:bg-accent">
        <TiptapEditor
          placeholder="무엇이든 물어보세요"
          onSubmit={(text) => {
            setContent(text); // 입력한 텍스트 업데이트
            handleSend(); // 메시지 전송
          }}
        />
        <div className="flex items-center justify-end px-3 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-primary dark:bg-foreground dark:text-primary"
            onClick={handleSend} // 버튼 클릭 시 전송
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ChatInput;
