import { create } from "zustand";
import type { GeneratorSettings } from "@/types/generator";
import type { LocalImage } from "@/types/image";

interface GeneratorState {
  // Input
  wordsInput: string;
  setWordsInput: (input: string) => void;

  // Settings
  settings: GeneratorSettings;
  updateSettings: (partial: Partial<GeneratorSettings>) => void;
  resetSettings: () => void;
  loadPreset: (preset: GeneratorSettings) => void;

  // Selection mode
  selectionMode: "single" | "multi";
  setSelectionMode: (mode: "single" | "multi") => void;

  // Generation state
  isGenerating: boolean;
  pendingCount: number;
  generatedImages: LocalImage[];
  setIsGenerating: (value: boolean) => void;
  setPendingCount: (count: number) => void;
  incrementPendingCount: () => void;
  decrementPendingCount: () => void;
  addGeneratedImage: (image: LocalImage) => void;
  clearGeneratedImages: () => void;
}

const defaultSettings: GeneratorSettings = {
  styles: ["flat-vector"],
  mood: "bright-cheerful",
  background: "clean-removable",
  composition: "centered",
  textOption: "no-text",
  colorOption: "ai-choice",
  aspectRatio: "1:1",
  variationsPerWord: 1,
  contextHint: "",
};

export const useGeneratorStore = create<GeneratorState>((set) => ({
  // Input
  wordsInput: "",
  setWordsInput: (input) => set({ wordsInput: input }),

  // Settings
  settings: defaultSettings,
  updateSettings: (partial) =>
    set((state) => ({
      settings: { ...state.settings, ...partial },
    })),
  resetSettings: () => set({ settings: defaultSettings }),
  loadPreset: (preset) => set({ settings: preset }),

  // Selection mode
  selectionMode: "single",
  setSelectionMode: (mode) => set({ selectionMode: mode }),

  // Generation state
  isGenerating: false,
  pendingCount: 0,
  generatedImages: [],
  setIsGenerating: (value) => set({ isGenerating: value }),
  setPendingCount: (count) => set({ pendingCount: count }),
  incrementPendingCount: () =>
    set((state) => ({ pendingCount: state.pendingCount + 1 })),
  decrementPendingCount: () =>
    set((state) => ({ pendingCount: Math.max(0, state.pendingCount - 1) })),
  addGeneratedImage: (image) =>
    set((state) => ({
      generatedImages: [image, ...state.generatedImages],
    })),
  clearGeneratedImages: () => set({ generatedImages: [] }),
}));
