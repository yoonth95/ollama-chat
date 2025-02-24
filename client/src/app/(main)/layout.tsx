import Sidebar from "@/components/layout/sidebar/Sidebar";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import getModels from "@/components/layout/header/services/getModels";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: response } = await getModels();
  const models = response.models ?? [];
  const error = response.error && { status: response.error.status, message: response.error.message };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col p-4">
        <Header initialModels={models} initialError={error} />
        <main className="flex flex-1 flex-col items-center justify-center">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
