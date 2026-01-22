"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Cloud, Trash2, Check, Loader2 } from "lucide-react";
import type { LocalImage } from "@/types/image";
import type { CloudImage } from "@/lib/hooks/use-cloud-images";
import { STYLES } from "@/lib/constants/styles";

interface ImageCardProps {
  image: LocalImage | CloudImage;
  isCloud?: boolean;
  onDelete?: () => void;
  onUploadToCloud?: () => Promise<void>;
}

export function ImageCard({
  image,
  isCloud = false,
  onDelete,
  onUploadToCloud,
}: ImageCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Type guards
  const isLocalImage = (img: LocalImage | CloudImage): img is LocalImage => {
    return "imageBlob" in img;
  };

  const localImage = isLocalImage(image) ? image : null;
  const cloudImage = !isLocalImage(image) ? image : null;

  useEffect(() => {
    if (localImage?.imageBlob) {
      const url = URL.createObjectURL(localImage.imageBlob);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (localImage?.cloudImageUrl) {
      setImageUrl(localImage.cloudImageUrl);
    } else if (cloudImage?.image_url) {
      setImageUrl(cloudImage.image_url);
    }
  }, [localImage, cloudImage]);

  const handleDownload = () => {
    if (!imageUrl) return;
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = image.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleUpload = async () => {
    if (!onUploadToCloud) return;
    setIsUploading(true);
    try {
      await onUploadToCloud();
    } finally {
      setIsUploading(false);
    }
  };

  const word = image.word;
  const style = image.style;
  const aspectRatio = isLocalImage(image) ? image.aspectRatio : image.aspect_ratio;
  const createdAt = isLocalImage(image) ? image.createdAt : image.created_at;
  const isSynced = localImage?.syncedToCloud || isCloud;

  const styleLabel = STYLES[style]?.label || style;

  return (
    <Card className="group relative overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-square">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={word}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-muted-foreground">Loading...</span>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              size="icon"
              variant="secondary"
              onClick={handleDownload}
              title="Download"
            >
              <Download className="h-4 w-4" />
            </Button>

            {!isSynced && onUploadToCloud && (
              <Button
                size="icon"
                variant="secondary"
                onClick={handleUpload}
                disabled={isUploading}
                title="Upload to Cloud"
              >
                {isUploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Cloud className="h-4 w-4" />
                )}
              </Button>
            )}

            {onDelete && (
              <Button
                size="icon"
                variant="destructive"
                onClick={onDelete}
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          {isSynced && (
            <div className="absolute right-2 top-2">
              <Badge
                variant="secondary"
                className="bg-green-500/90 text-white hover:bg-green-500"
              >
                <Check className="mr-1 h-3 w-3" />
                Synced
              </Badge>
            </div>
          )}
        </div>

        <div className="p-3">
          <h3 className="font-semibold" dir="auto">
            {word}
          </h3>
          <p className="text-xs text-muted-foreground">
            {new Date(createdAt).toLocaleDateString()}
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-xs">
              {styleLabel}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {aspectRatio}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
