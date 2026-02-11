import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { transformProduct } from "@/lib/transformers";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Query params
    const category = searchParams.get("category");
    const artist = searchParams.get("artist");
    const brand = searchParams.get("brand"); // Keep for backward compatibility
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sortBy = searchParams.get("sortBy") || "newest";
    const featured = searchParams.get("featured");
    const isNew = searchParams.get("new");
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");
    const search = searchParams.get("search");

    // Build where clause
    const where: Record<string, unknown> = {
      isActive: true,
    };

    if (category) {
      where.category = { slug: category };
    }

    if (artist || brand) {
      where.artist = { slug: artist || brand };
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice)
        (where.price as Record<string, number>).gte = Number(minPrice);
      if (maxPrice)
        (where.price as Record<string, number>).lte = Number(maxPrice);
    }

    if (featured === "true") {
      where.isFeatured = true;
    }

    if (isNew === "true") {
      where.isNew = true;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    // Build orderBy
    let orderBy: Record<string, string> = { createdAt: "desc" };
    switch (sortBy) {
      case "price-asc":
        orderBy = { price: "asc" };
        break;
      case "price-desc":
        orderBy = { price: "desc" };
        break;
      case "newest":
        orderBy = { createdAt: "desc" };
        break;
      case "popular":
        orderBy = { stock: "desc" }; // Placeholder - would use sales count
        break;
    }

    const products = await prisma.product.findMany({
      where,
      orderBy,
      include: {
        category: true,
        artist: true,
      },
      take: limit ? Number(limit) : undefined,
      skip: offset ? Number(offset) : undefined,
    });

    const total = await prisma.product.count({ where });

    return NextResponse.json({
      products: products.map(transformProduct),
      total,
      limit: limit ? Number(limit) : null,
      offset: offset ? Number(offset) : 0,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Error fetching products", details: errorMessage },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        price: body.price,
        comparePrice: body.comparePrice,
        stock: body.stock || 0,
        images: body.images || [],
        specs: body.specs || {},
        isNew: body.isNew || false,
        isFeatured: body.isFeatured || false,
        categoryId: body.categoryId,
        artistId: body.artistId || body.brandId, // Support both for backward compatibility
      },
      include: {
        category: true,
        artist: true,
      },
    });

    return NextResponse.json(transformProduct(product), { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Error creating product" },
      { status: 500 },
    );
  }
}
