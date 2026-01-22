export interface TextOptionDefinition {
  key: string;
  label: string;
  description: string;
}

export const TEXT_OPTIONS: Record<string, TextOptionDefinition> = {
  "no-text": {
    key: "no-text",
    label: "No Text",
    description:
      "Do NOT include any text, letters, words, numbers, or writing in the image",
  },
  "english-label": {
    key: "english-label",
    label: "English Label",
    description:
      "Include a clear, readable English text label of the word prominently displayed",
  },
  "arabic-label": {
    key: "arabic-label",
    label: "Arabic Label",
    description:
      "Include a clear, readable Arabic text label using Arabic script",
  },
};
