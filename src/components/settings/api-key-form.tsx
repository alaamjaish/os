"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApiKey } from "@/lib/hooks/use-api-key";
import { Eye, EyeOff, Check, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ApiKeyForm() {
  const { apiKey, setApiKey, clearApiKey, testApiKey, isLoaded } = useApiKey();
  const [inputValue, setInputValue] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<"success" | "error" | null>(
    null
  );

  // Initialize input value when API key loads
  useEffect(() => {
    if (isLoaded && apiKey && !inputValue) {
      setInputValue(apiKey);
    }
  }, [isLoaded, apiKey]);

  const handleTest = async () => {
    const keyToTest = inputValue || apiKey;
    if (!keyToTest) return;

    setIsTesting(true);
    setTestResult(null);

    const success = await testApiKey(keyToTest);
    setTestResult(success ? "success" : "error");
    setIsTesting(false);
  };

  const handleSave = () => {
    if (inputValue) {
      setApiKey(inputValue);
      setTestResult(null);
    }
  };

  const handleClear = () => {
    clearApiKey();
    setInputValue("");
    setTestResult(null);
  };

  const displayValue = apiKey && !inputValue ? apiKey : inputValue;
  const hasUnsavedChanges = inputValue && inputValue !== apiKey;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="api-key">Gemini API Key</Label>
        <div className="relative">
          <Input
            id="api-key"
            type={showKey ? "text" : "password"}
            placeholder="Enter your Gemini API key"
            value={displayValue || ""}
            onChange={(e) => setInputValue(e.target.value)}
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
            onClick={() => setShowKey(!showKey)}
          >
            {showKey ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Your API key is stored securely in your browser&apos;s local storage
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={handleSave} disabled={!inputValue || !hasUnsavedChanges}>
          Save API Key
        </Button>
        <Button variant="outline" onClick={handleTest} disabled={isTesting}>
          {isTesting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Test API Key
        </Button>
        <Button
          variant="outline"
          onClick={handleClear}
          disabled={!apiKey}
          className="text-destructive hover:text-destructive"
        >
          Clear API Key
        </Button>
      </div>

      {testResult && (
        <div
          className={cn(
            "flex items-center gap-2 rounded-md p-3",
            testResult === "success"
              ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
              : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
          )}
        >
          {testResult === "success" ? (
            <>
              <Check className="h-4 w-4" />
              <span>API key is valid and working</span>
            </>
          ) : (
            <>
              <X className="h-4 w-4" />
              <span>API key is invalid or not working</span>
            </>
          )}
        </div>
      )}

      {apiKey && !hasUnsavedChanges && (
        <div className="flex items-center gap-2 rounded-md bg-green-50 p-3 text-green-700 dark:bg-green-950 dark:text-green-300">
          <Check className="h-4 w-4" />
          <span>API key loaded from storage</span>
        </div>
      )}
    </div>
  );
}
