import type { Product, Category, Artist } from "@/types";
import type {
  Product as PrismaProduct,
  Category as PrismaCategory,
  Artist as PrismaArtist,
} from "@prisma/client";

type ProductWithRelations = PrismaProduct & {
  category: PrismaCategory;
  artist: PrismaArtist;
};

type CategoryWithCount = PrismaCategory & {
  _count?: { products: number };
};

type ArtistWithCount = PrismaArtist & {
  _count?: { products: number };
};

export function transformProduct(product: ProductWithRelations): Product {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    brand: product.artist.name,
    category: product.category.slug,
    price: Number(product.price),
    originalPrice: product.comparePrice
      ? Number(product.comparePrice)
      : undefined,
    images: product.images,
    description: product.description || "",
    specs: (product.specs as Record<string, string>) || {},
    stock: product.stock,
    isNew: product.isNew,
    isFeatured: product.isFeatured,
    rating: 4.5, // Default rating - could be calculated from reviews in the future
  };
}

export function transformCategory(category: CategoryWithCount): Category {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    icon: category.icon || "Package",
    productCount: category._count?.products || 0,
  };
}

export function transformArtist(artist: ArtistWithCount): Artist {
  return {
    id: artist.id,
    name: artist.name,
    slug: artist.slug,
    photo: artist.photo || undefined,
    bio: artist.bio || undefined,
    productCount: artist._count?.products || 0,
  };
}
