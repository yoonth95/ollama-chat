import { UserChatBox, BotChatBox } from "@/app/(layout)/chat/[chatRoomId]/components";
import { ModelText } from "@/app/(layout)/(home)/components";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  // 전역 상태로 체크

  const ok = true;

  return (
    <div className="flex h-full w-full flex-col">
      {ok ? (
        <>
          <section className="flex w-full flex-1 flex-col items-center justify-start overflow-y-auto">
            <UserChatBox />
            <BotChatBox />
          </section>
          {children}
        </>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-6">
          <ModelText />
          {children}
        </div>
      )}
    </div>
  );
};

export default ChatLayout;
