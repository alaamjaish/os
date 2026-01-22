"use client";

import { GeneratorPanel } from "@/components/generator/generator-panel";
import { ResultsPanel } from "@/components/generator/results-panel";

export default function GeneratorPage() {
  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <GeneratorPanel />
        <ResultsPanel />
      </div>
    </div>
  );
}
