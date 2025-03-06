import { ChatLayout } from "@/app/(layout)/(home)/components";
import ChatInputContainer from "@/components/chat/ChatInputContainer";

export default function HomePage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <ChatLayout />
      <ChatInputContainer />
    </div>
  );
}
