"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useGalleryStore } from "@/store/gallery-store";
import { STYLES } from "@/lib/constants/styles";

export function GalleryFilters() {
  const { filters, setFilters, uniqueWords } = useGalleryStore();

  return (
    <div className="flex flex-wrap gap-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search words..."
          value={filters.search || ""}
          onChange={(e) => setFilters({ search: e.target.value })}
          className="w-[200px] pl-9"
        />
      </div>

      <Select
        value={filters.word || "all"}
        onValueChange={(value) =>
          setFilters({ word: value === "all" ? undefined : value })
        }
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="All Words" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Words</SelectItem>
          {uniqueWords.map((word) => (
            <SelectItem key={word} value={word}>
              {word}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.style || "all"}
        onValueChange={(value) =>
          setFilters({ style: value === "all" ? undefined : value })
        }
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="All Styles" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Styles</SelectItem>
          {Object.values(STYLES).map((style) => (
            <SelectItem key={style.key} value={style.key}>
              {style.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
