import { useInfiniteQuery } from "@tanstack/react-query";
import { getChatRooms } from "@/components/layout/sidebar/services";

const useChatRooms = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
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

  const flatData = data?.pages.flatMap((page) => {
    if (!page || !Array.isArray(page)) return [];
    return page;
  });

  return {
    data: flatData || [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
};

export default useChatRooms;
