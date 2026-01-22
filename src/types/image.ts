export interface LocalImage {
  id: string;
  filename: string;
  word: string;
  prompt: string;
  style: string;
  mood: string;
  background: string;
  composition: string;
  aspectRatio: string;
  variationIndex: number;
  textOption: string;
  colorOption: string;
  contextHint?: string;
  imageBlob?: Blob;
  createdAt: string;
  syncedToCloud: boolean;
  cloudImageUrl?: string;
}

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
  context_hint?: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface ImageMetadata {
  word: string;
  style: string;
  mood: string;
  background: string;
  composition: string;
  aspectRatio: string;
  variationIndex: number;
  textOption: string;
  colorOption: string;
  contextHint?: string;
}
