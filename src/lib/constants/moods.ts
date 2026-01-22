export interface MoodDefinition {
  key: string;
  label: string;
  description: string;
}

export const MOODS: Record<string, MoodDefinition> = {
  "bright-cheerful": {
    key: "bright-cheerful",
    label: "Bright & Cheerful",
    description:
      "bright and cheerful colors with high saturation and positive energy",
  },
  "soft-calm": {
    key: "soft-calm",
    label: "Soft & Calm",
    description:
      "soft and calm pastel tones with gentle contrast and peaceful feel",
  },
  "bold-vibrant": {
    key: "bold-vibrant",
    label: "Bold & Vibrant",
    description:
      "bold and vibrant colors with strong contrast and dynamic energy",
  },
  "neutral-professional": {
    key: "neutral-professional",
    label: "Neutral/Professional",
    description: "neutral and professional colors with balanced tones",
  },
};
