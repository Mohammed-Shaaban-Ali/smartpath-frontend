import { Sidebar } from "@/components/dashboard/layout/Sidebar";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex">
      <section>
        <Sidebar />
      </section>
      <section className="flex flex-col flex-1 overflow-auto">
        <div className="h-[60px] w-full bg-gray-50 border-b border-gray-200"></div>
        <section className="px-4 py-3">{children}</section>
      </section>
    </main>
  );
}
