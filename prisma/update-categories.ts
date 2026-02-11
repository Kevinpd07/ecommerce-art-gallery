import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Actualizando categorías...");

  // Obtener categorías existentes
  const existingCategories = await prisma.category.findMany();
  console.log(`Categorías existentes: ${existingCategories.length}`);

  // Nuevas categorías relacionadas con arte/cuadros
  const newCategories = [
    { name: "Realismo", slug: "realismo", icon: "Palette" },
    { name: "Abstracto", slug: "abstracto", icon: "Sparkles" },
    { name: "Impresionismo", slug: "impresionismo", icon: "Brush" },
    { name: "Surrealismo", slug: "surrealismo", icon: "Eye" },
    { name: "Minimalismo", slug: "minimalismo", icon: "Square" },
    { name: "Paisajes", slug: "paisajes", icon: "Mountain" },
    { name: "Retratos", slug: "retratos", icon: "User" },
  ];

  // Actualizar categorías existentes o crear nuevas
  for (let i = 0; i < newCategories.length; i++) {
    const newCat = newCategories[i];

    if (i < existingCategories.length) {
      // Actualizar categoría existente
      const existingCat = existingCategories[i];
      await prisma.category.update({
        where: { id: existingCat.id },
        data: {
          name: newCat.name,
          slug: newCat.slug,
          icon: newCat.icon,
        },
      });
      console.log(
        `✓ Categoría actualizada: ${existingCat.name} → ${newCat.name}`,
      );
    } else {
      // Crear nueva categoría
      await prisma.category.create({
        data: newCat,
      });
      console.log(`✓ Categoría creada: ${newCat.name}`);
    }
  }

  // Eliminar categorías sobrantes si hay más existentes que nuevas
  if (existingCategories.length > newCategories.length) {
    for (let i = newCategories.length; i < existingCategories.length; i++) {
      const catToDelete = existingCategories[i];
      // Verificar si tiene productos
      const productCount = await prisma.product.count({
        where: { categoryId: catToDelete.id },
      });

      if (productCount === 0) {
        await prisma.category.delete({
          where: { id: catToDelete.id },
        });
        console.log(`✓ Categoría eliminada: ${catToDelete.name}`);
      } else {
        console.log(
          `⚠ Categoría ${catToDelete.name} tiene ${productCount} productos, no se eliminó`,
        );
      }
    }
  }

  console.log("\n✅ Categorías actualizadas exitosamente!");
}

main()
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
