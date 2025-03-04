"use client";

import React, { startTransition, useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { EditorView } from "prosemirror-view";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import TiptapEditor, { TiptapEditorRef } from "@/components/editor/TiptapEditor";
import { getFormattedContent } from "@/utils/editorUtils";
import { useModelStore } from "@/stores/useModelStore";
import { sendMessageAction } from "@/app/(layout)/(home)/actions/sendMessageAction";
import { LoaderCircle, Send } from "lucide-react";

const ChatInputContainer = () => {
  const router = useRouter();
  const editorRef = useRef<TiptapEditorRef>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { selectedModel } = useModelStore();

  const [actionState, formAction, isPending] = useActionState(sendMessageAction, null);

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

  useEffect(() => {
    if (actionState) {
      const { ok, data, message } = actionState;
      if (!ok) toast.error(message || "메시지 전송에 실패했습니다");
      if (ok && data) {
        router.push(`/chat/${data.id}`);
      }
    }
  }, [actionState, router]);

  return (
    <section className="mx-auto w-full cursor-text px-3 md:max-w-3xl md:px-5 lg:px-4 xl:px-5">
      <form
        ref={formRef}
        onSubmit={(e) => handleSubmit(e)}
        onClick={handleContainerClick}
        className="flex w-full flex-col rounded-2xl border border-border/20 bg-background shadow-sm dark:bg-accent"
      >
        <input type="hidden" name="message" />
        <input type="hidden" name="model" />
        <TiptapEditor
          editorRef={editorRef}
          placeholder="무엇이든 물어보세요"
          onSubmit={(source: EditorView) => handleSubmit(undefined, source)}
        />
        <div className="flex items-center justify-end px-3 py-3">
          {isPending ? (
            <span className="pointer-events-none flex h-8 w-8 items-center justify-center rounded-full bg-primary opacity-50 dark:bg-foreground dark:text-primary">
              <LoaderCircle className="h-5 w-5 animate-spin" />
            </span>
          ) : (
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-primary hover:bg-primary/70 hover:text-white dark:bg-foreground dark:text-primary hover:dark:bg-foreground hover:dark:text-primary"
              aria-label="메시지 보내기"
              disabled={isPending}
            >
              <Send className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>
    </section>
  );
};

export default ChatInputContainer;
