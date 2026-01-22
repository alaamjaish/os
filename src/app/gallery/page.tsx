"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GalleryFilters } from "@/components/gallery/gallery-filters";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { HardDrive, Cloud } from "lucide-react";

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<"local" | "cloud">("local");

  return (
    <div className="container py-6 page-enter">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Gallery</h1>
        <p className="text-muted-foreground">
          Browse and manage your generated images
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as "local" | "cloud")}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="local" className="gap-2">
              <HardDrive className="h-4 w-4" />
              My Device
            </TabsTrigger>
            <TabsTrigger value="cloud" className="gap-2">
              <Cloud className="h-4 w-4" />
              Cloud (Shared)
            </TabsTrigger>
          </TabsList>
          <GalleryFilters />
        </div>

        <TabsContent value="local" className="mt-6">
          <GalleryGrid source="local" />
        </TabsContent>

        <TabsContent value="cloud" className="mt-6">
          <GalleryGrid source="cloud" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
