"use client";

import { useGeneratorStore } from "@/store/generator-store";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { STYLES, STYLE_CATEGORIES } from "@/lib/constants/styles";
import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function StyleSelector() {
  const { settings, updateSettings, selectionMode, setSelectionMode } =
    useGeneratorStore();

  const handleStyleClick = (styleKey: string) => {
    if (selectionMode === "single") {
      updateSettings({ styles: [styleKey] });
    } else {
      const currentStyles = settings.styles;
      if (currentStyles.includes(styleKey)) {
        if (currentStyles.length > 1) {
          updateSettings({
            styles: currentStyles.filter((s) => s !== styleKey),
          });
        }
      } else {
        updateSettings({ styles: [...currentStyles, styleKey] });
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Art Style</Label>
        <ToggleGroup
          type="single"
          value={selectionMode}
          onValueChange={(v) => {
            if (v) {
              setSelectionMode(v as "single" | "multi");
              if (v === "single" && settings.styles.length > 1) {
                updateSettings({ styles: [settings.styles[0]] });
              }
            }
          }}
          size="sm"
        >
          <ToggleGroupItem value="single">Single</ToggleGroupItem>
          <ToggleGroupItem value="multi">Multi-Style</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {Object.values(STYLES).map((style) => (
          <Button
            key={style.key}
            variant={settings.styles.includes(style.key) ? "default" : "outline"}
            size="sm"
            className={cn(
              "h-auto py-2 text-xs",
              settings.styles.includes(style.key) &&
                "bg-primary text-primary-foreground"
            )}
            onClick={() => handleStyleClick(style.key)}
          >
            {style.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
