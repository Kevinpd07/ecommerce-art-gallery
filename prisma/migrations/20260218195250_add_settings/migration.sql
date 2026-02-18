-- CreateTable
CREATE TABLE "settings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "storeName" TEXT NOT NULL DEFAULT 'BasicTechShop',
    "storeEmail" TEXT NOT NULL DEFAULT 'info@basictechshop.com',
    "storePhone" TEXT NOT NULL DEFAULT '+1 555 123 4567',
    "storeAddress" TEXT NOT NULL DEFAULT '',
    "storeDescription" TEXT NOT NULL DEFAULT '',
    "timezone" TEXT NOT NULL DEFAULT 'america-new_york',
    "currency" TEXT NOT NULL DEFAULT 'usd',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);
