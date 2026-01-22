export interface BackgroundDefinition {
  key: string;
  label: string;
  description: string;
}

export const BACKGROUNDS: Record<string, BackgroundDefinition> = {
  "clean-removable": {
    key: "clean-removable",
    label: "Clean/Removable",
    description:
      "pure clean white background, subject isolated for easy background removal",
  },
  "solid-white": {
    key: "solid-white",
    label: "Solid White",
    description: "solid white background, clean and minimal",
  },
  "solid-color": {
    key: "solid-color",
    label: "Solid Color",
    description:
      "solid single color background (soft gray or cream), clean and undistracting",
  },
  "soft-gradient": {
    key: "soft-gradient",
    label: "Soft Gradient",
    description:
      "subtle soft gradient background that doesn't distract from the subject",
  },
  "full-scene": {
    key: "full-scene",
    label: "Full Scene",
    description:
      "contextual scene background showing the subject in a relevant environment",
  },
  vignette: {
    key: "vignette",
    label: "Vignette",
    description: "subject centered with soft vignette edges fading to white",
  },
};
