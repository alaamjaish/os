"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { useGeneratorStore } from "@/store/generator-store";
import { useGeneration } from "@/lib/hooks/use-generation";
import { useApiKey } from "@/lib/hooks/use-api-key";
import { parseWords } from "@/lib/utils/word-parser";

export function GenerateButton() {
  const { wordsInput, settings, isGenerating, pendingCount } =
    useGeneratorStore();
  const { generateImages } = useGeneration();
  const { hasApiKey } = useApiKey();

  const parsedWords = parseWords(wordsInput);
  const isDisabled = parsedWords.length === 0 || !hasApiKey;

  const handleGenerate = async () => {
    if (isDisabled) return;
    await generateImages(wordsInput, settings);
  };

  const buttonText = () => {
    if (!hasApiKey) return "Configure API Key in Settings";
    if (isGenerating && pendingCount > 0)
      return `Generating... (${pendingCount} pending)`;
    return "Generate Images";
  };

  return (
    <Button
      onClick={handleGenerate}
      disabled={isDisabled}
      className="w-full"
      size="lg"
    >
      {isGenerating ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="mr-2 h-4 w-4" />
      )}
      {buttonText()}
    </Button>
  );
}
