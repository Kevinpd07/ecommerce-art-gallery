"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/admin/ImageUpload";

interface UploadedImage {
  url: string;
  publicId: string;
}

interface ProductFormData {
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  stock: number;
  categoryId: string;
  artistId: string;
  isNew: boolean;
  isFeatured: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Artist {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  stock: number;
  images: string[];
  isNew: boolean;
  isFeatured: boolean;
  categoryId: string;
  artistId: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [categories, setCategories] = useState<Category[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<UploadedImage[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    defaultValues: {
      isNew: false,
      isFeatured: false,
      stock: 0,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product
        const productRes = await fetch(`/api/products/${productId}`);
        if (!productRes.ok) {
          router.push("/admin/products");
          return;
        }
        const productData = await productRes.json();
        setProduct(productData);

        // Convert images to uploaded format
        if (productData.images) {
          setImages(
            productData.images.map((url: string, index: number) => ({
              url,
              publicId: `existing-${index}`,
            })),
          );
        }

        // Reset form with product data
        reset({
          name: productData.name,
          slug: productData.slug,
          description: productData.description,
          price: productData.price,
          comparePrice: productData.comparePrice || undefined,
          stock: productData.stock,
          categoryId: productData.categoryId,
          artistId: productData.artistId,
          isNew: productData.isNew,
          isFeatured: productData.isFeatured,
        });

        // Fetch categories and artists
        const [categoriesRes, artistsRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/artists"),
        ]);

        const categoriesData = await categoriesRes.json();
        const artistsData = await artistsRes.json();

        setCategories(categoriesData || []);
        setArtists(artistsData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        router.push("/admin/products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId, router, reset]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const onSubmit = async (data: ProductFormData) => {
    if (images.length === 0) {
      alert("Debes subir al menos una imagen");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          images: images.map((img) => img.url),
        }),
      });

      if (!response.ok) throw new Error("Error updating product");

      router.push("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Editar Obra</h1>
          <p className="text-muted-foreground">Modifica los datos de la obra</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Información Básica</CardTitle>
            <CardDescription>Datos principales de la obra</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  placeholder="Nombre de la obra"
                  {...register("name", {
                    onChange: (e) => {
                      setValue("slug", generateSlug(e.target.value));
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  placeholder="nombre-de-la-obra"
                  {...register("slug")}
                />
                {errors.slug && (
                  <p className="text-sm text-destructive">
                    {errors.slug.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Descripción detallada de la obra"
                rows={4}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="categoryId">Categoría</Label>
                <Select
                  value={watch("categoryId")}
                  onValueChange={(value) => setValue("categoryId", value)}
                >
                  <SelectTrigger id="categoryId">
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.categoryId && (
                  <p className="text-sm text-destructive">
                    {errors.categoryId.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="artistId">Artista</Label>
                <Select
                  value={watch("artistId")}
                  onValueChange={(value) => setValue("artistId", value)}
                >
                  <SelectTrigger id="artistId">
                    <SelectValue placeholder="Seleccionar artista" />
                  </SelectTrigger>
                  <SelectContent>
                    {artists.map((artist) => (
                      <SelectItem key={artist.id} value={artist.id}>
                        {artist.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.artistId && (
                  <p className="text-sm text-destructive">
                    {errors.artistId.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Precio e Inventario</CardTitle>
            <CardDescription>Configura precio y disponibilidad</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="price">Precio ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("price", { valueAsNumber: true })}
                />
                {errors.price && (
                  <p className="text-sm text-destructive">
                    {errors.price.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="comparePrice">Precio anterior (opcional)</Label>
                <Input
                  id="comparePrice"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("comparePrice", { valueAsNumber: true })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="0"
                  {...register("stock", { valueAsNumber: true })}
                />
                {errors.stock && (
                  <p className="text-sm text-destructive">
                    {errors.stock.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Imágenes</CardTitle>
            <CardDescription>
              Sube las imágenes de la obra (máximo 5)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUpload value={images} onChange={setImages} maxImages={5} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Opciones</CardTitle>
            <CardDescription>Configuraciones adicionales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isNew"
                checked={watch("isNew")}
                onCheckedChange={(checked) => setValue("isNew", !!checked)}
              />
              <Label htmlFor="isNew" className="font-normal">
                Marcar como obra nueva
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isFeatured"
                checked={watch("isFeatured")}
                onCheckedChange={(checked) => setValue("isFeatured", !!checked)}
              />
              <Label htmlFor="isFeatured" className="font-normal">
                Mostrar en obras destacadas
              </Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/products">Cancelar</Link>
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              "Guardar Cambios"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
