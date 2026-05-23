---
name: Precision Utility
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434655'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#515f74'
  on-secondary: '#ffffff'
  secondary-container: '#d5e3fd'
  on-secondary-container: '#57657b'
  tertiary: '#006242'
  on-tertiary: '#ffffff'
  tertiary-container: '#007d55'
  on-tertiary-container: '#bdffdb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d5e3fd'
  secondary-fixed-dim: '#b9c7e0'
  on-secondary-fixed: '#0d1c2f'
  on-secondary-fixed-variant: '#3a485c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
  slate-900: '#0F172A'
  slate-400: '#94A3B8'
  slate-200: '#E2E8F0'
  indigo-accent: '#6366F1'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 28px
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
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  data-mono:
    fontFamily: jetbrainsMono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter-mobile: 16px
  gutter-desktop: 24px
  margin-safe: 20px
  max-width: 1280px
---

## Brand & Style

The brand personality is defined as a "Swiss Army Knife" for professionals: high-utility, fast, and unerringly precise. It positions itself as a laboratory environment—clean, clinical, and focused on methodology rather than just raw data. The target audience includes finance professionals, engineers, and health-conscious users who require immediate answers backed by transparent logic.

The design style follows a **Corporate Minimalism** approach with a focus on information density and functional clarity. It prioritizes a systematic hierarchy that allows for rapid scanning of data-heavy views. Key visual characteristics include a restrained use of color for functional emphasis, card-based containment for modularity, and a layout that balances white space with predictive power.

## Colors

The palette is anchored by **Precision Blue (#2563EB)**, used for primary actions and key brand indicators to convey reliability and technological trust. **Neutral Slate (#334155)** provides a professional foundation for text and structural elements, ensuring high legibility without the harshness of pure black. **Success Green (#10B981)** is reserved strictly for positive results, validated states, and "free" status indicators to provide immediate visual feedback.

The system defaults to **light mode** with a near-white background (`#F8FAFC`) to maintain the "lab" aesthetic, though a dark mode equivalent should map primary and surface tokens to maintain high contrast for professional use in low-light environments.

## Typography

This design system utilizes **Inter** for all standard UI roles to ensure maximum legibility and a neutral, professional tone. The typographic scale is optimized for data-dense environments, using slight negative letter-spacing on larger headings to maintain a compact, "engineered" feel.

For numerical outputs and keyboard shortcuts, **JetBrains Mono** is introduced as a supporting font to emphasize precision and technical accuracy. On mobile, headlines are scaled down to prevent excessive line breaks, while body text remains at 16px to ensure accessibility during quick utility checks.

## Layout & Spacing

The layout utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile. A base 4px spacing unit (the "Precision Unit") governs all spatial relationships. 

- **Desktop:** 24px gutters with 32px-64px vertical section spacing to separate different calculation stages.
- **Mobile:** 16px gutters with a persistent bottom navigation bar for quick access to core tools.
- **Density:** Information density is high, but balanced by the use of distinct card containers. Grouping of inputs should be tight (8px-12px), while output results should be granted more "breathing room" (24px+) to establish clear visual hierarchy.

## Elevation & Depth

Visual hierarchy is established through **Tonal Layering** supplemented by **Ambient Shadows**. The interface uses a flat base layer with elevated card surfaces to distinguish interactive tools from instructional content.

- **Level 0 (Base):** Neutral Slate-50 (#F8FAFC) background.
- **Level 1 (Cards/Containers):** Pure white background with a 1px border in Slate-200 and a subtle, diffused shadow (0px 4px 6px -1px rgba(0,0,0,0.05)).
- **Level 2 (Modals/Command Palette):** Higher elevation with a more pronounced shadow (0px 10px 15px -3px rgba(0,0,0,0.1)) to focus user attention on active inputs.
- **Interactive States:** Buttons and input fields use low-contrast outlines that intensify (Precision Blue) upon focus, rather than increasing shadow depth.

## Shapes

The shape language is consistently "Soft-Rounded." A standard **12px (0.75rem)** radius is applied to all calculator cards and major containers to soften the technical nature of the content while remaining structured. 

Buttons and input fields utilize a smaller **8px (0.5rem)** radius to maintain a more compact and precise appearance for interactive elements. High-level status tags (e.g., "Free Forever") may use a **Pill-shaped** radius to distinguish them from structural UI components.

## Components

- **Buttons:** Primary buttons use a solid Precision Blue fill with white text. Secondary buttons use a Slate-200 border and Slate-900 text. Use "Pill" shapes only for tags, while buttons remain rounded-rect.
- **Input Fields:** Large, clear labels placed above the input. Use a 1px Slate-200 border that transforms to 2px Precision Blue on focus. Use JetBrains Mono for the numerical values inside inputs.
- **Cards:** White surfaces with 12px rounded corners. Include a subtle "Top Border" in Precision Blue for featured calculators to guide the eye.
- **Chips/Badges:** Use Success Green backgrounds with dark green text for "Results" or "Verified" statuses. Use Slate-100 for category tags.
- **Lists:** Clean, borderless rows with 12px padding and a light hover state (Slate-50). Use chevron-right icons for navigation-heavy lists.
- **Output Hero:** A specialized card component for calculation results featuring large, bold JetBrains Mono text and a high-contrast background (Slate-900 or Precision Blue) to make the "answer" unmistakable.