import { create } from "zustand";
import type { Product, Category, Artist, FilterState } from "@/types";

interface ProductsState {
  products: Product[];
  categories: Category[];
  artists: Artist[];
  featuredProducts: Product[];
  filters: FilterState;
  loading: boolean;
  error: string | null;

  // Actions
  fetchProducts: (filters?: Partial<FilterState>) => Promise<void>;
  fetchFeaturedProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchArtists: () => Promise<void>;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
}

const defaultFilters: FilterState = {
  categories: [],
  artists: [],
  priceRange: [0, 10000],
  sortBy: "newest",
};

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  categories: [],
  artists: [],
  featuredProducts: [],
  filters: defaultFilters,
  loading: false,
  error: null,

  fetchProducts: async (filterOverrides) => {
    set({ loading: true, error: null });
    try {
      const filters = { ...get().filters, ...filterOverrides };
      const params = new URLSearchParams();

      if (filters.categories.length === 1) {
        params.set("category", filters.categories[0]);
      }
      if (filters.artists.length === 1) {
        params.set("artist", filters.artists[0]);
      }
      if (filters.priceRange[0] > 0) {
        params.set("minPrice", filters.priceRange[0].toString());
      }
      if (filters.priceRange[1] < 10000) {
        params.set("maxPrice", filters.priceRange[1].toString());
      }
      if (filters.sortBy) {
        params.set("sortBy", filters.sortBy);
      }

      const response = await fetch(`/api/products?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      set({ products: data.products, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchFeaturedProducts: async () => {
    set({ error: null });
    try {
      const response = await fetch("/api/products?featured=true&limit=8");

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error:", errorData);
        throw new Error(errorData.error || "Failed to fetch featured products");
      }

      const data = await response.json();
      set({ featuredProducts: data.products });
    } catch (error) {
      console.error("Error fetching featured products:", error);
      set({ error: (error as Error).message });
    }
  },

  fetchCategories: async () => {
    try {
      const response = await fetch("/api/categories");

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error:", errorData);
        throw new Error(errorData.error || "Failed to fetch categories");
      }

      const categories = await response.json();
      set({ categories });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },

  fetchArtists: async () => {
    try {
      const response = await fetch("/api/artists");

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error:", errorData);
        throw new Error(errorData.error || "Failed to fetch artists");
      }

      const artists = await response.json();
      set({ artists });
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  resetFilters: () => {
    set({ filters: defaultFilters });
  },
}));
