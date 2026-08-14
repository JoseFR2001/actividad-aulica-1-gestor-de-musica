---
name: SoundWave Cobalt
colors:
  surface: '#0d1117'
  surface-dim: '#151219'
  surface-bright: '#21262d'
  surface-container-lowest: '#100d13'
  surface-container-low: '#1e1a21'
  surface-container: '#161b22'
  surface-container-high: '#2c2830'
  surface-container-highest: '#37333b'
  on-surface: '#e8e0ea'
  on-surface-variant: '#c1c6d7'
  inverse-surface: '#e8e0ea'
  inverse-on-surface: '#332f36'
  outline: '#8b90a0'
  outline-variant: '#414755'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#ffffff'
  primary-container: '#4b8eff'
  on-primary-container: '#00285c'
  inverse-primary: '#005bc1'
  secondary: '#53e076'
  on-secondary: '#003914'
  secondary-container: '#00ad4b'
  on-secondary-container: '#003713'
  tertiary: '#d4ca38'
  on-tertiary: '#353100'
  tertiary-container: '#b8ae19'
  on-tertiary-container: '#454100'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004493'
  secondary-fixed: '#72fe90'
  secondary-fixed-dim: '#53e076'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005320'
  tertiary-fixed: '#f1e753'
  tertiary-fixed-dim: '#d4ca38'
  on-tertiary-fixed: '#1e1c00'
  on-tertiary-fixed-variant: '#4d4800'
  background: '#151219'
  on-background: '#e8e0ea'
  surface-variant: '#37333b'
  deep-navy-bg: '#010409'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  margin-mobile: 16px
  gutter: 12px
---

## Brand & Style

The design system embodies a high-fidelity, immersive audio experience tailored for late-night listening and deep focus. The aesthetic is rooted in **Modern Minimalism** with a sophisticated **Dark Mode** foundation. By replacing traditional purples with a vibrant, electric blue, the brand moves toward a more technical, "pro-audio" feel while maintaining its energetic soul.

The personality is precise, rhythmic, and premium. It utilizes a "Vivid-Depth" approach where the UI feels like a physical console: depth is communicated through subtle shifts in luminosity and deep navy-tinted surfaces rather than heavy shadows. This creates a focused environment where high-quality album art and the vibrant blue accents serve as the primary visual anchors.

## Colors

The palette is reconstructed around a "Midnight Cobalt" theme. 

- **Primary Blue (#007AFF):** A vibrant, modern blue used for high-intent actions, active icons, progress bars, and focus states. It provides a sharp, technical contrast against the dark background.
- **Deep Navy Base (#010409):** The primary background color. It is a near-black with a subtle blue tint to prevent the "hollow" feeling of pure hex black.
- **Surface Tiers:** Containers use graduated navy-grays (#0d1117 and #161b22) to create hierarchical separation.
- **Functional Accents:** The secondary green (#53e076) is retained specifically for "Online," "Downloaded," or "Now Playing" status indicators, providing a clear functional distinction from the primary navigational blue.

## Typography

The typography system uses **Inter** for its neutral, systematic clarity. It is designed to scale from dense metadata to punchy display headlines.

- **Impact:** Use Bold (700) or ExtraBold (800) for headlines with tight letter spacing to create an editorial, high-energy feel.
- **Structure:** `label-caps` must be used for all section headers (e.g., "YOUR LIBRARY") to provide a clear visual break in long scrolling feeds.
- **Legibility:** Secondary text (artists, timestamps) should use a muted opacity of the neutral color rather than a different hue, ensuring the blue accents always remain the dominant chromatic element.

## Layout & Spacing

The system follows a **Fluid Grid** model with a 4px baseline rhythm, optimized for rapid mobile interaction.

- **Margins:** A strict 16px horizontal margin is applied to all primary content.
- **Carousels:** For horizontal album or playlist rows, the first element aligns to the 16px margin, while the final visible element must be partially clipped to signal horizontal overflow.
- **Touch Targets:** All interactive controls (Play, Skip, Like) must adhere to a 44x44px minimum hit area, even if the visual icon is smaller.
- **Grids:** Use a 2-column layout for album art on mobile and scale to 4 or 6 columns on desktop using a 12px gutter.

## Elevation & Depth

This system avoids traditional drop shadows in favor of **Tonal Layering** and **Glassmorphism**.

- **Surface Levels:** Depth is created by lightening the background. Base level is the deepest navy; cards and list items are one step lighter; floating players are two steps lighter.
- **Glassmorphism:** The primary navigation bar (Bottom/Side) and the "Now Playing" expanded view use a 20px background blur with a 70% opacity navy tint. This keeps the user grounded in their current context.
- **Subtle Outlines:** Level 2 elements (like cards or modal popups) use a 1px low-contrast outline (#ffffff10) to define edges against the dark background without adding visual weight.

## Shapes

The shape language is "Softly Modern," using geometry to distinguish between content types.

- **Containers & Controls:** Standard buttons, cards, and input fields use a **Rounded** (0.5rem / 8px) to **Rounded-LG** (1rem / 16px) radius.
- **Avatars:** Artist profiles are always 100% circular (pill-shaped) to provide a clear visual distinction from square album art.
- **Album Art:** Standardized at 8px radius. Art should never be sharp-edged to maintain the "premium" feel.

## Components

### Buttons & Controls
- **Primary Button:** Solid #007AFF fill with #FFFFFF text.
- **Play/Pause:** Circular button with #007AFF background. On large display headers, this should be 56px in diameter.
- **Progress Bars:** The "active" or "elapsed" portion uses #007AFF. The track background uses #21262d.

### Navigation & Icons
- **Active States:** Icons for the current page (Home, Search, Library) should switch from Outline to Solid and adopt the #007AFF color.
- **Mini-Player:** A floating Level 2 surface that sits 8px above the bottom navigation, using background blur and a subtle 1px top border.

### Input & Feedback
- **Search Fields:** Use a `rounded-lg` (16px) radius with a deep navy surface and a subtle blue outline on focus.
- **Chips:** Used for genres or moods. Use an outline style for unselected states and a solid #007AFF fill for active selections.
- **Lists:** Song items are 56px high with 12px spacing between elements. Metadata is always aligned to the left, with "More" options aligned to the right margin.