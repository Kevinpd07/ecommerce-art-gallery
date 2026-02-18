import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { transformArtist } from "@/lib/transformers";

export async function GET() {
  try {
    const artists = await prisma.artist.findMany({
      include: {
        _count: {
          select: { products: { where: { isActive: true } } },
        },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(artists.map(transformArtist));
  } catch (error) {
    console.error("Error fetching artists:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Error fetching artists", details: errorMessage },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const artist = await prisma.artist.create({
      data: {
        name: body.name,
        slug: body.slug,
        photo: body.photo,
        bio: body.bio,
      },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    return NextResponse.json(transformArtist(artist), { status: 201 });
  } catch (error) {
    console.error("Error creating artist:", error);
    return NextResponse.json(
      { error: "Error creating artist" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const artist = await prisma.artist.update({
      where: { id: body.id },
      data: {
        name: body.name,
        slug: body.slug,
        photo: body.photo,
        bio: body.bio,
      },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    return NextResponse.json(transformArtist(artist));
  } catch (error) {
    console.error("Error updating artist:", error);
    return NextResponse.json(
      { error: "Error updating artist" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Artist ID is required" },
        { status: 400 },
      );
    }

    await prisma.artist.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting artist:", error);
    return NextResponse.json(
      { error: "Error deleting artist" },
      { status: 500 },
    );
  }
}
