"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import TiptapEditor, { TiptapEditorRef } from "@/components/editor/TiptapEditor";
import { Send } from "lucide-react";

const ChatInputContainer = () => {
  // 에디터 ref 생성
  const editorRef = useRef<TiptapEditorRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 컨테이너 클릭 시 에디터에 포커스
  const handleContainerClick = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  // 질문 전송
  const handleSend = (message: string) => {
    if (message.trim()) {
      console.log("질문 입력:", message);
    }
  };

  // 보내기 버튼 클릭 핸들러
  const handleSendButtonClick = () => {
    if (editorRef.current) {
      const text = editorRef.current.getText();
      if (text.trim()) {
        console.log(text);
        editorRef.current.clearContent();
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className="mx-auto mb-8 w-full max-w-3xl cursor-text px-4"
      onClick={handleContainerClick}
    >
      <div className="flex w-full flex-col rounded-2xl bg-background dark:bg-accent">
        <TiptapEditor editorRef={editorRef} placeholder="무엇이든 물어보세요." onSubmit={handleSend} />
        <div className="flex items-center justify-end px-3 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-primary dark:bg-foreground dark:text-primary"
            onClick={handleSendButtonClick}
            aria-label="메시지 보내기"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ChatInputContainer;
