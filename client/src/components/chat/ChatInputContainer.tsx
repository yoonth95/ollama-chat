"use client";

import React, { startTransition, useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { EditorView } from "prosemirror-view";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import TiptapEditor, { TiptapEditorRef } from "@/components/editor/TiptapEditor";
import { getFormattedContent } from "@/utils/editorUtils";
import { useModelStore } from "@/stores/useModelStore";
import { useSendMessageStore } from "@/stores/useSendMesaage";
import { sendMessageAction } from "@/app/(layout)/(home)/actions/sendMessageAction";
import { LoaderCircle, Send } from "lucide-react";

const ChatInputContainer = ({ chatRoomId = "" }: { chatRoomId?: string }) => {
  const router = useRouter();
  const editorRef = useRef<TiptapEditorRef>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { selectedModel } = useModelStore();
  const { setIsSendMessage, setChatMessage } = useSendMessageStore();

  const [actionState, formAction, isPending] = useActionState(sendMessageAction, null);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>, source?: EditorView) => {
    if (e) e.preventDefault();

    if (!isPending) {
      const content = source
        ? getFormattedContent(selectedModel, source)
        : getFormattedContent(selectedModel, editorRef);

      const model = selectedModel?.model;

      if (content && model) {
        const formData = e ? new FormData(e.currentTarget) : new FormData();
        formData.set("message", content);
        formData.set("model", model);
        formData.set("roomId", chatRoomId || "");

        // 메인 페이지 UI 변경
        if (chatRoomId === "") {
          setIsSendMessage(true);
          setChatMessage({
            role: "user",
            content,
          });
        }

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
    if (chatRoomId !== "") setIsSendMessage(false);

    if (actionState) {
      const { ok, data, message } = actionState;
      if (!ok) toast.error(message || "메시지 전송에 실패했습니다");
      if (ok && data) {
        setIsSendMessage(true);
        router.push(`/chat/${data.id}`);
      }
    }
  }, [actionState, router, chatRoomId, setIsSendMessage]);

  return (
    <section className="mx-auto flex w-full gap-4 text-base md:max-w-[40rem] md:gap-5 lg:gap-6 xl:max-w-[48rem]">
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
        <div className="flex w-full items-center justify-end px-3 py-3">
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
