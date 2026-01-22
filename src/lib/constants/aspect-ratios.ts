export interface AspectRatioDefinition {
  key: string;
  label: string;
  description: string;
}

export const ASPECT_RATIOS: Record<string, AspectRatioDefinition> = {
  "1:1": {
    key: "1:1",
    label: "1:1 (Square)",
    description: "Flashcards, social media",
  },
  "16:9": {
    key: "16:9",
    label: "16:9 (Wide)",
    description: "Presentations, video thumbnails",
  },
  "9:16": {
    key: "9:16",
    label: "9:16 (Tall)",
    description: "Mobile stories, vertical content",
  },
  "4:3": {
    key: "4:3",
    label: "4:3 (Standard)",
    description: "Traditional display",
  },
  "3:4": {
    key: "3:4",
    label: "3:4 (Portrait)",
    description: "Portrait orientation",
  },
  "3:2": {
    key: "3:2",
    label: "3:2 (Photo)",
    description: "Standard photography",
  },
  "2:3": {
    key: "2:3",
    label: "2:3 (Portrait Photo)",
    description: "Vertical photography",
  },
  "4:5": {
    key: "4:5",
    label: "4:5 (Instagram)",
    description: "Instagram posts",
  },
  "5:4": {
    key: "5:4",
    label: "5:4 (Album)",
    description: "Album cover",
  },
  "21:9": {
    key: "21:9",
    label: "21:9 (Ultrawide)",
    description: "Cinematic, banners",
  },
};
