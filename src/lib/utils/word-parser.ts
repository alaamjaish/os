/**
 * Parse vocabulary words from input string.
 * Supports comma (,), Arabic comma (،), dash (-), and newline as separators.
 */
export function parseWords(input: string): string[] {
  if (!input.trim()) return [];

  // Split by comma, Arabic comma, dash, or newline
  const separators = /[,،\-\n]/;

  return input
    .split(separators)
    .map((word) => word.trim())
    .filter((word) => word.length > 0);
}
