import React from "react";
import { useEditor, EditorContent, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Code from "@tiptap/extension-code";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Placeholder from "@tiptap/extension-placeholder";
import { all, createLowlight } from "lowlight";
import CodeBlockComponent from "./CodeBlockComponent";

const lowlight = createLowlight(all);

interface TiptapEditorProps {
  placeholder?: string;
  onSubmit?: (content: string) => void;
  editorRef?: (actions: { getText: () => string; clearContent: () => void }) => void;
}

const TiptapEditor = ({ placeholder = "메시지를 입력하세요...", onSubmit, editorRef }: TiptapEditorProps) => {
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
        class: "focus:outline-none w-full px-4 py-3 max-h-52 overflow-y-auto",
      },
      handleDOMEvents: {
        keydown: (view, event) => {
          // Shift+Enter는 줄바꿈 허용
          if (event.key === "Enter" && event.shiftKey) return false;

          // Enter는 줄바꿈 방지, 제출 (텍스트 내용 가져오기)
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();

            // 형식을 유지하면서 텍스트 내용 가져오기
            let formattedContent = "";
            let lastNodeType = "";

            // 모든 최상위 노드를 순회하며 내용 구성
            view.state.doc.forEach((node) => {
              const nodeType = node.type.name;
              const nodeText = node.textContent;

              // code-block과 일반 텍스트 사이에 줄바꿈 추가
              if (lastNodeType === "codeBlock" && nodeType !== "codeBlock") {
                formattedContent += "\n\n";
              } else if (lastNodeType !== "codeBlock" && nodeType === "codeBlock") {
                formattedContent += "\n\n";
              } else if (lastNodeType && nodeType !== lastNodeType) {
                // 다른 유형의 노드 사이에 줄바꿈 추가
                formattedContent += "\n";
              }

              // 코드 블록인 경우 ```로 감싸기
              if (nodeType === "codeBlock") {
                const language = node.attrs.language || "";
                formattedContent += "```" + language + "\n" + nodeText + "\n```";
              } else {
                formattedContent += nodeText;
              }

              lastNodeType = nodeType;
            });

            if (formattedContent.trim()) {
              // 입력 내용이 있을 때만 콜백 실행
              onSubmit?.(formattedContent);

              // 입력 후 에디터 내용 지우기
              view.dispatch(view.state.tr.delete(0, view.state.doc.content.size));
            }

            return true;
          }

          return false;
        },
        paste: (view, event) => {
          if (event.clipboardData) {
            // HTML 형식과 텍스트 형식 모두 가져오기
            const html = event.clipboardData.getData("text/html");
            const text = event.clipboardData.getData("text/plain");

            // 현재 위치가 code-block 내부인지 확인
            const { from } = view.state.selection;
            const parentNode = view.state.doc.resolve(from).parent;
            const isInCodeBlock = parentNode.type.name === "codeBlock";

            // HTML에 code-block이 포함되어 있는지 확인
            const hasCodeBlock = html.includes("code-block") || html.includes("pre");

            // 1. code-block 내부에 붙여넣기하는 경우 => 기본 동작 사용
            if (isInCodeBlock) return false;

            // 2. 복사한 내용에 code-block이 포함된 경우 => HTML 형식 유지하며 붙여넣기
            if (hasCodeBlock) return false;

            // 3. 그 외의 경우 => plain text만 붙여넣기
            view.dispatch(view.state.tr.insertText(text, view.state.selection.from, view.state.selection.to));

            event.preventDefault();
            return true;
          }
          return false;
        },
      },
    },
    onCreate: ({ editor }) => {
      // 생성 시 에디터 제어 메서드 노출
      if (editorRef) {
        editorRef({
          getText: () => editor.getHTML(),
          clearContent: () => editor.commands.clearContent(),
        });
      }
    },
  });

  return (
    <div className="min-h-[48px] rounded-t-2xl">
      <div className="tiptap max-h-52 w-full">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;
