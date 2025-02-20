import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import { ModelsProvider } from "@/providers/ModelsProvider";
import getModels from "@/services/model/getModels";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const response = await getModels();
  const models = response.data;
  const error = response.error && { status: response.error.status, message: response.error.message };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col p-4">
        <ModelsProvider models={models} error={error}>
          <Header />
          <main className="flex flex-1 flex-col items-center justify-center">{children}</main>
        </ModelsProvider>
        <Footer />
      </div>
    </div>
  );
}
