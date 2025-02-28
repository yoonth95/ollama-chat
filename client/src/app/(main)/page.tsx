import { ModelText, ChatInputContainer } from "@/app/(main)/_components";

export default function MainPage() {
  const handleSendMessage = (message: string) => {
    console.log("메시지 전송:", message);
  };

  return (
    <div className="m-auto w-full max-w-6xl translate-y-6 px-2 pb-24">
      <div className="flex h-full w-full flex-col items-center justify-center gap-6">
        <ModelText />
        <ChatInputContainer />
      </div>
    </div>
  );
}
