# Guía de Migración: De Tienda de Tecnología a Galería de Arte

Este documento describe los cambios realizados para transformar el proyecto de una tienda de equipos tecnológicos a una galería de arte online.

## Cambios Principales

### 1. Base de Datos (Prisma Schema)

**Cambios en el modelo:**

- `Brand` → `Artist`
  - Campo `logo` → `photo`
  - Nuevo campo `bio` para biografía del artista
- `Product.brandId` → `Product.artistId`
- Tabla `brands` → `artists`

**Archivo modificado:** [`prisma/schema.prisma`](prisma/schema.prisma)

### 2. Datos de Semilla

**Categorías actualizadas:**

- Computadoras → Abstracto
- Monitores → Realismo
- Teclados → Impresionismo
- Mouse → Surrealismo
- Audífonos → Minimalismo
- Almacenamiento → Arte Moderno
- Componentes → Paisajes

**Artistas en lugar de marcas:**

- María González (Arte Abstracto)
- Carlos Mendoza (Realismo)
- Ana Rodríguez (Impresionismo)
- Luis Fernández (Surrealismo)
- Elena Torres (Minimalismo)
- Diego Ramírez (Paisajes)
- Sofia Martínez (Arte Moderno)
- Pablo Herrera (Arte Abstracto)

**Productos actualizados:**

- Todos los productos ahora son cuadros de arte
- Especificaciones incluyen: Dimensiones, Técnica, Año, Marco

**Archivo modificado:** [`prisma/seed.ts`](prisma/seed.ts)

### 3. Tipos TypeScript

**Nuevos tipos:**

- Interface `Artist` con campos: id, name, photo, bio, productCount
- `FilterState.artists` agregado para filtrado por artista

**Archivos modificados:**

- [`src/types/index.ts`](src/types/index.ts)

### 4. API Routes

**Nuevas rutas:**

- `/api/artists` - GET y POST para artistas

**Rutas modificadas:**

- `/api/products` - Ahora usa `artistId` en lugar de `brandId`
- Soporte para parámetro `artist` en queries

**Archivos:**

- [`src/app/api/artists/route.ts`](src/app/api/artists/route.ts) (nuevo)
- [`src/app/api/products/route.ts`](src/app/api/products/route.ts) (modificado)

### 5. Transformadores

**Nuevas funciones:**

- `transformArtist()` - Transforma datos de artista de Prisma a formato de aplicación

**Funciones modificadas:**

- `transformProduct()` - Ahora usa `product.artist.name` en lugar de `product.brand.name`

**Archivo modificado:** [`src/lib/transformers.ts`](src/lib/transformers.ts)

### 6. Componentes de UI

**Componentes modificados:**

1. **HeroBanner** ([`src/components/home/HeroBanner.tsx`](src/components/home/HeroBanner.tsx))
   - Slides actualizados con contenido de arte
   - Nuevas categorías: Abstracto, Realismo, Paisajes

2. **BrandSection** ([`src/components/home/BrandSection.tsx`](src/components/home/BrandSection.tsx))
   - Título: "Marcas que Confiamos" → "Artistas Destacados"
   - Ahora muestra artistas en lugar de marcas
   - Importa `artists` en lugar de `brands`

3. **CategoryGrid** ([`src/components/home/CategoryGrid.tsx`](src/components/home/CategoryGrid.tsx))
   - Iconos actualizados para estilos de arte:
     - Palette, Eye, Brush, Sparkles, Square, Zap, Mountain

### 7. Datos Mock

**Archivo modificado:** [`src/data/mock-products.ts`](src/data/mock-products.ts)

- Categorías actualizadas con estilos de arte
- Array `artists` exportado con artistas
- Array `brands` vacío (mantenido para compatibilidad)
- Productos actualizados con obras de arte

### 8. Documentación

**README actualizado:**

- Nombre del proyecto: BasicTechShop → ArtGallery
- Descripción actualizada para galería de arte
- Referencias a "hardware" cambiadas a "cuadros de arte"
- Referencias a "marcas" cambiadas a "artistas"

**Archivos modificados:**

- [`README.md`](README.md)
- [`package.json`](package.json) - nombre del proyecto actualizado

## Pasos para Aplicar los Cambios

### 1. Regenerar Cliente de Prisma

```bash
npx prisma generate
```

### 2. Crear Nueva Migración

```bash
npx prisma migrate dev --name transform_to_art_gallery
```

### 3. Sembrar Base de Datos

```bash
npx prisma db seed
```

O usando el script npm:

```bash
npm run db:seed
```

### 4. Reiniciar Servidor de Desarrollo

```bash
npm run dev
```

## Notas Importantes

### Compatibilidad Retroactiva

Algunos cambios mantienen compatibilidad con el código anterior:

- La API de productos acepta tanto `artistId` como `brandId`
- La API de productos acepta tanto `artist` como `brand` en query params
- El tipo `Brand` se mantiene en el código (aunque vacío en mock data)

### Cambios Pendientes

Los siguientes archivos pueden necesitar actualizaciones adicionales:

- Componentes de filtros de productos (BrandFilter → ArtistFilter)
- Componentes del panel de administración
- Stores de Zustand (si usan brands)
- Formularios de creación/edición de productos

### Imágenes

Las imágenes de los productos ahora apuntan a obras de arte de Unsplash. Considera:

- Reemplazar con imágenes propias de obras de arte
- Optimizar imágenes para mejor rendimiento
- Agregar atribuciones si es necesario

## Verificación

Después de aplicar los cambios, verifica:

1. ✅ La base de datos se migra correctamente
2. ✅ Los datos de semilla se cargan sin errores
3. ✅ La página principal muestra categorías de arte
4. ✅ Los productos muestran información de artistas
5. ✅ Las rutas de API funcionan correctamente
6. ✅ No hay errores de TypeScript

## Soporte

Si encuentras problemas durante la migración:

1. Revisa los logs de Prisma para errores de migración
2. Verifica que todas las dependencias estén instaladas
3. Asegúrate de que la base de datos esté accesible
4. Regenera el cliente de Prisma si hay errores de tipos
