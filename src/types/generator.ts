export interface GeneratorSettings {
  styles: string[];
  mood: string;
  background: string;
  composition: string;
  textOption: string;
  colorOption: string;
  aspectRatio: string;
  variationsPerWord: number;
  contextHint?: string;
}

export interface GenerationTask {
  word: string;
  style: string;
  variationIndex: number;
}

export interface GenerationResult {
  task: GenerationTask;
  success: boolean;
  imageId?: string;
  error?: string;
}
