"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VocabularyInput } from "./vocabulary-input";
import { StyleSelector } from "./style-selector";
import { SettingsSelectors } from "./settings-selectors";
import { GenerateButton } from "./generate-button";

export function GeneratorPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Images</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 stagger">
        <VocabularyInput />
        <StyleSelector />
        <SettingsSelectors />
        <GenerateButton />
      </CardContent>
    </Card>
  );
}
