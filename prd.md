Vocabulary Image Generator - Product Requirements Document
Product Overview
Name: Vocabulary Image Generator
Purpose: An AI-powered tool that generates educational flashcard images for vocabulary words. Designed for adult learners studying Saudi dialect Arabic, it creates instant visual representations of words to aid comprehension and memorization.

Core Value: Users enter any vocabulary word (in English, Arabic, or transliterated), and the system intelligently generates a high-quality educational image that visually represents that word's meaning.

Target Audience
Adult learners studying Saudi dialect Arabic
Language educators creating course materials
Professional educational content creators
Anyone needing quick, high-quality vocabulary visuals
Application Structure
The application has 3 main pages:

1. Generator Page (Main Page)
The primary workspace where users generate images.

2. Gallery Page
Browse, filter, search, and manage all generated images.

3. Settings Page
Configure API key and application preferences.

Generator Page - Detailed Specification
Layout
Two-column layout:

Left Panel: All input controls and configuration options
Right Panel: Generated images display area
Input Components (In Order of Appearance)
1. Presets Section
Purpose: Save and reuse generation settings for consistency across sessions.

Component	Description
Preset Dropdown	Select from saved presets
Save Button	Save current settings as a new preset
Manage Button	Opens modal to view, edit, delete presets
Preset Data Saved:

Preset name
All selected styles (array)
Mood, background, composition
Text option, color option
Aspect ratio, variations per word
Selection mode (single/multi)
Context hint (optional)
Is default flag (boolean)
2. Vocabulary Words Input
Purpose: Enter the words to generate images for.

Field	Specification
Type	Multi-line textarea
Placeholder	"Enter comma-separated words. Example: apple, running, happiness, doctor, mountain"
Accepted Separators	Comma (,), Arabic comma (،), dash (-), newline
Live Preview	Words appear as tags below input as user types
Behavior:

Parses input in real-time
Displays parsed words as visual tags
Trims whitespace automatically
Filters empty entries
3. Art Style Selection
Purpose: Choose the visual style for generated images.

Mode Toggle:

Mode	Behavior
Single	Select ONE style (radio behavior)
Multi-Style	Select MULTIPLE styles (checkbox behavior) - generates images in each selected style
Available Styles (26 total):

Category	Styles
3D Styles	3D Pixar, 3D Clay, 3D Isometric
Illustration	Flat Vector (default), Simple Cartoon, Cute/Kawaii, Watercolor, Hand Drawn, Line Art, Paper Cutout
Sticker/Icon	Sticker Style, Minimalist Icon
Photographic	Realistic
Retro	Pixel Art
Educational	Chalkboard, Gradient Mesh, Pencil Sketch, Doodle, Notebook, Pen & Ink, Whiteboard, Crayon, Coloring Book, Textbook, Infographic, Flashcard
Style Descriptions (for AI prompt building):

Style Key	AI Description
flat-vector	flat vector illustration with clean geometric shapes, solid colors, no gradients - modern edtech style
3d-pixar	Pixar-style 3D render with soft lighting, rounded shapes, and friendly aesthetic
3d-clay	clay-like 3D render with soft matte textures, like stop-motion claymation animation
3d-isometric	isometric 3D illustration at 30-degree angle with clean geometric style
cartoon-simple	simple cartoon style with bold black outlines, flat colors, and friendly look
cartoon-cute	adorable kawaii style with round shapes, big expressive eyes, and pastel colors
watercolor	soft watercolor painting with visible brush strokes and natural color bleeds
hand-drawn	sketch-like hand-drawn illustration with pencil or pen texture
lineart	clean black and white line drawing with minimal shading
sticker	cute sticker design with thick white outline and vibrant saturated colors
minimalist	ultra-minimalist icon style with essential shapes only, 2-3 colors maximum
realistic	photorealistic image with natural lighting and detailed textures
pixel-art	retro pixel art style with visible pixels, 32x32 aesthetic
paper-cutout	layered paper cutout art with visible depth and shadows between layers
chalkboard	chalk drawing on dark blackboard using white and colored chalk
gradient-mesh	smooth gradient illustrations with soft color transitions and modern look
pencil-sketch	graphite pencil drawing with soft shading, subtle texture, and artistic crosshatching
doodle	playful hand-drawn doodle style with wobbly lines, casual sketchy feel, and whimsical details
notebook	illustration on blue-lined notebook paper with a hand-drawn ballpoint pen style
pen-ink	elegant pen and ink illustration with precise linework, cross-hatching, and fine details
whiteboard	bold marker strokes on clean white background, like a classroom whiteboard drawing
crayon	colorful crayon drawing with waxy texture and childlike artistic style
coloring-book	bold black outlines ready for coloring, clean spaces with no fill, coloring book page style
textbook	clean educational textbook illustration, professional and clear with labeled-diagram aesthetic
infographic	modern infographic style with bold geometric shapes, icons, and clean visual hierarchy
flashcard	high-contrast flashcard design optimized for quick recognition, bold and simple
4. Visual Mood
Purpose: Set the emotional tone and color palette.

