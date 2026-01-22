# Vocabulary Image Generator - Handoff Plan

## Project Overview
An AI-powered vocabulary flashcard image generator for Arabic learners. Users enter words, select styles, and generate educational images using Gemini API.

**Location:** `C:\Users\Alaa M. Jaish\Desktop\Programming\Agentic_JOURNEY\Clients\images_arabently`

---

## What's Already Done

### Core Infrastructure
- [x] Next.js 16 + TypeScript + Tailwind v4 setup
- [x] shadcn/ui components (Button, Card, Select, Tabs, Dialog, Input, Textarea, Badge, Skeleton, Toggle, ScrollArea)
- [x] Project structure with `src/app`, `src/components`, `src/lib`, `src/store`, `src/types`

### Pages
- [x] **Generator** (`/`) - Main page with two-column layout
- [x] **Gallery** (`/gallery`) - Browse images with Local/Cloud tabs
- [x] **Settings** (`/settings`) - API key configuration

### Generator Features
- [x] Vocabulary input with word parsing (comma, Arabic comma, dash, newline separators)
- [x] 26 art styles with Single/Multi-Style toggle
- [x] All selectors: Mood, Background, Composition, Text Option, Color Scheme, Aspect Ratio, Variations
- [x] Context hint input
- [x] Generate button with pending count

### Storage
- [x] **IndexedDB** (`src/lib/db/indexeddb.ts`) - Auto-saves generated images locally
- [x] **localStorage** - Stores API key

### State Management
- [x] `src/store/generator-store.ts` - Generator page state
- [x] `src/store/gallery-store.ts` - Gallery page state

### API Routes
- [x] `/api/gemini/test` - Test API key validity
- [x] `/api/gemini/concept` - Stage 1: Generate visual concept (Gemini 2.0 Flash)
- [x] `/api/gemini/image` - Stage 2: Generate image using **Nano Banana Pro** (`gemini-3-pro-image-preview`)

### Constants (all in `src/lib/constants/`)
- [x] `styles.ts` - 26 art styles with descriptions
- [x] `moods.ts` - 4 visual moods
- [x] `backgrounds.ts` - 6 background options
- [x] `compositions.ts` - 5 composition options
- [x] `text-options.ts` - No Text, English Label, Arabic Label
- [x] `color-options.ts` - AI's Choice, Brand Colors
- [x] `aspect-ratios.ts` - 10 aspect ratio options
- [x] `variations.ts` - 1-4 variations per word

---

## What Needs To Be Done

### Phase 1: Supabase Integration

#### Step 1: Setup Supabase Project
1. User needs to create a Supabase project at https://supabase.com
2. Get the project URL and anon key
3. Create `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

#### Step 2: Create Database Tables
Run this SQL in Supabase SQL Editor:

```sql
-- Enable UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Images table (for cloud-synced images)
CREATE TABLE images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL UNIQUE,
  word TEXT NOT NULL,
  prompt TEXT NOT NULL,
  style TEXT NOT NULL,
  mood TEXT NOT NULL,
  background TEXT NOT NULL,
  composition TEXT NOT NULL,
  aspect_ratio TEXT NOT NULL,
  variation_index INTEGER NOT NULL DEFAULT 1,
  text_option TEXT NOT NULL,
  color_option TEXT NOT NULL,
  context_hint TEXT,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_images_word ON images(word);
CREATE INDEX idx_images_style ON images(style);
CREATE INDEX idx_images_created_at ON images(created_at DESC);

-- Presets table
CREATE TABLE presets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  styles TEXT[] NOT NULL,
  selection_mode TEXT NOT NULL DEFAULT 'single',
  mood TEXT NOT NULL,
  background TEXT NOT NULL,
  composition TEXT NOT NULL,
  text_option TEXT NOT NULL,
  color_option TEXT NOT NULL,
  aspect_ratio TEXT NOT NULL,
  variations_per_word INTEGER NOT NULL DEFAULT 1,
  context_hint TEXT,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Only one default preset allowed
