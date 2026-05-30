---
name: Language Tree
colors:
  surface: '#f3fcef'
  surface-dim: '#d4ddd0'
  surface-bright: '#f3fcef'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#edf6ea'
  surface-container: '#e8f0e4'
  surface-container-high: '#e2ebde'
  surface-container-highest: '#dce5d9'
  on-surface: '#161d16'
  on-surface-variant: '#3d4a3d'
  inverse-surface: '#2a322a'
  inverse-on-surface: '#ebf3e7'
  outline: '#6d7b6c'
  outline-variant: '#bccbb9'
  surface-tint: '#006e2f'
  primary: '#006e2f'
  on-primary: '#ffffff'
  primary-container: '#22c55e'
  on-primary-container: '#004b1e'
  inverse-primary: '#4ae176'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2170e4'
  on-secondary-container: '#fefcff'
  tertiary: '#9e4036'
  on-tertiary: '#ffffff'
  tertiary-container: '#ff8b7c'
  on-tertiary-container: '#76231b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6bff8f'
  primary-fixed-dim: '#4ae176'
  on-primary-fixed: '#002109'
  on-primary-fixed-variant: '#005321'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#ffdad5'
  tertiary-fixed-dim: '#ffb4a9'
  on-tertiary-fixed: '#410001'
  on-tertiary-fixed-variant: '#7f2a21'
  background: '#f3fcef'
  on-background: '#161d16'
  surface-variant: '#dce5d9'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
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
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 20px
  margin-mobile: 16px
  margin-desktop: auto
---

## Brand & Style

The brand identity focuses on growth, diversity, and connection through the metaphor of a "Language Tree." It serves an audience ranging from casual learners to educators, necessitating a UI that is both playful and academically reliable.

The design style is **Modern Corporate with a Friendly Minimalist edge**. It utilizes flat surfaces and intentional whitespace to keep the focus on educational content, while using soft geometry and organic illustrations to reduce the "friction" of learning. The interface should feel like a breathable garden—structured yet full of life.

Key visual principles:
- **Clarity over Decoration:** Every element serves a functional purpose.
- **Organic Geometry:** Use of speech-bubble "leaves" and rounded terminals to mimic the logo’s friendly silhouette.
- **Vibrancy:** High-energy accents to denote progress and achievement.

## Colors

The palette is derived from the natural world but digitally optimized for high legibility.

- **Primary (Emerald Green):** Represents growth and the "correct" path. Used for primary actions, success states, and progress bars.
- **Secondary (Royal Blue):** Represents knowledge and communication. Used for informational callouts, links, and secondary navigation.
- **Accents (Ruby & Honey):** Reserved for urgent feedback (errors) and milestones (achievements/streaks).
- **Structure (Earth Brown & Slate):** The dark brown replaces pure black for typography to maintain a warmer, organic feel, while Slate White provides a soft, low-strain background for long reading sessions.

## Typography

This design system uses **Inter** for its exceptional legibility and neutral, modern tone. The typographic hierarchy is strictly controlled to ensure educational content remains the priority.

Headlines use tighter letter spacing and heavier weights to feel "rooted" and confident. Body text uses a generous line height (1.5x) to prevent cognitive fatigue during reading exercises. Labels and captions use a slightly increased letter spacing to remain legible at small sizes.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a maximum content width of 1280px for desktop to maintain optimal line lengths for reading.

- **Desktop:** 12-column grid with 24px gutters.
- **Tablet:** 8-column grid with 20px gutters.
- **Mobile:** 4-column grid with 16px gutters and 16px side margins.

Spacing follows an 8pt rhythm for spatial consistency, though a 4px "base" is available for tight micro-adjustments in components like tags and icons. Content blocks should be separated by `lg` (40px) units to maintain the "Minimalist" aesthetic and provide plenty of room for the eye to rest.

## Elevation & Depth

To maintain the "Flat Design" requirement, depth is achieved through **Tonal Layering** and **Low-Contrast Outlines** rather than heavy shadows.

- **Surface 0:** Slate White (#F8FAFC) - The main background.
- **Surface 1:** White (#FFFFFF) - Cards and containers. Use a 1px border in Earth Brown at 8% opacity to define edges.
- **Interactive:** Elements like buttons use a subtle 2px solid offset (bottom-only) to give a "tactile" feel without using gradients or blurs, mimicking a physical stamp or key.
- **Overlays:** Modals use a 20% opacity Earth Brown backdrop tint to focus the user’s attention.

## Shapes

The shape language is defined by **Softness and Approachability**. Following the 8px-12px requirement:

- **Standard (8px):** Input fields, small buttons, and tags.
- **Large (16px):** Cards, lesson modules, and modal containers.
- **Full (Pill):** Search bars and status indicators.

Iconography must use a consistent 2px stroke with rounded caps and joins to match the typography's terminal ends.

## Components

### Buttons
- **Primary:** Emerald Green background, White text. 2px dark-green bottom border for a "pressed" feel.
- **Secondary:** Transparent background, Royal Blue 2px stroke.
- **Tertiary:** Earth Brown text, no background, underline on hover.

### Input Fields
- White background with 1px Earth Brown border (15% opacity). 
- Active state: Border becomes 2px Royal Blue.
- Labels: Always positioned above the field in `label-md` Earth Brown.

### Cards & Lesson Modules
- Surface: White. 
- Border: 1px Earth Brown (8% opacity).
- Corner Radius: 16px.
- Use the "speech bubble" leaf illustration style in the top right corner of cards to denote different language categories.

### Chips & Tags
- Used for vocabulary categories. 
- Style: Light tint of the category color (e.g., 10% Green) with 100% saturation text of the same hue. Pill-shaped.

### Lists
- Interactive lists use a "Hover State" where the background shifts to a 5% Royal Blue tint. 
- Dividers should be 1px solid Slate at 10% opacity.