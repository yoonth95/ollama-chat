"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import TiptapEditor from "@/components/common/TiptapEditor";
import { Send } from "lucide-react";

interface EditorActions {
  getText: () => string;
  clearContent: () => void;
}

const ChatInput = () => {
  const [editorActions, setEditorActions] = useState<EditorActions | null>(null);

  const handleSend = (message: string) => {
    console.log("전송된 메시지:", message);
    // 여기서 메시지 전송 로직 구현
  };

  const handleButtonClick = () => {
    if (editorActions) {
      const text = editorActions.getText();
      if (text.trim()) {
        handleSend(text);
        // editorActions.clearContent();
      }
    }
  };

  return (
    <section className="mx-auto mb-8 w-full max-w-3xl cursor-text px-4">
      <div className="flex w-full flex-col rounded-2xl bg-background dark:bg-accent">
        <TiptapEditor placeholder="무엇이든 물어보세요" onSubmit={handleSend} editorRef={setEditorActions} />
        <div className="flex items-center justify-end px-3 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-primary dark:bg-foreground dark:text-primary"
            onClick={handleButtonClick}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ChatInput;
