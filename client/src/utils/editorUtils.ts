import { RefObject } from "react";
import { Editor } from "@tiptap/react";
import { TiptapEditorRef } from "@/components/editor/TiptapEditor";
import { EditorView } from "prosemirror-view";
import { Node as ProsemirrorNode } from "prosemirror-model";

// EditorRef에서 마크다운 형식으로 내용을 가져오는 유틸 함수
export const getFormattedContent = (editorRef: RefObject<TiptapEditorRef | null>): string => {
  const editor = editorRef.current?.getEditor();
  if (!editor || !editor.view) return "";

  return getFormattedContentFromView(editor.view);
};

// EditorView에서 마크다운 형식으로 내용을 가져오는 유틸 함수
export const getFormattedContentFromView = (view: EditorView): string => {
  let formattedContent = "";
  let lastNodeType = "";

  // 모든 최상위 노드를 순회하며 내용 구성
  view.state.doc.forEach((node: ProsemirrorNode) => {
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
      // ProseMirror Node의 attrs 타입을 지정하기 어려운 경우, 인덱스 시그니처를 사용
      const nodeAttrs = node.attrs as { language?: string };
      const language = nodeAttrs.language || "";
      formattedContent += "```" + language + "\n" + nodeText + "\n```";
    } else {
      formattedContent += nodeText;
    }

    lastNodeType = nodeType;
  });

  return formattedContent.trim();
};

// Editor 인스턴스에서 마크다운 형식으로 내용을 가져오는 유틸 함수
export const getFormattedContentFromEditor = (editor: Editor): string => {
  if (!editor.view) return "";
  return getFormattedContentFromView(editor.view);
};
