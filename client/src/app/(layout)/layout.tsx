import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
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
        <Suspense fallback={<Skeleton className="mx-4 mb-4 h-8 w-40 rounded-md" />}>
          <HeaderSection />
        </Suspense>
        <main className="flex flex-1 flex-col items-center justify-center overflow-hidden">{children}</main>
      </div>
    </div>
  );
}

async function HeaderSection() {
  const modelsResponse = await getModels().catch((error) => ({
    data: [],
    message: error.message || "Failed to fetch models",
    ok: false,
    status: 500,
  }));

  return (
    <Header
      initialModels={modelsResponse.data ?? []}
      initialError={!modelsResponse.ok ? { status: modelsResponse.status, message: modelsResponse.message } : undefined}
    />
  );
}
