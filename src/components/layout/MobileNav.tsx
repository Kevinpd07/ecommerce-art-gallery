"use client";

import * as React from "react";
import Link from "next/link";
import {
  Menu,
  Palette,
  Frame,
  Aperture,
  Paintbrush,
  Image,
  Grid,
  User,
  Heart,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const categories = [
  {
    name: "Cuadros Abstractos",
    href: "/products?category=abstractos",
    icon: Palette,
  },
  {
    name: "Cuadros Paisajes",
    href: "/products?category=paisajes",
    icon: Frame,
  },
  {
    name: "Cuadros Retratos",
    href: "/products?category=retratos",
    icon: Aperture,
  },
  {
    name: "Arte Digital",
    href: "/products?category=arte-digital",
    icon: Paintbrush,
  },
  { name: "Fotografía", href: "/products?category=fotografia", icon: Image },
  { name: "Arte Moderno", href: "/products?category=arte-moderno", icon: Grid },
];

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col gap-4">
          {/* User Actions */}
          <div className="flex flex-col gap-2">
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
            >
              <User className="h-4 w-4" />
              Mi Cuenta
            </Link>
            <Link
              href="/favorites"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
            >
              <Heart className="h-4 w-4" />
              Favoritos
            </Link>
            <Link
              href="/orders"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
            >
              <Package className="h-4 w-4" />
              Mis Pedidos
            </Link>
          </div>

          <Separator />

          {/* Categories */}
          <div className="flex flex-col gap-1">
            <p className="px-3 text-xs font-semibold uppercase text-muted-foreground">
              Categorias
            </p>
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </Link>
            ))}
          </div>

          <Separator />

          {/* All Products */}
          <Link
            href="/products"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center rounded-lg bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Ver Todos los Cuadros
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
