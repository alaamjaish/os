"use client";

import { useGeneratorStore } from "@/store/generator-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MOODS } from "@/lib/constants/moods";
import { BACKGROUNDS } from "@/lib/constants/backgrounds";
import { COMPOSITIONS } from "@/lib/constants/compositions";
import { TEXT_OPTIONS } from "@/lib/constants/text-options";
import { COLOR_OPTIONS } from "@/lib/constants/color-options";
import { ASPECT_RATIOS } from "@/lib/constants/aspect-ratios";
import { VARIATIONS } from "@/lib/constants/variations";

export function SettingsSelectors() {
  const { settings, updateSettings } = useGeneratorStore();

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Visual Mood */}
      <div className="space-y-2">
        <Label>Visual Mood</Label>
        <Select
          value={settings.mood}
          onValueChange={(value) => updateSettings({ mood: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.values(MOODS).map((mood) => (
              <SelectItem key={mood.key} value={mood.key}>
                {mood.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Background */}
      <div className="space-y-2">
        <Label>Background</Label>
        <Select
          value={settings.background}
          onValueChange={(value) => updateSettings({ background: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.values(BACKGROUNDS).map((bg) => (
              <SelectItem key={bg.key} value={bg.key}>
                {bg.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Composition */}
      <div className="space-y-2">
        <Label>Composition</Label>
        <Select
          value={settings.composition}
          onValueChange={(value) => updateSettings({ composition: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.values(COMPOSITIONS).map((comp) => (
              <SelectItem key={comp.key} value={comp.key}>
                {comp.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Text in Image */}
      <div className="space-y-2">
        <Label>Text in Image</Label>
        <Select
          value={settings.textOption}
          onValueChange={(value) => updateSettings({ textOption: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.values(TEXT_OPTIONS).map((opt) => (
              <SelectItem key={opt.key} value={opt.key}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Color Scheme */}
      <div className="space-y-2">
        <Label>Color Scheme</Label>
        <Select
          value={settings.colorOption}
          onValueChange={(value) => updateSettings({ colorOption: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.values(COLOR_OPTIONS).map((opt) => (
              <SelectItem key={opt.key} value={opt.key}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Aspect Ratio */}
      <div className="space-y-2">
        <Label>Aspect Ratio</Label>
        <Select
          value={settings.aspectRatio}
          onValueChange={(value) => updateSettings({ aspectRatio: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.values(ASPECT_RATIOS).map((ratio) => (
              <SelectItem key={ratio.key} value={ratio.key}>
                {ratio.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Variations */}
      <div className="space-y-2">
        <Label>Variations</Label>
        <Select
          value={String(settings.variationsPerWord)}
          onValueChange={(value) =>
            updateSettings({ variationsPerWord: parseInt(value) })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {VARIATIONS.map((v) => (
              <SelectItem key={v.value} value={String(v.value)}>
                {v.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Context Hint */}
      <div className="col-span-2 space-y-2">
        <Label>Context Hint (Optional)</Label>
        <Input
          placeholder="e.g., 'person looking at map' for 'lost'"
          value={settings.contextHint || ""}
          onChange={(e) => updateSettings({ contextHint: e.target.value })}
        />
        <p className="text-xs text-muted-foreground">
          Help the AI understand context for ambiguous words
        </p>
      </div>
    </div>
  );
}
