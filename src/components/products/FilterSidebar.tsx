"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArtistFilter } from "./ArtistFilter";
import { PriceFilter } from "./PriceFilter";
import { CategoryFilter } from "./CategoryFilter";
import { FilterState } from "@/types";

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function FilterSidebar({
  filters,
  onFiltersChange,
}: FilterSidebarProps) {
  const hasActiveFilters =
    filters.artists.length > 0 ||
    filters.categories.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 5000;

  const handleClearFilters = () => {
    onFiltersChange({
      artists: [],
      categories: [],
      priceRange: [0, 5000],
      sortBy: filters.sortBy,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filtros</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="h-auto p-0 text-sm text-primary hover:text-primary/80"
          >
            Limpiar
            <X className="ml-1 h-3 w-3" />
          </Button>
        )}
      </div>

      <ArtistFilter
        selectedArtists={filters.artists}
        onArtistsChange={(artists) => onFiltersChange({ ...filters, artists })}
      />

      <PriceFilter
        priceRange={filters.priceRange}
        onPriceChange={(priceRange) =>
          onFiltersChange({ ...filters, priceRange })
        }
      />

      <CategoryFilter
        selectedCategories={filters.categories}
        onCategoriesChange={(categories) =>
          onFiltersChange({ ...filters, categories })
        }
      />
    </div>
  );
}
