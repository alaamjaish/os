"use client";

import { useState, useEffect, useCallback } from "react";

const API_KEY_STORAGE_KEY = "gemini-api-key";

export function useApiKey() {
  const [apiKey, setApiKeyState] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from localStorage on mount
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(API_KEY_STORAGE_KEY);
      setApiKeyState(stored);
      setIsLoaded(true);
    }
  }, []);

  const setApiKey = useCallback((key: string) => {
    localStorage.setItem(API_KEY_STORAGE_KEY, key);
    setApiKeyState(key);
  }, []);

  const clearApiKey = useCallback(() => {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    setApiKeyState(null);
  }, []);

  const testApiKey = useCallback(async (key: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/gemini/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: key }),
      });
      return response.ok;
    } catch {
      return false;
    }
  }, []);

  return {
    apiKey,
    isLoaded,
    hasApiKey: !!apiKey,
    setApiKey,
    clearApiKey,
    testApiKey,
  };
}
