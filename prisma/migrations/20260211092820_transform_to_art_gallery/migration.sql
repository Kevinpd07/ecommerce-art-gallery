-- CreateTable: artists table
CREATE TABLE "artists" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "photo" TEXT,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "artists_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "artists_slug_key" ON "artists"("slug");

-- Step 1: Create a default "Unknown Artist" to assign to existing products
INSERT INTO "artists" ("id", "name", "slug", "createdAt", "updatedAt")
VALUES ('default-artist-id', 'Unknown Artist', 'unknown-artist', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Step 2: Migrate brand data to artists table
-- Copy all brands as artists (since brands will become artists in the art gallery)
INSERT INTO "artists" ("id", "name", "slug", "photo", "createdAt", "updatedAt")
SELECT "id", "name", "slug", "logo" as "photo", "createdAt", "updatedAt"
FROM "brands";

-- Step 3: Add artistId column as nullable first
ALTER TABLE "products" ADD COLUMN "artistId" TEXT;

-- Step 4: Migrate existing products to use their brand as artist
UPDATE "products" SET "artistId" = "brandId";

-- Step 5: Create index on artistId
CREATE INDEX "products_artistId_idx" ON "products"("artistId");

-- Step 6: Add foreign key constraint
ALTER TABLE "products" ADD CONSTRAINT "products_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Step 7: Make artistId NOT NULL (now that all products have an artist)
ALTER TABLE "products" ALTER COLUMN "artistId" SET NOT NULL;

-- Step 8: Drop the old brand relationship
ALTER TABLE "products" DROP CONSTRAINT "products_brandId_fkey";
DROP INDEX "products_brandId_idx";
ALTER TABLE "products" DROP COLUMN "brandId";

-- Step 9: Drop the brands table
DROP TABLE "brands";
