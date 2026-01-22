import { create } from "zustand";
import type { LocalImage } from "@/types/image";
import type { CloudImage } from "@/lib/hooks/use-cloud-images";

interface GalleryFilters {
  search?: string;
  word?: string;
  style?: string;
}

interface GalleryState {
  localImages: LocalImage[];
  cloudImages: CloudImage[];
  isLoading: boolean;
  filters: GalleryFilters;
  uniqueWords: string[];
  activeTab: "local" | "cloud";

  setLocalImages: (images: LocalImage[]) => void;
  setCloudImages: (images: CloudImage[]) => void;
  setIsLoading: (value: boolean) => void;
  setFilters: (filters: Partial<GalleryFilters>) => void;
  resetFilters: () => void;
  setUniqueWords: (words: string[]) => void;
  setActiveTab: (tab: "local" | "cloud") => void;
}

export const useGalleryStore = create<GalleryState>((set) => ({
  localImages: [],
  cloudImages: [],
  isLoading: false,
  filters: {},
  uniqueWords: [],
  activeTab: "local",

  setLocalImages: (images) => set({ localImages: images }),
  setCloudImages: (images) => set({ cloudImages: images }),
  setIsLoading: (value) => set({ isLoading: value }),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  resetFilters: () => set({ filters: {} }),
  setUniqueWords: (words) => set({ uniqueWords: words }),
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