Option	Description
Bright & Cheerful (default)	bright and cheerful colors with high saturation and positive energy
Soft & Calm	soft and calm pastel tones with gentle contrast and peaceful feel
Bold & Vibrant	bold and vibrant colors with strong contrast and dynamic energy
Neutral/Professional	neutral and professional colors with balanced tones
5. Background
Purpose: Set the background style of generated images.

Option	Description
Clean/Removable (default)	pure clean white background, subject isolated for easy background removal
Solid White	solid white background, clean and minimal
Solid Color	solid single color background (soft gray or cream), clean and undistracting
Soft Gradient	subtle soft gradient background that doesn't distract from the subject
Full Scene	contextual scene background showing the subject in a relevant environment
Vignette	subject centered with soft vignette edges fading to white
6. Composition
Purpose: Control how the subject is framed in the image.

Option	Description
Centered (default)	subject centered in the frame with balanced composition
Full Body	full body view of the subject showing complete form
Close-up	close-up view focusing on key details
Wide Shot	wide shot showing subject in broader context
Action Pose	dynamic action pose with sense of movement
7. Text in Image
Purpose: Whether to include text labels in the generated image.

Option	Description
No Text (default)	Do NOT include any text, letters, words, numbers, or writing in the image
English Label	Include a clear, readable English text label of the word prominently displayed
Arabic Label	Include a clear, readable Arabic text label using Arabic script
8. Color Scheme
Purpose: Override AI color choices with brand colors.

