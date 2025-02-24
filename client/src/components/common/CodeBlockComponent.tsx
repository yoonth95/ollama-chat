import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import React from "react";

const CodeBlockComponent = () => (
  <NodeViewWrapper className="code-block">
    <pre>
      <NodeViewContent as="code" />
    </pre>
  </NodeViewWrapper>
);

export default CodeBlockComponent;
