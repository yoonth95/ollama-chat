import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import Header from "@/components/layout/header/Header";
import { getModels } from "@/components/layout/header/services";
import { getChatRooms } from "@/components/layout/sidebar/services";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  // 채팅방 리스트 조회
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["chatRooms"],
    queryFn: () => getChatRooms({ page: 1, limit: 20 }),
    initialPageParam: 1,
  });

  // 모델 조회
  await queryClient.prefetchQuery({
    queryKey: ["models"],
    queryFn: getModels,
  });

  return (
    <div className="flex h-screen bg-background">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex flex-1 flex-col items-center justify-center overflow-hidden">{children}</main>
        </div>
      </HydrationBoundary>
    </div>
  );
}