Option	Description
AI's Choice (default)	Let the AI decide appropriate colors for the subject
Brand Colors	Use teal (#00ADB5) as primary and orange (#FF7E36) as accent throughout the image
9. Aspect Ratio
Purpose: Set the dimensions of generated images.

Option	Use Case
1:1 Square (default)	Flashcards, social media
16:9 Wide	Presentations, video thumbnails
9:16 Tall	Mobile stories, vertical content
4:3 Standard	Traditional display
3:4 Portrait	Portrait orientation
3:2 Photo	Standard photography
2:3 Portrait Photo	Vertical photography
4:5 Instagram	Instagram posts
5:4 Album	Album cover
21:9 Ultrawide	Cinematic, banners
10. Variations Per Word
Purpose: Generate multiple different images for each word.

Option	Result
1 variation (default)	One image per word
2 variations	Two different images per word
3 variations	Three different images per word
4 variations	Four different images per word
Note: Each variation uses a different AI-generated visual concept.

11. Context Hint (Optional)
Purpose: Provide additional context to help the AI understand ambiguous words.

Field	Specification
Type	Single-line text input
Placeholder	"e.g., 'person looking at map' for 'lost'"
Use Case	Disambiguate words with multiple meanings
Examples:

Word: "bank" → Context: "financial institution" (not river bank)
Word: "watch" → Context: "timepiece" (not the verb)
Word: "bat" → Context: "flying animal" (not baseball bat)
12. Generate Button
Purpose: Trigger image generation.

States:

Default: "Generate Images"
Loading: Shows spinner + "Generating..."
Concurrent batches: "Generate (X pending)" - allows queueing multiple batches
Behavior:

Remains enabled during generation (supports concurrent batches)
Shows skeleton loading placeholders in results panel
Updates count of pending batches
Results Panel (Right Side)
Empty State:

Paint palette icon
Text: "Your generated images will appear here"
Subtitle: "Enter vocabulary words and click Generate"
After Generation: Grid of image cards, each containing:

Element	Description
Image	The generated image with correct aspect ratio
Overlay Actions	Download, Upload to Cloud, Delete buttons (visible on hover)
Word Label	The vocabulary word
Date	Generation date
Settings Tags	Small badges showing: Style, Mood, Background, Composition, Aspect Ratio, Text Option, Color Option
Gallery Page - Detailed Specification
Source Tabs
Tab	Description
My Device	Images stored locally on the user's machine
Cloud (Shared)	Images synced to cloud storage (Supabase)
Filters
Filter	Type	Options
Search	Text input	Search by word
Word Filter	Dropdown	All Words + dynamically populated list of all words used
Style Filter	Dropdown	All Styles + all 26 style options
Image Grid
Same card format as Generator results, with:

Click to open fullscreen preview
Pagination for large galleries
Fullscreen Preview Modal
Element	Description
Large Image	Full-size image view
Word	The vocabulary word (large heading)
Date	When the image was generated
Settings	All generation settings as tags
Prompt	The full AI prompt used (expandable)
Actions	Download and Delete buttons
Pagination
Previous/Next buttons
Page X of Y indicator
Default: 100 images per page
Settings Page - Specification
API Key Configuration
Field	Description
API Key Input	Password-type input for Gemini API key
Test Button	Validates the API key works
Save Button	Stores API key in browser localStorage
Validation:

Makes a test call to Gemini API
Shows success/error message
Green checkmark if valid
Image Metadata Schema
Each generated image stores the following metadata:

Field	Type	Description
filename	string	Unique filename (e.g., apple_20240122_143526_v1.png)
word	string	The vocabulary word
prompt	string	The full AI-generated prompt used
style	string	Art style key
mood	string	Visual mood key
background	string	Background type key
aspect_ratio	string	Aspect ratio (e.g., "1:1")
composition	string	Composition type key
variation_index	integer	Which variation (1, 2, 3, or 4)
text_option	string	Text in image option
color_option	string	Color scheme option
created_at	ISO datetime	When the image was generated
image_url	string	Cloud URL if synced
synced	boolean	Whether uploaded to cloud
storage	string	"local" or "cloud"
AI Generation System
Two-Stage AI Workflow
Stage 1: Concept Generation

Model: Gemini 2.0 Flash
Purpose: Understand the vocabulary word and generate a 1-2 sentence visual concept
Output: Simple scene description (NO style info, NO colors, NO backgrounds)
Stage 2: Image Generation

Model: Gemini 3 Pro Image Preview (gemini-3-pro-image-preview)
Purpose: Generate the actual image from the complete prompt
Input: Concept + all style settings combined into final prompt
Word Type Classification System
The AI classifies each word and applies visualization strategies:

Word Type	Example Words	Visualization Strategy
Concrete Nouns	pen, apple, chair	Show the object ALONE, isolated, in its most recognizable form
Action Verbs	run, eat, write	Show a FULL PERSON performing the action MID-MOTION
State Verbs	live, know, have	Use a VISUAL METAPHOR combined with a person experiencing that state
Abstract Concepts	happiness, freedom, love	Show a PERSON EXPERIENCING the concept PLUS symbolic visual elements
Adjectives	big, fast, cold	Show COMPARISON between two things, with an arrow pointing at the subject
Prepositions	in, on, under	Show TWO SIMPLE OBJECTS demonstrating the spatial relationship (ball and table)
Adverbs	quickly, carefully	Show a person performing an action with visual cues for the manner
Time/Frequency	morning, yesterday	Use ENVIRONMENTAL CUES to represent time
Quantity Words	many, few, some	Show COUNTABLE OBJECTS in clear quantities
Emotions/Physical States	tired, hungry, scared	Show FULL PERSON + CONTEXT + SYMBOLIC CUE
Professions/Roles	doctor, teacher, chef	Show person with UNIFORM + TOOL or DOING KEY ACTION
Cultural Context Rules
Word Category	Approach
Culturally-specific words (kabsa, thobe, local customs)	Use Middle Eastern context and visual elements
General/Universal words (pen, run, happy)	Use culturally neutral, globally recognizable imagery
Prompt Template Structure
The final prompt is built from these components in order:

Style description
Subject/concept (AI-generated)
Educational context statement
Mood/colors description
Composition description
Background description
Color scheme override (if brand colors selected)
Text instruction (CRITICAL - placed last for emphasis)
Presets System
Save Preset Flow
User clicks Save button
Modal opens with:
Name input field
"Set as default" checkbox
Settings preview showing current selections
User enters name and clicks Save
Preset stored in cloud (Supabase)
Load Preset Flow
User selects preset from dropdown
All form fields update to match preset values
Style buttons, dropdowns, and toggles all update visually
Default Preset
One preset can be marked as default
On page load, default preset is automatically applied
Only one preset can be default at a time
Manage Presets Modal
List of all presets with name and settings preview
Actions per preset: Load, Set as Default, Delete
Delete confirmation required
Storage System
Local Storage (Default)
Images saved to local directory
Metadata tracked in JSON file
No cloud dependency
Instant access
Cloud Storage (Optional - Supabase)
Images stored in Supabase Storage bucket
Metadata stored in PostgreSQL table
Shareable across devices/team members
Sync indicator shows which images are uploaded
Dual Storage Mode
When cloud is configured:

Images save locally first (instant)
Can upload individual images to cloud via "Upload to Cloud" button
Synced images show "Synced" badge
Error Handling
Toast Notifications
Type	Style	Duration
Error	Red background	5 seconds auto-dismiss
Success	Green background	3 seconds auto-dismiss
Both	X close button	Manual dismiss
Error Cases
No vocabulary words entered
Invalid API key
API rate limit exceeded
Network connection failure
Individual word generation failure (shows which words failed)
Graceful Degradation
If one word fails, others still generate
Error list shown with successful results
Partial success is still a success
User Flow Summary
Generate Images Flow
User enters vocabulary words
Selects art style (single or multiple)
Adjusts mood, background, composition, etc.
Optionally adds context hint
Clicks "Generate Images"
Skeleton loading placeholders appear
Images appear as they complete
User can download, upload to cloud, or delete
Concurrent Generation
Generate button stays enabled during generation
Shows "Generate (X pending)" with count
User can queue multiple batches
Each batch's results append to the grid
Gallery Browsing Flow
Navigate to Gallery
Select source (Local or Cloud)
Use filters to find specific images
Click image for fullscreen preview
Download or delete from preview
Preset Usage Flow
On first use, configure desired settings
Save as preset with descriptive name
Optionally set as default
Next session, select preset or let default load
Settings instantly applied
Design Principles
Visual Design
Clean, modern interface
Two-column layout for efficient workflow
Card-based image display
Consistent spacing and typography
Accessible color contrast
UX Principles
Real-time feedback (word tags, loading states)
Non-blocking generation (concurrent batches)
Progressive disclosure (optional advanced settings)
Undo/confirmation for destructive actions (delete)
Persistent settings via presets
Educational Focus
One clear concept per image
Instant recognition (1-2 seconds to understand)
Professional aesthetic suitable for adult learners
Culturally appropriate imagery
No text clutter (text optional)
Success Criteria
An image is successful when:

The vocabulary word's meaning is immediately clear
The image matches the selected style accurately
The mood and colors align with the selection
Background is as specified (transparent, solid, etc.)
No unwanted text appears (if no-text selected)
The image is high quality and professional-looking
Abstract concepts are represented with appropriate symbolism
Cultural context is correct when applicable