CREATE UNIQUE INDEX idx_presets_default ON presets(is_default) WHERE is_default = TRUE;
```

#### Step 3: Create Storage Bucket
In Supabase Dashboard > Storage:
1. Create bucket named `vocabulary-images`
2. Set to **Public**
3. Allow mime types: `image/png`, `image/jpeg`, `image/webp`

#### Step 4: Create Supabase Client
Create `src/lib/db/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

#### Step 5: Implement Cloud Image Functions
Create `src/lib/hooks/use-cloud-images.ts`:
- `uploadImageToCloud(localImage)` - Upload blob to storage, save metadata to table
- `getCloudImages(filters)` - Fetch images from Supabase
- `deleteCloudImage(id)` - Delete from storage and table

#### Step 6: Update ImageCard Component
In `src/components/shared/image-card.tsx`:
- Wire up the "Upload to Cloud" button to call `uploadImageToCloud`
- Show loading state during upload
- Update `syncedToCloud` status after successful upload

#### Step 7: Update Gallery Store
In `src/store/gallery-store.ts`:
- Update `loadImages` function to fetch from Supabase when `source === "cloud"`

---

### Phase 2: Presets System

#### Step 1: Create Presets Hook
Create `src/lib/hooks/use-presets.ts`:
```typescript
// Functions needed:
- getPresets() - Fetch all presets from Supabase
- getDefaultPreset() - Fetch the preset where is_default = true
- savePreset(preset) - Insert new preset
- updatePreset(id, preset) - Update existing preset
- deletePreset(id) - Delete preset
- setDefaultPreset(id) - Set one preset as default (unset others)
```

#### Step 2: Create Presets Section Component
Create `src/components/generator/presets-section.tsx`:
- Dropdown to select from saved presets
- "Save" button to save current settings as new preset
- "Manage" button to open manage modal

#### Step 3: Create Preset Modal
Create `src/components/shared/preset-modal.tsx`:
- **Save Mode**: Name input, "Set as default" checkbox, preview of settings, Save button
- **Manage Mode**: List of presets with Load/Set Default/Delete actions

#### Step 4: Add to Generator Panel
In `src/components/generator/generator-panel.tsx`:
- Add `<PresetsSection />` at the top (before VocabularyInput)

#### Step 5: Load Default Preset on Page Load
In `src/app/page.tsx` or generator-panel:
- On mount, fetch default preset
- If exists, call `loadPreset()` from generator store

---

## File Structure After Completion

```
src/
├── lib/
│   ├── db/
│   │   ├── indexeddb.ts     ✅ exists
│   │   └── supabase.ts      ❌ create this
│   └── hooks/
│       ├── use-api-key.ts   ✅ exists
│       ├── use-generation.ts ✅ exists
│       ├── use-cloud-images.ts  ❌ create this
│       └── use-presets.ts   ❌ create this
├── components/
│   ├── generator/
│   │   ├── presets-section.tsx  ❌ create this
│   │   └── ... (others exist)
│   └── shared/
│       ├── image-card.tsx   ✅ exists (update for cloud upload)
│       └── preset-modal.tsx ❌ create this
```

---

## Testing Checklist

After implementation, verify:

1. **Supabase Connection**
   - [ ] Can test API key in Settings
   - [ ] Images upload to Supabase storage bucket
   - [ ] Image metadata saves to `images` table
   - [ ] Gallery "Cloud" tab shows uploaded images
   - [ ] Can delete cloud images

2. **Presets**
   - [ ] Can save current settings as preset
   - [ ] Presets appear in dropdown
   - [ ] Selecting preset loads all settings
   - [ ] Can set a preset as default
   - [ ] Default preset auto-loads on page refresh
   - [ ] Can delete presets

---

## Commands

```bash
# Navigate to project
cd "C:\Users\Alaa M. Jaish\Desktop\Programming\Agentic_JOURNEY\Clients\images_arabently"

# Install dependencies (if needed)
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

---

## Reference Files

- `prd.md` - Full product requirements document
- `src/types/image.ts` - LocalImage interface
- `src/types/preset.ts` - Preset interface
- `src/store/generator-store.ts` - Has `loadPreset()` function already

Good luck! The foundation is solid. Just need Supabase + Presets to complete the app.
