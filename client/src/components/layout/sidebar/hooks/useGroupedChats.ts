import { useMemo } from "react";
import { subDays, isToday, isYesterday, isAfter, parseISO } from "date-fns";
import { ChatRoomType } from "@/types/chatRoomType";

const useGroupedChats = (chatRooms: ChatRoomType[]) => {
  return useMemo(() => {
    const today: ChatRoomType[] = [];
    const yesterday: ChatRoomType[] = [];
    const lastWeek: ChatRoomType[] = [];
    const older: ChatRoomType[] = [];
    const sevenDaysAgo = subDays(new Date(), 7);

    chatRooms.forEach((chat) => {
      const chatDate = parseISO(chat.created_at);
      if (isToday(chatDate)) today.push(chat);
      else if (isYesterday(chatDate)) yesterday.push(chat);
      else if (isAfter(chatDate, sevenDaysAgo)) lastWeek.push(chat);
      else older.push(chat);
    });

    return { today, yesterday, lastWeek, older };
  }, [chatRooms]);
};

export default useGroupedChats;
