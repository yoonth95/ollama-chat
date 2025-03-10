import { useInfiniteQuery } from "@tanstack/react-query";
import { getChatRooms } from "@/components/layout/sidebar/services";

const useChatRooms = () => {
  return useInfiniteQuery({
    queryKey: ["chatRooms"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getChatRooms({ page: pageParam, limit: 20 });
      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage && lastPage.length === 20 ? allPages.length + 1 : undefined;
    },
  });
};

export default useChatRooms;
