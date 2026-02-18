import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      <AdminSidebar />
      <div className="lg:pl-64">
        {/* Mobile Header with Hamburger Menu */}
        <div className="lg:hidden sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4">
          <AdminMobileNav />
          <span className="font-bold">Panel Admin</span>
        </div>
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
