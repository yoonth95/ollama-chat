import Sidebar from "@/components/layout/sidebar/Sidebar";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { getModels } from "@/components/layout/header/services";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: models, message, ok, status } = await getModels();
  const responseData = models ?? [];
  const responseError = !ok ? { status, message } : undefined;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col p-4">
        <Header initialModels={responseData} initialError={responseError} />
        <main className="flex flex-1 flex-col items-center justify-center">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
