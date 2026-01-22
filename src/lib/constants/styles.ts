export interface StyleDefinition {
  key: string;
  label: string;
  category: string;
  description: string;
}

export const STYLES: Record<string, StyleDefinition> = {
  "flat-vector": {
    key: "flat-vector",
    label: "Flat Vector",
    category: "Illustration",
    description:
      "flat vector illustration with clean geometric shapes, solid colors, no gradients - modern edtech style",
  },
  "3d-pixar": {
    key: "3d-pixar",
    label: "3D Pixar",
    category: "3D Styles",
    description:
      "Pixar-style 3D render with soft lighting, rounded shapes, and friendly aesthetic",
  },
  "3d-clay": {
    key: "3d-clay",
    label: "3D Clay",
    category: "3D Styles",
    description:
      "clay-like 3D render with soft matte textures, like stop-motion claymation animation",
  },
  "3d-isometric": {
    key: "3d-isometric",
    label: "3D Isometric",
    category: "3D Styles",
    description:
      "isometric 3D illustration at 30-degree angle with clean geometric style",
  },
  "cartoon-simple": {
    key: "cartoon-simple",
    label: "Simple Cartoon",
    category: "Illustration",
    description:
      "simple cartoon style with bold black outlines, flat colors, and friendly look",
  },
  "cartoon-cute": {
    key: "cartoon-cute",
    label: "Cute/Kawaii",
    category: "Illustration",
    description:
      "adorable kawaii style with round shapes, big expressive eyes, and pastel colors",
  },
  watercolor: {
    key: "watercolor",
    label: "Watercolor",
    category: "Illustration",
    description:
      "soft watercolor painting with visible brush strokes and natural color bleeds",
  },
  "hand-drawn": {
    key: "hand-drawn",
    label: "Hand Drawn",
    category: "Illustration",
    description:
      "sketch-like hand-drawn illustration with pencil or pen texture",
  },
  lineart: {
    key: "lineart",
    label: "Line Art",
    category: "Illustration",
    description: "clean black and white line drawing with minimal shading",
  },
  sticker: {
    key: "sticker",
    label: "Sticker Style",
    category: "Sticker/Icon",
    description:
      "cute sticker design with thick white outline and vibrant saturated colors",
  },
  minimalist: {
    key: "minimalist",
    label: "Minimalist Icon",
    category: "Sticker/Icon",
    description:
      "ultra-minimalist icon style with essential shapes only, 2-3 colors maximum",
  },
  realistic: {
    key: "realistic",
    label: "Realistic",
    category: "Photographic",
    description:
      "photorealistic image with natural lighting and detailed textures",
  },
  "pixel-art": {
    key: "pixel-art",
    label: "Pixel Art",
    category: "Retro",
    description: "retro pixel art style with visible pixels, 32x32 aesthetic",
  },
  "paper-cutout": {
    key: "paper-cutout",
    label: "Paper Cutout",
    category: "Illustration",
    description:
      "layered paper cutout art with visible depth and shadows between layers",
  },
  chalkboard: {
    key: "chalkboard",
    label: "Chalkboard",
    category: "Educational",
    description:
      "chalk drawing on dark blackboard using white and colored chalk",
  },
  "gradient-mesh": {
    key: "gradient-mesh",
    label: "Gradient Mesh",
    category: "Educational",
    description:
      "smooth gradient illustrations with soft color transitions and modern look",
  },
  "pencil-sketch": {
    key: "pencil-sketch",
    label: "Pencil Sketch",
    category: "Educational",
    description:
      "graphite pencil drawing with soft shading, subtle texture, and artistic crosshatching",
  },
  doodle: {
    key: "doodle",
    label: "Doodle",
    category: "Educational",
    description:
      "playful hand-drawn doodle style with wobbly lines, casual sketchy feel, and whimsical details",
  },
  notebook: {
    key: "notebook",
    label: "Notebook",
    category: "Educational",
    description:
      "illustration on blue-lined notebook paper with a hand-drawn ballpoint pen style",
  },
  "pen-ink": {
    key: "pen-ink",
    label: "Pen & Ink",
    category: "Educational",
    description:
      "elegant pen and ink illustration with precise linework, cross-hatching, and fine details",
  },
  whiteboard: {
    key: "whiteboard",
    label: "Whiteboard",
    category: "Educational",
    description:
      "bold marker strokes on clean white background, like a classroom whiteboard drawing",
  },
  crayon: {
    key: "crayon",
    label: "Crayon",
    category: "Educational",
    description:
      "colorful crayon drawing with waxy texture and childlike artistic style",
  },
  "coloring-book": {
    key: "coloring-book",
    label: "Coloring Book",
    category: "Educational",
    description:
      "bold black outlines ready for coloring, clean spaces with no fill, coloring book page style",
  },
  textbook: {
    key: "textbook",
    label: "Textbook",
    category: "Educational",
    description:
      "clean educational textbook illustration, professional and clear with labeled-diagram aesthetic",
  },
  infographic: {
    key: "infographic",
    label: "Infographic",
    category: "Educational",
    description:
      "modern infographic style with bold geometric shapes, icons, and clean visual hierarchy",
  },
  flashcard: {
    key: "flashcard",
    label: "Flashcard",
    category: "Educational",
    description:
      "high-contrast flashcard design optimized for quick recognition, bold and simple",
  },
};

export const STYLE_CATEGORIES = [
  "3D Styles",
  "Illustration",
  "Sticker/Icon",
  "Photographic",
  "Retro",
  "Educational",
];

export const STYLES_BY_CATEGORY = Object.values(STYLES).reduce(
  (acc, style) => {
    if (!acc[style.category]) acc[style.category] = [];
    acc[style.category].push(style);
    return acc;
  },
  {} as Record<string, StyleDefinition[]>
);
