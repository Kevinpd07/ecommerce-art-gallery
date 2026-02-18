import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminMobileNavbar } from "@/components/admin/AdminMobileNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      <AdminSidebar />
      <div className="lg:pl-64">
        <main className="p-4 pb-20 lg:p-6 lg:pb-6">{children}</main>
        <AdminMobileNavbar />
      </div>
    </div>
  );
}
