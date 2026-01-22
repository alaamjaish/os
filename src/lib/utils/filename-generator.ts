/**
 * Generate a unique filename for an image.
 */
export function generateFilename(
  word: string,
  variationIndex: number,
  style: string
): string {
  // Sanitize word - only ASCII for Supabase Storage compatibility
  const sanitizedWord = word
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "")
    .substring(0, 30) || "image";

  const timestamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace("T", "_")
    .split(".")[0];

  return `${sanitizedWord}_${style}_${timestamp}_v${variationIndex}.png`;
}
