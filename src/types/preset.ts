export interface Preset {
  id: string;
  name: string;
  styles: string[];
  selectionMode: "single" | "multi";
  mood: string;
  background: string;
  composition: string;
  textOption: string;
  colorOption: string;
  aspectRatio: string;
  variationsPerWord: number;
  contextHint?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PresetInput {
  name: string;
  styles: string[];
  selectionMode: "single" | "multi";
  mood: string;
  background: string;
  composition: string;
  textOption: string;
  colorOption: string;
  aspectRatio: string;
  variationsPerWord: number;
  contextHint?: string;
  isDefault?: boolean;
}
