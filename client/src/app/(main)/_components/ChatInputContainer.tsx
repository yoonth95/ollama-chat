"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import TiptapEditor, { TiptapEditorRef } from "@/components/editor/TiptapEditor";
import { getFormattedContentFromEditor } from "@/utils/editorUtils";
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

  // Enter 키 입력 시 질문 전송
  const handleSend = (content: string) => {
    if (content.trim()) {
      console.log(content);
    }
  };

  // 전송 버튼 클릭 시 질문 전송
  const handleSendButtonClick = () => {
    const editor = editorRef.current?.getEditor();
    if (!editor) return;

    // 에디터 내용이 비어있는 경우 전송하지 않음
    if (!editor.view.state.doc.textContent) return;

    const formattedContent = getFormattedContentFromEditor(editor);
    if (formattedContent) {
      console.log(formattedContent);
      editorRef.current?.clearContent();
    }
  };

  return (
    <section
      ref={containerRef}
      className="mx-auto mb-8 w-full max-w-3xl cursor-text px-4"
      onClick={handleContainerClick}
    >
      <div className="flex w-full flex-col rounded-2xl bg-background dark:bg-accent">
        <TiptapEditor editorRef={editorRef} placeholder="무엇이든 물어보세요" onSubmit={handleSend} />
        <div className="flex items-center justify-end px-3 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-primary dark:bg-foreground dark:text-primary hover:dark:bg-foreground hover:dark:text-primary"
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
