import { openDB, DBSchema, IDBPDatabase } from "idb";
import type { LocalImage } from "@/types/image";

const DB_NAME = "vocabulary-image-generator";
const DB_VERSION = 1;

interface VocabImageDB extends DBSchema {
  images: {
    key: string;
    value: LocalImage;
    indexes: {
      "by-word": string;
      "by-style": string;
      "by-created": string;
    };
  };
}

let dbPromise: Promise<IDBPDatabase<VocabImageDB>> | null = null;

export function getDB() {
  if (typeof window === "undefined") {
    throw new Error("IndexedDB is only available in the browser");
  }

  if (!dbPromise) {
    dbPromise = openDB<VocabImageDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        const imageStore = db.createObjectStore("images", { keyPath: "id" });
        imageStore.createIndex("by-word", "word");
        imageStore.createIndex("by-style", "style");
        imageStore.createIndex("by-created", "createdAt");
      },
    });
  }
  return dbPromise;
}

export async function saveImage(image: LocalImage): Promise<void> {
  const db = await getDB();
  await db.put("images", image);
}

export async function getImage(id: string): Promise<LocalImage | undefined> {
  const db = await getDB();
  return db.get("images", id);
}

export async function getAllImages(): Promise<LocalImage[]> {
  const db = await getDB();
  const images = await db.getAll("images");
  // Sort by created date descending
  return images.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getImagesByWord(word: string): Promise<LocalImage[]> {
  const db = await getDB();
  return db.getAllFromIndex("images", "by-word", word);
}

export async function getImagesByStyle(style: string): Promise<LocalImage[]> {
  const db = await getDB();
  return db.getAllFromIndex("images", "by-style", style);
}

export async function deleteImage(id: string): Promise<void> {
  const db = await getDB();
  await db.delete("images", id);
}

export async function markAsSynced(
  id: string,
  cloudUrl: string
): Promise<void> {
  const db = await getDB();
  const image = await db.get("images", id);
  if (image) {
    image.syncedToCloud = true;
    image.cloudImageUrl = cloudUrl;
    await db.put("images", image);
  }
}

export async function getUniqueWords(): Promise<string[]> {
  const db = await getDB();
  const images = await db.getAll("images");
  const words = [...new Set(images.map((img) => img.word))];
  return words.sort();
}

export async function clearAllImages(): Promise<void> {
  const db = await getDB();
  await db.clear("images");
}
