import React from "react";

const UserChatBox = ({ content }: { content: string }) => {
  return (
    <div className="max-w-[80%] py-5 pl-6">
      <div className="mx-auto flex flex-1 gap-4 text-base md:max-w-3xl md:gap-5 lg:gap-6">
        <div className="w-full">
          <div className="flex justify-end pb-1">
            <div className="max-w-[80%] whitespace-pre-wrap break-words rounded-2xl px-5 py-2 dark:bg-accent">
              <pre className="whitespace-pre-wrap break-words">{content}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChatBox;
