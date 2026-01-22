"use client";

import { useEffect, useCallback } from "react";
import { useGalleryStore } from "@/store/gallery-store";
import { useCloudImages } from "@/lib/hooks/use-cloud-images";
import { getAllImages, getUniqueWords, deleteImage as deleteLocalImage } from "@/lib/db/indexeddb";
import { ImageCard } from "@/components/shared/image-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Image as ImageIcon } from "lucide-react";
import type { LocalImage } from "@/types/image";

interface GalleryGridProps {
  source: "local" | "cloud";
}

export function GalleryGrid({ source }: GalleryGridProps) {
  const {
    localImages,
    cloudImages,
    isLoading,
    filters,
    setLocalImages,
    setCloudImages,
    setIsLoading,
    setUniqueWords,
  } = useGalleryStore();

  const { uploadToCloud, getCloudImages, getCloudUniqueWords, deleteCloudImage } = useCloudImages();

  const loadLocalImages = useCallback(async () => {
    setIsLoading(true);
    try {
      let images = await getAllImages();
      const words = await getUniqueWords();

      // Apply filters
      if (filters.search) {
        const search = filters.search.toLowerCase();
        images = images.filter((img) => img.word.toLowerCase().includes(search));
      }
      if (filters.word) {
        images = images.filter((img) => img.word === filters.word);
      }
      if (filters.style) {
        images = images.filter((img) => img.style === filters.style);
      }

      setLocalImages(images);
      setUniqueWords(words);
    } catch (error) {
      console.error("Failed to load local images:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filters, setLocalImages, setUniqueWords, setIsLoading]);

  const loadCloudImages = useCallback(async () => {
    setIsLoading(true);
    try {
      const images = await getCloudImages(filters);
      const words = await getCloudUniqueWords();
      setCloudImages(images);
      setUniqueWords(words);
    } catch (error) {
      console.error("Failed to load cloud images:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filters, getCloudImages, getCloudUniqueWords, setCloudImages, setUniqueWords, setIsLoading]);

  useEffect(() => {
    if (source === "local") {
      loadLocalImages();
    } else {
      loadCloudImages();
    }
  }, [source, filters, loadLocalImages, loadCloudImages]);

  const handleUploadToCloud = useCallback(
    async (image: LocalImage) => {
      const url = await uploadToCloud(image);
      if (url) {
        // Refresh local images to show synced status
        await loadLocalImages();
      }
    },
    [uploadToCloud, loadLocalImages]
  );

  const handleDeleteLocal = useCallback(
    async (id: string) => {
      await deleteLocalImage(id);
      await loadLocalImages();
    },
    [loadLocalImages]
  );

  const handleDeleteCloud = useCallback(
    async (image: typeof cloudImages[0]) => {
      const success = await deleteCloudImage(image);
      if (success) {
        await loadCloudImages();
      }
    },
    [deleteCloudImage, loadCloudImages]
  );

  const images = source === "local" ? localImages : cloudImages;

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded-lg" />
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <ImageIcon className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">No images found</h3>
        <p className="text-sm text-muted-foreground">
          {source === "local"
            ? "Generate some images to see them here"
            : "Upload images to cloud to see them here"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {source === "local"
        ? localImages.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onDelete={() => handleDeleteLocal(image.id)}
              onUploadToCloud={() => handleUploadToCloud(image)}
            />
          ))
        : cloudImages.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              isCloud
              onDelete={() => handleDeleteCloud(image)}
            />
          ))}
    </div>
  );
}
