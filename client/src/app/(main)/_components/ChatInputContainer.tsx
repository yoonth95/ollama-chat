"use client";

import React, { RefObject, useRef } from "react";
import { Button } from "@/components/ui/button";
import TiptapEditor, { TiptapEditorRef } from "@/components/editor/TiptapEditor";
import { getFormattedContent } from "@/utils/editorUtils";
import { useModelStore } from "@/stores/useModelStore";
import { EditorView } from "prosemirror-view";
import { Send } from "lucide-react";

const ChatInputContainer = () => {
  const editorRef = useRef<TiptapEditorRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { selectedModel } = useModelStore();

  // 컨테이너 클릭 시 에디터에 포커스
  const handleContainerClick = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleSendMessage = async (source: EditorView | RefObject<TiptapEditorRef | null>) => {
    const content = getFormattedContent(selectedModel, source);
    if (content) {
      // 메시지 전송 로직
      console.log(content);

      // 에디터 초기화
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
        <TiptapEditor editorRef={editorRef} placeholder="무엇이든 물어보세요" onSubmit={handleSendMessage} />
        <div className="flex items-center justify-end px-3 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-primary dark:bg-foreground dark:text-primary hover:dark:bg-foreground hover:dark:text-primary"
            onClick={() => handleSendMessage(editorRef)}
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
