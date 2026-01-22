export interface ColorOptionDefinition {
  key: string;
  label: string;
  description: string;
}

export const COLOR_OPTIONS: Record<string, ColorOptionDefinition> = {
  "ai-choice": {
    key: "ai-choice",
    label: "AI's Choice",
    description: "Let the AI decide appropriate colors for the subject",
  },
  "brand-colors": {
    key: "brand-colors",
    label: "Brand Colors",
    description:
      "Use teal (#00ADB5) as primary and orange (#FF7E36) as accent throughout the image",
  },
};
