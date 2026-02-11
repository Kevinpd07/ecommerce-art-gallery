"use client";

import { useEffect } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { useProductsStore } from "@/stores/products-store";

export function BrandSection() {
  const { artists, fetchArtists } = useProductsStore();

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  return (
    <section className="py-12 sm:py-16 border-t">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Artistas Destacados
          </h2>
          <p className="mt-2 text-muted-foreground">
            Descubre obras de nuestros artistas más reconocidos
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
          {artists.map((artist) => {
            return (
              <Link
                key={artist.id}
                href={`/products?artist=${artist.slug}`}
                className="flex items-center gap-2 justify-center px-4 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
              >
                <User className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-lg font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                  {artist.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
