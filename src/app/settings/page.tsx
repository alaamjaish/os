"use client";

import { ApiKeyForm } from "@/components/settings/api-key-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="container py-6 page-enter">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Configure your API key and application preferences
        </p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
            <CardDescription>
              Enter your Gemini API key to enable image generation. Your key is
              stored locally in your browser and never sent to our servers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ApiKeyForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
