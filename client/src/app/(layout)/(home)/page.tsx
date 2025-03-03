import { ModelText } from "@/app/(layout)/(home)/components";
import ChatInputContainer from "@/components/chat/ChatInputContainer";

export default function HomePage() {
  return (
    <div className="m-auto w-full max-w-6xl translate-y-6 px-2 pb-24">
      <div className="flex h-full w-full flex-col items-center justify-center gap-6">
        <ModelText />
        <ChatInputContainer />
      </div>
    </div>
  );
}
