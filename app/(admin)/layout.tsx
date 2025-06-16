import { Sidebar } from "@/components/dashboard/layout/Sidebar";
import { BreadcrumbDashboard } from "@/components/dashboard/shared/BreadcrumbDashboard";
import UserCard from "@/components/dashboard/shared/UserCard";

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
        <div className="h-[60px] w-full justify-between flex items-center border-b border-gray-200 px-5 py-2">
          <BreadcrumbDashboard />

          <UserCard />
        </div>
        <section className="px-4 py-3">{children}</section>
      </section>
    </main>
  );
}
