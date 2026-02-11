"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProductsStore } from "@/stores/products-store";

interface ArtistFilterProps {
  selectedArtists: string[];
  onArtistsChange: (artists: string[]) => void;
}

export function ArtistFilter({
  selectedArtists,
  onArtistsChange,
}: ArtistFilterProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { artists } = useProductsStore();

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleArtistToggle = (artistName: string) => {
    if (selectedArtists.includes(artistName)) {
      onArtistsChange(selectedArtists.filter((a) => a !== artistName));
    } else {
      onArtistsChange([...selectedArtists, artistName]);
    }
  };

  return (
    <div className="border-b pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-2 font-medium"
      >
        Artista
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      {isOpen && (
        <div className="mt-2 space-y-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar artista..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-9 text-sm"
            />
          </div>

          <div className="max-h-48 space-y-2 overflow-y-auto">
            {filteredArtists.map((artist) => (
              <div key={artist.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`artist-${artist.id}`}
                  checked={selectedArtists.includes(artist.name)}
                  onCheckedChange={() => handleArtistToggle(artist.name)}
                />
                <Label
                  htmlFor={`artist-${artist.id}`}
                  className="flex flex-1 cursor-pointer items-center justify-between text-sm"
                >
                  <span>{artist.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {artist.productCount}
                  </span>
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
