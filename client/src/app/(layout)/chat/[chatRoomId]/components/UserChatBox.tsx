import React from "react";

const UserChatBox = ({ content }: { content: string }) => {
  return (
    <article className="w-full">
      <div className="mx-auto my-auto px-6 py-[18px] text-base">
        <div className="mx-auto flex w-full flex-1 justify-end gap-4 text-base md:max-w-[40rem] md:gap-5 lg:gap-6 xl:max-w-[48rem]">
          <div className="max-w-[70%]">
            <div className="whitespace-pre-wrap break-words rounded-2xl px-5 py-2 dark:bg-accent">
              <pre className="whitespace-pre-wrap break-words">{content}</pre>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default UserChatBox;
