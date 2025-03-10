import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { getModels } from "@/components/layout/header/services";
import { getChatRooms } from "@/components/layout/sidebar/services";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const modelsResponse = await getModels().catch((error) => ({
    data: [],
    message: error.message || "Failed to fetch models",
    ok: false,
    status: 500,
  }));

  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["chatRooms"],
    queryFn: () => getChatRooms({ page: 1, limit: 20 }),
    initialPageParam: 1,
  });

  return (
    <div className="flex h-screen bg-background">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Sidebar />
      </HydrationBoundary>
      <div className="flex flex-1 flex-col py-4">
        <Header
          initialModels={modelsResponse.data ?? []}
          initialError={
            !modelsResponse.ok ? { status: modelsResponse.status, message: modelsResponse.message } : undefined
          }
        />
        <main className="flex flex-1 flex-col items-center justify-center overflow-hidden">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
