"use client";

import { useGeneratorStore } from "@/store/generator-store";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { parseWords } from "@/lib/utils/word-parser";

export function VocabularyInput() {
  const { wordsInput, setWordsInput } = useGeneratorStore();
  const parsedWords = parseWords(wordsInput);

  return (
    <div className="space-y-2">
      <Label htmlFor="vocabulary">Vocabulary Words</Label>
      <Textarea
        id="vocabulary"
        placeholder="سيارة، تمساح، كاس شاي"
        value={wordsInput}
        onChange={(e) => setWordsInput(e.target.value)}
        className="min-h-[80px] text-right"
        dir="auto"
      />
      <p className="text-xs text-muted-foreground">
        Separate with: comma, Arabic comma (،), dash, or new line
      </p>
      {parsedWords.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {parsedWords.map((word, index) => (
            <Badge key={index} variant="secondary">
              {word}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
