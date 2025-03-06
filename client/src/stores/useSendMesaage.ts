import { ChatMessage } from "@/types/chatMessageType";
import { create } from "zustand";

type SendMessageStoreType = {
  isSendMessage: boolean;
  setIsSendMessage: (isSend: boolean) => void;
  chatMessage: ChatMessage | null;
  setChatMessage: (chatMessage: ChatMessage | null) => void;
};

export const useSendMessageStore = create<SendMessageStoreType>((set) => ({
  isSendMessage: false,
  setIsSendMessage: (isSend: boolean) => set({ isSendMessage: isSend }),
  chatMessage: null,
  setChatMessage: (message: ChatMessage | null) =>
    set((state) => ({
      ...state,
      chatMessage: message,
    })),
}));
