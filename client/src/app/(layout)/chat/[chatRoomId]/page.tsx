import ChatInputContainer from "@/components/chat/ChatInputContainer";
import { Suspense } from "react";
import ChatMessages from "./components/ChatMessages";

export default async function Page({ params }: { params: Promise<{ chatRoomId: string }> }) {
  const { chatRoomId } = await params;

  return (
    <div className="flex h-full w-full flex-col">
      <Suspense fallback={<div>메시지 로딩 중...</div>}>
        <ChatMessages chatRoomId={chatRoomId} />
      </Suspense>
      <ChatInputContainer chatRoomId={chatRoomId} />
    </div>
  );
}
