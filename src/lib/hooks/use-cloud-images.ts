"use client";

import { useCallback } from "react";
import { supabase, IMAGES_BUCKET, isSupabaseConfigured } from "@/lib/db/supabase";
import { markAsSynced } from "@/lib/db/indexeddb";
import type { LocalImage } from "@/types/image";

export interface CloudImage {
  id: string;
  filename: string;
  word: string;
  prompt: string;
  style: string;
  mood: string;
  background: string;
  composition: string;
  aspect_ratio: string;
  variation_index: number;
  text_option: string;
  color_option: string;
  context_hint: string | null;
  image_url: string;
  created_at: string;
}

export function useCloudImages() {
  // Upload a local image to Supabase
  const uploadToCloud = useCallback(async (image: LocalImage): Promise<string | null> => {
    if (!isSupabaseConfigured() || !supabase) {
      console.error("Supabase not configured");
      return null;
    }

    try {
      if (!image.imageBlob) {
        throw new Error("No image blob to upload");
      }

      // 1. Upload image to storage bucket
      const filePath = `${image.id}/${image.filename}`;
      const { error: uploadError } = await supabase.storage
        .from(IMAGES_BUCKET)
        .upload(filePath, image.imageBlob, {
          contentType: "image/png",
          upsert: true,
        });

      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        throw uploadError;
      }

      // 2. Get public URL
      const { data: urlData } = supabase.storage
        .from(IMAGES_BUCKET)
        .getPublicUrl(filePath);

      const imageUrl = urlData.publicUrl;

      // 3. Insert metadata into images table
      const { error: dbError } = await supabase.from("images").insert({
        id: image.id,
        filename: image.filename,
        word: image.word,
        prompt: image.prompt,
        style: image.style,
        mood: image.mood,
        background: image.background,
        composition: image.composition,
        aspect_ratio: image.aspectRatio,
        variation_index: image.variationIndex,
        text_option: image.textOption,
        color_option: image.colorOption,
        context_hint: image.contextHint || null,
        image_url: imageUrl,
        created_at: image.createdAt,
      });

      if (dbError) {
        console.error("Database insert error:", dbError);
        throw dbError;
      }

      // 4. Mark local image as synced
      await markAsSynced(image.id, imageUrl);

      return imageUrl;
    } catch (error) {
      console.error("Upload to cloud failed:", error);
      return null;
    }
  }, []);

  // Fetch all cloud images with optional filters
  const getCloudImages = useCallback(
    async (filters?: { word?: string; style?: string; search?: string }): Promise<CloudImage[]> => {
      if (!isSupabaseConfigured() || !supabase) {
        return [];
      }

      try {
        let query = supabase
          .from("images")
          .select("*")
          .order("created_at", { ascending: false });

        if (filters?.word) {
          query = query.eq("word", filters.word);
        }
        if (filters?.style) {
          query = query.eq("style", filters.style);
        }
        if (filters?.search) {
          query = query.ilike("word", `%${filters.search}%`);
        }

        const { data, error } = await query;

        if (error) {
          console.error("Fetch cloud images error:", error);
          return [];
        }

        return data || [];
      } catch (error) {
        console.error("Get cloud images failed:", error);
        return [];
      }
    },
    []
  );

  // Get unique words from cloud images
  const getCloudUniqueWords = useCallback(async (): Promise<string[]> => {
    if (!isSupabaseConfigured() || !supabase) {
      return [];
    }

    try {
      const { data, error } = await supabase
        .from("images")
        .select("word")
        .order("word");

      if (error) {
        console.error("Fetch unique words error:", error);
        return [];
      }

      const uniqueWords = [...new Set(data?.map((d) => d.word) || [])];
      return uniqueWords;
    } catch (error) {
      console.error("Get unique words failed:", error);
      return [];
    }
  }, []);

  // Delete a cloud image
  const deleteCloudImage = useCallback(async (image: CloudImage): Promise<boolean> => {
    if (!isSupabaseConfigured() || !supabase) {
      return false;
    }

    try {
      // 1. Delete from storage
      const filePath = `${image.id}/${image.filename}`;
      const { error: storageError } = await supabase.storage
        .from(IMAGES_BUCKET)
        .remove([filePath]);

      if (storageError) {
        console.error("Storage delete error:", storageError);
      }

      // 2. Delete from database
      const { error: dbError } = await supabase
        .from("images")
        .delete()
        .eq("id", image.id);

      if (dbError) {
        console.error("Database delete error:", dbError);
        throw dbError;
      }

      return true;
    } catch (error) {
      console.error("Delete cloud image failed:", error);
      return false;
    }
  }, []);

  return {
    uploadToCloud,
    getCloudImages,
    getCloudUniqueWords,
    deleteCloudImage,
    isConfigured: isSupabaseConfigured(),
  };
}
