import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.artist.deleteMany();
  await prisma.user.deleteMany();

  // Create Categories (Art Styles)
  const categoriesData = [
    { name: "Abstracto", slug: "abstracto", icon: "Palette" },
    { name: "Realismo", slug: "realismo", icon: "Eye" },
    { name: "Impresionismo", slug: "impresionismo", icon: "Brush" },
    { name: "Surrealismo", slug: "surrealismo", icon: "Sparkles" },
    { name: "Minimalismo", slug: "minimalismo", icon: "Square" },
    { name: "Arte Moderno", slug: "arte-moderno", icon: "Zap" },
    { name: "Paisajes", slug: "paisajes", icon: "Mountain" },
  ];

  const categories: Record<string, string> = {};
  for (const cat of categoriesData) {
    const created = await prisma.category.create({ data: cat });
    categories[cat.slug] = created.id;
  }
  console.log(`Created ${categoriesData.length} categories`);

  // Create Artists
  const artistsData = [
    {
      name: "María González",
      slug: "maria-gonzalez",
      bio: "Artista contemporánea especializada en arte abstracto",
    },
    {
      name: "Carlos Mendoza",
      slug: "carlos-mendoza",
      bio: "Pintor realista con más de 20 años de experiencia",
    },
    {
      name: "Ana Rodríguez",
      slug: "ana-rodriguez",
      bio: "Artista impresionista inspirada en la naturaleza",
    },
    {
      name: "Luis Fernández",
      slug: "luis-fernandez",
      bio: "Creador de obras surrealistas únicas",
    },
    {
      name: "Elena Torres",
      slug: "elena-torres",
      bio: "Especialista en minimalismo y arte moderno",
    },
    {
      name: "Diego Ramírez",
      slug: "diego-ramirez",
      bio: "Paisajista con enfoque en escenas naturales",
    },
    {
      name: "Sofia Martínez",
      slug: "sofia-martinez",
      bio: "Artista versátil con estilo contemporáneo",
    },
    {
      name: "Pablo Herrera",
      slug: "pablo-herrera",
      bio: "Pintor abstracto con técnicas innovadoras",
    },
    {
      name: "Carmen López",
      slug: "carmen-lopez",
      bio: "Artista realista especializada en retratos",
    },
    {
      name: "Roberto Silva",
      slug: "roberto-silva",
      bio: "Creador de arte moderno y experimental",
    },
  ];

  const artists: Record<string, string> = {};
  for (const artist of artistsData) {
    const created = await prisma.artist.create({ data: artist });
    artists[artist.name] = created.id;
  }
  console.log(`Created ${artistsData.length} artists`);

  // Create Products (Art Paintings)
  const productsData = [
    {
      name: "Sinfonía de Colores",
      slug: "sinfonia-de-colores",
      artist: "María González",
      category: "abstracto",
      price: 1299.99,
      comparePrice: 1499.99,
      images: [
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
        "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800",
      ],
      description:
        "Obra abstracta vibrante que explora la interacción de colores primarios y formas geométricas",
      specs: {
        Dimensiones: "120 x 90 cm",
        Técnica: "Acrílico sobre lienzo",
        Año: "2024",
        Marco: "Incluido",
      },
      stock: 1,
      isNew: true,
      isFeatured: true,
    },
    {
      name: "Retrato de Mujer Elegante",
      slug: "retrato-mujer-elegante",
      artist: "Carlos Mendoza",
      category: "realismo",
      price: 2499.99,
      images: [
        "https://images.unsplash.com/photo-1578926314433-e2789279f4aa?w=800",
      ],
      description:
        "Retrato realista que captura la elegancia y profundidad del sujeto con técnica magistral",
      specs: {
        Dimensiones: "80 x 60 cm",
        Técnica: "Óleo sobre lienzo",
        Año: "2023",
        Marco: "Incluido",
      },
      stock: 1,
      isNew: true,
      isFeatured: true,
    },
    {
      name: "Jardín al Atardecer",
      slug: "jardin-al-atardecer",
      artist: "Ana Rodríguez",
      category: "impresionismo",
      price: 899.99,
      comparePrice: 1099.99,
      images: [
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800",
      ],
      description:
        "Pintura impresionista que captura la luz dorada del atardecer en un jardín floreciente",
      specs: {
        Dimensiones: "100 x 70 cm",
        Técnica: "Óleo sobre lienzo",
        Año: "2024",
        Marco: "Incluido",
      },
      stock: 1,
      isNew: false,
      isFeatured: true,
    },
    {
      name: "Sueños Flotantes",
      slug: "suenos-flotantes",
      artist: "Luis Fernández",
      category: "surrealismo",
      price: 1799.99,
      comparePrice: 1999.99,
      images: [
        "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800",
      ],
      description:
        "Obra surrealista que desafía la realidad con elementos oníricos y composición única",
      specs: {
        Dimensiones: "110 x 85 cm",
        Técnica: "Técnica mixta",
        Año: "2024",
        Marco: "Incluido",
      },
      stock: 1,
      isNew: false,
      isFeatured: true,
    },
    {
      name: "Esencia Minimalista",
      slug: "esencia-minimalista",
      artist: "Elena Torres",
      category: "minimalismo",
      price: 699.99,
      images: [
        "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800",
      ],
      description:
        "Composición minimalista que explora el espacio negativo y la simplicidad elegante",
      specs: {
        Dimensiones: "90 x 90 cm",
        Técnica: "Acrílico sobre lienzo",
        Año: "2024",
        Marco: "Incluido",
      },
      stock: 2,
      isNew: true,
      isFeatured: false,
    },
    {
      name: "Montañas Majestuosas",
      slug: "montanas-majestuosas",
      artist: "Diego Ramírez",
      category: "paisajes",
      price: 1199.99,
      images: [
        "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800",
      ],
      description:
        "Paisaje impresionante que captura la grandeza de las montañas al amanecer",
      specs: {
        Dimensiones: "140 x 80 cm",
        Técnica: "Óleo sobre lienzo",
        Año: "2023",
        Marco: "Incluido",
      },
      stock: 1,
      isNew: false,
      isFeatured: false,
    },
    {
      name: "Geometría Urbana",
      slug: "geometria-urbana",
      artist: "Sofia Martínez",
      category: "arte-moderno",
      price: 849.99,
      images: [
        "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=800",
      ],
      description:
        "Arte moderno que explora las formas geométricas de la arquitectura urbana",
      specs: {
        Dimensiones: "100 x 100 cm",
        Técnica: "Acrílico sobre lienzo",
        Año: "2024",
        Marco: "Incluido",
      },
      stock: 2,
      isNew: true,
      isFeatured: true,
    },
    {
      name: "Explosión Cromática",
      slug: "explosion-cromatica",
      artist: "Pablo Herrera",
      category: "abstracto",
      price: 1499.99,
      images: [
        "https://images.unsplash.com/photo-1561214078-f3247647fc5e?w=800",
      ],
      description:
        "Obra abstracta dinámica con técnica de goteo y colores vibrantes",
      specs: {
        Dimensiones: "130 x 95 cm",
        Técnica: "Acrílico y técnica mixta",
        Año: "2024",
        Marco: "Incluido",
      },
      stock: 1,
      isNew: false,
      isFeatured: false,
    },
    {
      name: "Mirada Profunda",
      slug: "mirada-profunda",
      artist: "Carmen López",
      category: "realismo",
      price: 1899.99,
      comparePrice: 2199.99,
      images: [
        "https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=800",
      ],
      description:
        "Retrato realista que captura la intensidad y emoción en la mirada del sujeto",
      specs: {
        Dimensiones: "70 x 50 cm",
        Técnica: "Óleo sobre lienzo",
        Año: "2023",
        Marco: "Incluido",
      },
      stock: 1,
      isNew: false,
      isFeatured: true,
    },
    {
      name: "Bosque Impresionista",
      slug: "bosque-impresionista",
      artist: "Ana Rodríguez",
      category: "impresionismo",
      price: 1099.99,
      images: [
        "https://images.unsplash.com/photo-1579541814924-49fef17c5be5?w=800",
      ],
      description:
        "Escena de bosque con juego de luces y sombras al estilo impresionista",
      specs: {
        Dimensiones: "110 x 75 cm",
        Técnica: "Óleo sobre lienzo",
        Año: "2024",
        Marco: "Incluido",
      },
      stock: 1,
      isNew: true,
      isFeatured: false,
    },
    {
      name: "Formas en Movimiento",
      slug: "formas-en-movimiento",
      artist: "Roberto Silva",
      category: "arte-moderno",
      price: 949.99,
      images: [
        "https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=800",
      ],
      description:
        "Arte moderno experimental que explora el movimiento a través de formas fluidas",
      specs: {
        Dimensiones: "95 x 95 cm",
        Técnica: "Acrílico sobre lienzo",
        Año: "2024",
        Marco: "Incluido",
      },
      stock: 2,
      isNew: false,
      isFeatured: false,
    },
    {
      name: "Serenidad Minimalista",
      slug: "serenidad-minimalista",
      artist: "Elena Torres",
      category: "minimalismo",
      price: 599.99,
      images: [
        "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800",
      ],
      description:
        "Composición minimalista que transmite paz y equilibrio visual",
      specs: {
        Dimensiones: "80 x 80 cm",
        Técnica: "Acrílico sobre lienzo",
        Año: "2024",
        Marco: "Incluido",
      },
      stock: 3,
      isNew: true,
      isFeatured: false,
    },
  ];

  for (const product of productsData) {
    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        comparePrice: product.comparePrice,
        stock: product.stock,
        images: product.images,
        specs: product.specs,
        isNew: product.isNew,
        isFeatured: product.isFeatured,
        categoryId: categories[product.category],
        artistId: artists[product.artist],
      },
    });
  }
  console.log(`Created ${productsData.length} products`);

  // Create Admin User
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@artgallery.com",
      password: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu9lK", // password: admin123
      name: "Admin User",
      phone: "+51 999 888 777",
      role: "ADMIN",
      status: "ACTIVE",
    },
  });
  console.log(`Created admin user: ${adminUser.email}`);

  // Create Test Customer
  const customerUser = await prisma.user.create({
    data: {
      email: "juan@email.com",
      password: "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu9lK", // password: admin123
      name: "Juan Perez",
      phone: "+51 987 654 321",
      role: "CUSTOMER",
      status: "ACTIVE",
    },
  });
  console.log(`Created customer user: ${customerUser.email}`);

  // Create Address for Customer
  await prisma.address.create({
    data: {
      label: "Casa",
      name: "Juan Perez",
      phone: "+51 987 654 321",
      address: "Av. Javier Prado 1234",
      city: "Lima",
      state: "Lima",
      zipCode: "15036",
      isDefault: true,
      userId: customerUser.id,
    },
  });
  console.log("Created address for customer");

  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
