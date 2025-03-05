import { ChatLayout } from "@/app/(layout)/(home)/components";
import ChatInputContainer from "@/components/chat/ChatInputContainer";

export default function HomePage() {
  return (
    <ChatLayout>
      <ChatInputContainer />
    </ChatLayout>
  );
}
