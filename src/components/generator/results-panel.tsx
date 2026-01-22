"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette } from "lucide-react";
import { useGeneratorStore } from "@/store/generator-store";
import { useCloudImages } from "@/lib/hooks/use-cloud-images";
import { deleteImage, getAllImages } from "@/lib/db/indexeddb";
import { ImageCard } from "@/components/shared/image-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCallback, useEffect, useState } from "react";

export function ResultsPanel() {
  const { generatedImages, isGenerating, pendingCount } = useGeneratorStore();
  const [isLoadingRecent, setIsLoadingRecent] = useState(true);

  // Load recent images from IndexedDB on mount
  useEffect(() => {
    const loadRecentImages = async () => {
      try {
        const allImages = await getAllImages();
        // Load most recent images (up to 20)
        const recentImages = allImages.slice(0, 20);
        useGeneratorStore.setState({ generatedImages: recentImages });
      } catch (error) {
        console.error("Failed to load recent images:", error);
      } finally {
        setIsLoadingRecent(false);
      }
    };

    // Only load if no images in store yet
    if (generatedImages.length === 0) {
      loadRecentImages();
    } else {
      setIsLoadingRecent(false);
    }
  }, []);
  const { uploadToCloud } = useCloudImages();

  const handleUploadToCloud = useCallback(
    async (image: typeof generatedImages[0]) => {
      const url = await uploadToCloud(image);
      if (url) {
        // Update the image in the store to show synced status
        const updatedImage = { ...image, syncedToCloud: true, cloudImageUrl: url };
        // Force re-render by updating the store
        useGeneratorStore.setState((state) => ({
          generatedImages: state.generatedImages.map((img) =>
            img.id === image.id ? updatedImage : img
          ),
        }));
      }
    },
    [uploadToCloud]
  );

  const handleDelete = useCallback(async (id: string) => {
    await deleteImage(id);
    useGeneratorStore.setState((state) => ({
      generatedImages: state.generatedImages.filter((img) => img.id !== id),
    }));
  }, []);

  if (isLoadingRecent) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Images</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={`loading-${i}`} className="aspect-square rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (generatedImages.length === 0 && !isGenerating) {
    return (
      <Card className="flex min-h-[400px] flex-col items-center justify-center">
        <CardContent className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Palette className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">Generated Images</h3>
          <p className="text-sm text-muted-foreground">
            Your generated images will appear here
          </p>
          <p className="text-xs text-muted-foreground">
            Enter vocabulary words and click Generate
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Generated Images
          {pendingCount > 0 && (
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({pendingCount} pending)
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {isGenerating &&
            Array.from({ length: pendingCount }).map((_, i) => (
              <Skeleton key={`skeleton-${i}`} className="aspect-square rounded-lg" />
            ))}
          {generatedImages.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onDelete={() => handleDelete(image.id)}
              onUploadToCloud={() => handleUploadToCloud(image)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
