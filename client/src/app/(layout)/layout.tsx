import Sidebar from "@/components/layout/sidebar/Sidebar";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { getModels } from "@/components/layout/header/services";
import getChatRooms from "@/components/layout/sidebar/services/getChatRooms";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [modelsResponse, roomsResponse] = await Promise.all([
    getModels().catch((error) => ({
      data: [],
      message: error.message || "Failed to fetch models",
      ok: false,
      status: 500,
    })),
    getChatRooms().catch((error) => ({
      data: [],
      message: error.message || "Failed to fetch chat rooms",
      ok: false,
      status: 500,
    })),
  ]);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar chatRooms={roomsResponse.data ?? []} />
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
