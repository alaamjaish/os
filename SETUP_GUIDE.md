# 🎨 Vocabulary Image Generator - Complete Setup Guide

Welcome! This guide will walk you through setting up your own instance of the Vocabulary Image Generator app from scratch.

---

## 📖 What is This Application?

The **Vocabulary Image Generator** is an AI-powered tool that creates beautiful educational flashcard images for vocabulary words. It's designed for language learners (especially Saudi dialect Arabic) who need visual aids for memorization.

### Key Features:
- **AI Image Generation**: Uses Google's Gemini API to generate custom flashcard images
- **26 Art Styles**: From 3D Pixar to watercolor, sketch, minimalist icons, and more
- **Customization Options**: Mood, background, composition, text labels, aspect ratios
- **Local + Cloud Storage**: Images save locally first, with optional cloud sync
- **Presets System**: Save your favorite settings and reuse them
- **Gallery**: Browse, filter, search, and manage all your images

---

## 🛠️ Prerequisites

Before you begin, make sure you have:

1. **Node.js 20+** installed ([Download](https://nodejs.org/))
2. A **Supabase account** (free tier works fine) - [Sign up](https://supabase.com/)
3. A **Google Gemini API key** - [Get one here](https://aistudio.google.com/app/apikey)

---

## 📋 Step-by-Step Setup

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd images_arabently
```

### Step 2: Install Dependencies

```bash
npm install
```

---

## 🗄️ Step 3: Set Up Supabase (Database + Storage)

This is the most important step! You need to create your own Supabase project.

### 3.1 Create a Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **"New Project"**
3. Fill in:
   - **Organization**: Select or create one
   - **Project Name**: `vocabulary-images` (or any name you like)
   - **Database Password**: Generate and **save this password** somewhere safe!
   - **Region**: Choose the closest to your location
4. Click **"Create new project"**
5. Wait for the project to be ready (1-2 minutes)

### 3.2 Get Your API Credentials

1. In your Supabase project, go to **Settings** → **API**
2. Copy these two values:
   - **Project URL** (looks like `https://xxxxxxxx.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

### 3.3 Create the Database Tables

1. In Supabase, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Paste the following SQL and run it:

```sql
-- ============================================
-- VOCABULARY IMAGE GENERATOR - DATABASE SETUP
-- ============================================
-- Run this ONCE when setting up a new project

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- IMAGES TABLE
-- Stores metadata for all cloud-synced images
-- ============================================
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

-- Performance indexes
CREATE INDEX idx_images_word ON images(word);
CREATE INDEX idx_images_style ON images(style);
CREATE INDEX idx_images_created_at ON images(created_at DESC);

-- ============================================
-- PRESETS TABLE
-- Stores saved generation presets
-- ============================================
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

4. Click **"Run"** (or press Ctrl+Enter)
5. You should see "Success. No rows returned" - that's correct!

### 3.4 Create the Storage Bucket

1. Go to **Storage** (left sidebar)
2. Click **"New bucket"**
3. Fill in:
   - **Name**: `vocabulary-images` (⚠️ must be exactly this name!)
   - **Public bucket**: ✅ Toggle ON
   - **Allowed MIME types**: `image/png, image/jpeg, image/webp`
4. Click **"Create bucket"**

### 3.5 Set Up Storage Policies

Images need to be publicly accessible. Run these in the **SQL Editor**:

```sql
-- ============================================
-- STORAGE POLICIES
-- Allow public access to the vocabulary-images bucket
-- ============================================

-- Allow anyone to upload images
CREATE POLICY "Public can upload to vocabulary-images"
ON storage.objects
FOR INSERT
TO anon
WITH CHECK (bucket_id = 'vocabulary-images');

-- Allow anyone to read/view images
CREATE POLICY "Public can read vocabulary-images"
ON storage.objects
FOR SELECT
TO anon
USING (bucket_id = 'vocabulary-images');

-- Allow anyone to delete images
CREATE POLICY "Public can delete vocabulary-images"
ON storage.objects
FOR DELETE
TO anon
USING (bucket_id = 'vocabulary-images');

-- Allow anyone to update images
CREATE POLICY "Public can update vocabulary-images"
ON storage.objects
FOR UPDATE
TO anon
USING (bucket_id = 'vocabulary-images')
WITH CHECK (bucket_id = 'vocabulary-images');
```

Click **"Run"** - you should see "Success" again.

---

## 🔐 Step 4: Configure Environment Variables

1. In the project root folder, create a file named `.env.local`
2. Add your Supabase credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...YOUR_ANON_KEY_HERE

# Note: Gemini API key is NOT stored here - users enter it in the app
```

Replace:
- `YOUR_PROJECT_ID` with your actual project reference (from the URL)
- `YOUR_ANON_KEY_HERE` with the full anon key you copied earlier

> ⚠️ **Important**: The `.env.local` file is in `.gitignore`, so it won't be committed to git. You'll need to create this file on every machine where you run the app.

---

## 🚀 Step 5: Run the Application

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Step 6: Configure Your Gemini API Key (In-App)

The Gemini API key is stored **in your browser**, not on the server. This means:
- Each user needs to enter their own API key
- The key is saved in localStorage and persists between sessions
- The key is never sent to any server except Google's API

### To Set Up:

1. Go to the **Settings** page (click the gear icon)
2. Enter your Gemini API key
3. Click **"Test API Key"** to verify it works
4. Click **"Save"**

### Get a Gemini API Key:

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the key and paste it in the Settings page

---

## 📚 How to Use the Application

### Generating Images

1. **Enter Words**: Type vocabulary words in the input box (separated by commas, newlines, or dashes)
2. **Choose Style**: Select one or multiple art styles (e.g., "3D Pixar", "Watercolor", "Sticker")
3. **Customize**:
   - **Mood**: Bright & Cheerful, Soft & Calm, Bold & Vibrant, etc.
   - **Background**: Clean/Removable, Solid Color, Full Scene, etc.
   - **Composition**: Centered, Full Body, Close-up, etc.
   - **Text Option**: No Text, English Label, Arabic Label
   - **Aspect Ratio**: 1:1 Square, 16:9 Wide, and more
4. **Click "Generate Images"**
5. Images appear on the right panel as they're generated

### Managing Images

- **Download**: Click the download icon to save an image
- **Upload to Cloud**: Click the cloud icon to sync an image to Supabase
- **Delete**: Click the trash icon to remove an image

### Gallery

- **My Device Tab**: Shows images saved locally in your browser (IndexedDB)
- **Cloud Tab**: Shows images uploaded to your Supabase storage
- **Filters**: Search by word or filter by style

### Presets (Coming Soon)

- Save your favorite generation settings
- Load presets with one click
- Set a default preset that loads automatically

---

## 🏗️ Project Structure

```
images_arabently/
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── page.tsx            # Generator page (main)
│   │   ├── gallery/page.tsx    # Gallery page
│   │   ├── settings/page.tsx   # Settings page
│   │   └── api/gemini/         # API routes for Gemini
│   ├── components/             # React components
│   │   ├── generator/          # Generator page components
│   │   ├── gallery/            # Gallery page components
│   │   ├── settings/           # Settings page components
│   │   ├── shared/             # Shared components
│   │   └── ui/                 # shadcn/ui components
│   ├── lib/
│   │   ├── constants/          # Style options, moods, etc.
│   │   ├── db/
│   │   │   ├── indexeddb.ts    # Local storage (browser)
│   │   │   └── supabase.ts     # Cloud storage client
│   │   └── hooks/              # React hooks
│   ├── store/                  # Zustand state management
│   └── types/                  # TypeScript interfaces
├── .env.local                  # Your environment variables (create this!)
├── package.json
└── SETUP_GUIDE.md              # This file
```

---

## 🔧 Troubleshooting

### "Supabase not configured" error
- Make sure `.env.local` exists and has the correct credentials
- Restart the dev server after creating/editing `.env.local`

### Images not uploading to cloud
- Check that the `vocabulary-images` bucket exists
- Verify the storage policies are created (run the SQL again if needed)
- Check the browser console for detailed error messages

### "Invalid API key" error
- Make sure you're using a valid Gemini API key
- The key should start with `AIza...`
- Try creating a new key in Google AI Studio

### Images generate but look wrong
- Try different art styles
- Add a context hint for ambiguous words
- Use "No Text" option if text appears garbled

---

## 🛡️ Security Notes

1. **Supabase Anon Key**: This is a public key - it's safe to use in frontend code. It only allows operations permitted by your Row Level Security (RLS) policies.

2. **Gemini API Key**: This is private! It's stored in the user's browser localStorage, never on the server. Each user uses their own key.

3. **Storage Policies**: The current setup allows public access. For production with multiple users, consider:
   - Adding authentication
   - Restricting upload permissions
   - Using Row Level Security on the images table

---

## 📞 Support

If you run into issues:
1. Check the browser console (F12 → Console tab)
2. Check the Supabase dashboard for errors
3. Make sure all environment variables are correct
4. Restart the dev server (`npm run dev`)

---

## 🎉 You're Ready!

Once you've completed all the steps:
1. ✅ Supabase project created
2. ✅ Database tables created
3. ✅ Storage bucket created with policies
4. ✅ `.env.local` configured
5. ✅ App running with `npm run dev`
6. ✅ Gemini API key entered in Settings

You can start generating beautiful vocabulary flashcard images! 🚀
