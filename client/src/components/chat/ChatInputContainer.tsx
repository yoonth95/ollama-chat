"use client";

import React, { startTransition, useActionState, useRef } from "react";
import { EditorView } from "prosemirror-view";
import { Button } from "@/components/ui/button";
import TiptapEditor, { TiptapEditorRef } from "@/components/editor/TiptapEditor";
import { getFormattedContent } from "@/utils/editorUtils";
import { useModelStore } from "@/stores/useModelStore";
import { sendMessageAction } from "@/app/(main)/actions/sendMessageAction";
import { Send } from "lucide-react";

const ChatInputContainer = () => {
  const editorRef = useRef<TiptapEditorRef>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { selectedModel } = useModelStore();

  const [, formAction, isPending] = useActionState(sendMessageAction, null);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>, source?: EditorView) => {
    if (e) e.preventDefault();

    if (!isPending) {
      const content = source
        ? getFormattedContent(selectedModel, source)
        : getFormattedContent(selectedModel, editorRef);

      const model = selectedModel;

      if (content) {
        const formData = e ? new FormData(e.currentTarget) : new FormData();
        formData.set("message", content);
        formData.set("model", model?.model as string);

        startTransition(() => {
          formAction(formData);
        });

        editorRef.current?.clearContent();
      }
    }
  };

  // form 클릭 시 에디터에 포커스
  const handleContainerClick = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  return (
    <section className="mx-auto mb-8 w-full max-w-3xl cursor-text px-4">
      <form
        ref={formRef}
        onSubmit={(e) => handleSubmit(e)}
        onClick={handleContainerClick}
        className="flex w-full flex-col rounded-2xl bg-background dark:bg-accent"
      >
        <input type="hidden" name="message" />
        <input type="hidden" name="model" />
        <TiptapEditor
          editorRef={editorRef}
          placeholder="무엇이든 물어보세요"
          onSubmit={(source: EditorView) => handleSubmit(undefined, source)}
        />
        <div className="flex items-center justify-end px-3 py-3">
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-primary dark:bg-foreground dark:text-primary hover:dark:bg-foreground hover:dark:text-primary"
            aria-label="메시지 보내기"
            disabled={isPending}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ChatInputContainer;
