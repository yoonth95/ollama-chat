import React, { useRef, KeyboardEvent } from "react";
import { useEditor, EditorContent, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Code from "@tiptap/extension-code";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Placeholder from "@tiptap/extension-placeholder";
import ts from "highlight.js/lib/languages/typescript";
import js from "highlight.js/lib/languages/javascript";
import html from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import { all, createLowlight } from "lowlight";
import CodeBlockComponent from "./CodeBlockComponent";

const lowlight = createLowlight(all);

// 언어 등록
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

interface TiptapEditorProps {
  placeholder?: string;
  onSubmit?: (content: string) => void;
}

const TiptapEditor = ({ placeholder = "메시지를 입력하세요...", onSubmit }: TiptapEditorProps) => {
  const editorRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Code.configure({
        HTMLAttributes: {
          class: "inline-code",
        },
      }),
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent);
        },
      }).configure({ lowlight }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "focus:outline-none w-full p-3 max-h-52 overflow-y-auto",
      },
    },
  });

  const handleKeyUp = (e: KeyboardEvent) => {
    if (!editor) return;

    // Shift+Enter는 일반 줄바꿈으로 처리
    if (e.key === "Enter" && e.shiftKey) {
      return;
    }

    // 일반 Enter는 제출 기능으로 처리
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit?.(editor.getHTML());
    }
  };

  return (
    <div className="bg-input-bg min-h-[48px] rounded-t-2xl">
      <div ref={editorRef} className="tiptap max-h-52 w-full" onKeyUp={handleKeyUp}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;
