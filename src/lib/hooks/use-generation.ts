"use client";

import { useCallback } from "react";
import { useApiKey } from "./use-api-key";
import { useGeneratorStore } from "@/store/generator-store";
import { parseWords } from "@/lib/utils/word-parser";
import { generateFilename } from "@/lib/utils/filename-generator";
import { saveImage } from "@/lib/db/indexeddb";
import type { GeneratorSettings, GenerationTask } from "@/types/generator";
import type { LocalImage } from "@/types/image";

export function useGeneration() {
  const { apiKey } = useApiKey();
  const {
    setIsGenerating,
    setPendingCount,
    decrementPendingCount,
    addGeneratedImage,
  } = useGeneratorStore();

  const generateImages = useCallback(
    async (wordsInput: string, settings: GeneratorSettings) => {
      if (!apiKey) {
        console.error("API key not configured");
        return;
      }

      const words = parseWords(wordsInput);
      if (words.length === 0) {
        console.error("No words provided");
        return;
      }

      // Build task queue
      const tasks: GenerationTask[] = [];
      for (const word of words) {
        for (const style of settings.styles) {
          for (let v = 1; v <= settings.variationsPerWord; v++) {
            tasks.push({ word, style, variationIndex: v });
          }
        }
      }

      setIsGenerating(true);
      setPendingCount(tasks.length);

      // Process tasks with concurrency limit
      const concurrencyLimit = 3;
      for (let i = 0; i < tasks.length; i += concurrencyLimit) {
        const batch = tasks.slice(i, i + concurrencyLimit);

        await Promise.all(
          batch.map(async (task) => {
            try {
              // Stage 1: Generate concept
              const conceptResponse = await fetch("/api/gemini/concept", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  apiKey,
                  word: task.word,
                  contextHint: settings.contextHint,
                }),
              });

              if (!conceptResponse.ok) {
                throw new Error("Concept generation failed");
              }

              const { concept } = await conceptResponse.json();

              // Stage 2: Generate image
              const imageResponse = await fetch("/api/gemini/image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  apiKey,
                  concept,
                  word: task.word,
                  style: task.style,
                  mood: settings.mood,
                  background: settings.background,
                  composition: settings.composition,
                  textOption: settings.textOption,
                  colorOption: settings.colorOption,
                  aspectRatio: settings.aspectRatio,
                }),
              });

              if (!imageResponse.ok) {
                throw new Error("Image generation failed");
              }

              const { imageBase64, prompt } = await imageResponse.json();

              // Convert to blob
              const imageBlob = base64ToBlob(imageBase64, "image/png");

              // Create local image record
              const localImage: LocalImage = {
                id: crypto.randomUUID(),
                filename: generateFilename(
                  task.word,
                  task.variationIndex,
                  task.style
                ),
                word: task.word,
                prompt,
                style: task.style,
                mood: settings.mood,
                background: settings.background,
                composition: settings.composition,
                aspectRatio: settings.aspectRatio,
                variationIndex: task.variationIndex,
                textOption: settings.textOption,
                colorOption: settings.colorOption,
                contextHint: settings.contextHint,
                imageBlob,
                createdAt: new Date().toISOString(),
                syncedToCloud: false,
              };

              // Save to IndexedDB immediately (auto-save)
              await saveImage(localImage);

              // Add to generated images in store
              addGeneratedImage(localImage);

              decrementPendingCount();
            } catch (error) {
              console.error("Generation failed for task:", task, error);
              decrementPendingCount();
            }
          })
        );
      }

      setIsGenerating(false);
    },
    [
      apiKey,
      setIsGenerating,
      setPendingCount,
      decrementPendingCount,
      addGeneratedImage,
    ]
  );

  return { generateImages };
}

function base64ToBlob(base64: string, mimeType: string): Blob {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}
