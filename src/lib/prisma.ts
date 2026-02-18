import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

function createPrismaClient(): PrismaClient {
  // Validate DATABASE_URL exists
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not defined in environment variables");
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Add connection timeout settings
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    max: 10,
  });

  pool.on("error", (err) => {
    console.error("Unexpected error on idle client", err);
  });

  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter }) as PrismaClient;
}

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
