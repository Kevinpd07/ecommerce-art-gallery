import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

interface SettingsBody {
  storeName?: string;
  storeEmail?: string;
  storePhone?: string;
  storeAddress?: string;
  storeDescription?: string;
  timezone?: string;
  currency?: string;
}

// Default settings fallback
const defaultSettings = {
  id: "default",
  storeName: "ArtGallery",
  storeEmail: "info@artgalleryshop.com",
  storePhone: "+1 555 123 4567",
  storeAddress: "",
  storeDescription: "",
  timezone: "america-new_york",
  currency: "usd",
  createdAt: new Date(),
  updatedAt: new Date(),
};

// GET - Fetch settings
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    let settings = await prisma.settings.findUnique({
      where: { id: "default" },
    });

    // Create default settings if not exists
    if (!settings) {
      settings = await prisma.settings.create({
        data: { id: "default" },
      });
    }

    // Transform dates to ISO strings for JSON response
    return NextResponse.json({
      id: settings.id,
      storeName: settings.storeName,
      storeEmail: settings.storeEmail,
      storePhone: settings.storePhone,
      storeAddress: settings.storeAddress,
      storeDescription: settings.storeDescription,
      timezone: settings.timezone,
      currency: settings.currency,
      createdAt: settings.createdAt.toISOString(),
      updatedAt: settings.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(defaultSettings);
  }
}

// PUT - Update settings
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body: SettingsBody = await request.json();

    // Build update data with only provided fields
    const updateData: Partial<SettingsBody> = {};
    if (body.storeName !== undefined) updateData.storeName = body.storeName;
    if (body.storeEmail !== undefined) updateData.storeEmail = body.storeEmail;
    if (body.storePhone !== undefined) updateData.storePhone = body.storePhone;
    if (body.storeAddress !== undefined)
      updateData.storeAddress = body.storeAddress;
    if (body.storeDescription !== undefined)
      updateData.storeDescription = body.storeDescription;
    if (body.timezone !== undefined) updateData.timezone = body.timezone;
    if (body.currency !== undefined) updateData.currency = body.currency;

    const settings = await prisma.settings.upsert({
      where: { id: "default" },
      update: updateData,
      create: {
        id: "default",
        storeName: body.storeName || "ArtGallery",
        storeEmail: body.storeEmail || "info@artgalleryshop.com",
        storePhone: body.storePhone || "+1 555 123 4567",
        storeAddress: body.storeAddress || "",
        storeDescription: body.storeDescription || "",
        timezone: body.timezone || "america-new_york",
        currency: body.currency || "usd",
      },
    });

    // Transform dates to ISO strings for JSON response
    return NextResponse.json({
      id: settings.id,
      storeName: settings.storeName,
      storeEmail: settings.storeEmail,
      storePhone: settings.storePhone,
      storeAddress: settings.storeAddress,
      storeDescription: settings.storeDescription,
      timezone: settings.timezone,
      currency: settings.currency,
      createdAt: settings.createdAt.toISOString(),
      updatedAt: settings.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Error al guardar configuración" },
      { status: 500 },
    );
  }
}
