import { RefObject } from "react";
import { Editor } from "@tiptap/react";
import { EditorView } from "prosemirror-view";
import { Node as ProsemirrorNode } from "prosemirror-model";
import { toast } from "react-toastify";
import { TiptapEditorRef } from "@/components/editor/TiptapEditor";
import { ModelInfoType } from "@/types/modelType";

export const getFormattedContentFromEditor = (editor: Editor): string => {
  if (!editor.view) return "";
  return getFormattedContentFromView(editor.view);
};

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

// EditorView 또는 editorRef에서 내용을 가져와서 마크다운 형식으로 반환
export const getFormattedContent = (
  selectedModel: ModelInfoType | null,
  source: EditorView | RefObject<TiptapEditorRef | null>,
) => {
  if (!selectedModel) {
    toast.error("모델을 선택해주세요.");
    return false;
  }

  let formattedContent = "";
  let editorRef: RefObject<TiptapEditorRef | null> | null = null;

  // EditorView 타입인 경우 (Enter 키 이벤트에서 호출된 경우)
  if ("state" in source) {
    const view = source as EditorView;

    if (!view.state.doc.textContent) return false; // 내용이 비어있는 경우

    formattedContent = getFormattedContentFromView(view);
  }
  // editorRef 타입인 경우 (버튼 클릭에서 호출된 경우)
  else {
    editorRef = source as RefObject<TiptapEditorRef | null>;
    const editor = editorRef.current?.getEditor();

    // 내용이 비어있는 경우
    if (!editor || !editor.view) return false;
    if (!editor.view.state.doc.textContent) return false;

    formattedContent = getFormattedContentFromEditor(editor);
  }

  if (formattedContent) return formattedContent;
  return false;
};
