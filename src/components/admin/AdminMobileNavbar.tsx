"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  CreditCard,
  Users,
  Settings,
  Home,
  Palette,
  Grid,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Productos", href: "/admin/products", icon: Package },
  { name: "Artistas", href: "/admin/artists", icon: Palette },
  { name: "Categorias", href: "/admin/categories", icon: Grid },
  { name: "Pagos", href: "/admin/payments", icon: CreditCard },
];

export function AdminMobileNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background lg:hidden">
      <div className="flex items-center justify-around py-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px]">{item.name}</span>
            </Link>
          );
        })}
        <Link
          href="/"
          className="flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px]">Tienda</span>
        </Link>
      </div>
    </nav>
  );
}
