import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function createAdmin() {
  const email = "admin@galeria.com";
  const password = "Admin123!";
  const name = "Administrador";

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log(`El usuario ${email} ya existe. Actualizando...`);
      await prisma.user.update({
        where: { email },
        data: {
          password: hashedPassword,
          role: "ADMIN",
          status: "ACTIVE",
        },
      });
      console.log("Usuario actualizado exitosamente!");
    } else {
      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          phone: "+51 999 888 777",
          role: "ADMIN",
          status: "ACTIVE",
        },
      });
      console.log(`Usuario administrador creado: ${email}`);
    }

    console.log("\nCredenciales:");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
