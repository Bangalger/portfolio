---
name: Monolith Portfolio System
colors:
  surface: '#faf9f6'
  surface-dim: '#dbdad7'
  surface-bright: '#faf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f0'
  surface-container: '#efeeeb'
  surface-container-high: '#e9e8e5'
  surface-container-highest: '#e3e2df'
  on-surface: '#1b1c1a'
  on-surface-variant: '#5c4039'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f2f1ee'
  outline: '#906f68'
  outline-variant: '#e5beb5'
  surface-tint: '#b52600'
  primary: '#a52200'
  on-primary: '#ffffff'
  primary-container: '#d12d00'
  on-primary-container: '#ffede9'
  inverse-primary: '#ffb4a3'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#0049cb'
  on-tertiary: '#ffffff'
  tertiary-container: '#055fff'
  on-tertiary-container: '#eff0ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad2'
  primary-fixed-dim: '#ffb4a3'
  on-primary-fixed: '#3d0600'
  on-primary-fixed-variant: '#8b1b00'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#dbe1ff'
  tertiary-fixed-dim: '#b5c4ff'
  on-tertiary-fixed: '#00174c'
  on-tertiary-fixed-variant: '#003dab'
  background: '#faf9f6'
  on-background: '#1b1c1a'
  surface-variant: '#e3e2df'
typography:
  display-xl:
    fontFamily: Anybody
    fontSize: 120px
    fontWeight: '800'
    lineHeight: 110px
    letterSpacing: -0.04em
  display-xl-mobile:
    fontFamily: Anybody
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Anybody
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.1em
  label-numeric:
    fontFamily: Anybody
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 24px
spacing:
  grid-unit: 8px
  gutter: 24px
  margin-mobile: 24px
  margin-desktop: 80px
  section-gap: 160px
---

## Brand & Style

This design system is inspired by the cinematic precision of "2001: A Space Odyssey." It balances clinical minimalism with high-impact Swiss typography. The aesthetic is defined by a rigorous grid-based structure, intentional negative space, and a sense of monumental scale.

The design style is a blend of **Minimalism** and **Modernism**. It utilizes a "technical documentation" feel—functional, clear, and authoritative—interrupted by bold, oversized typography and a singular, high-contrast accent color to guide the eye. The interface feels like a high-end command console or a luxury editorial piece.

## Colors

The palette is rooted in a "Warm Bone" neutral to avoid the sterility of pure white, paired with a deep "Interstellar Black" for structure. 

- **Primary Red:** Used exclusively for high-priority calls to action, section numbers, and critical highlights. It mimics the "HAL 9000" eye—unmissable and authoritative.
- **Light Mode:** Uses the neutral background (`#F4F3F0`) with subtle gray borders (`#E0E0E0`) to define the grid.
- **Dark Mode:** Inverts the logic, using a near-black background (`#0A0A0A`) with dark gray borders (`#222222`). Text shifts to the neutral off-white to maintain readability without harsh contrast.

## Typography

Typography is the primary architectural element. 

- **Headings:** `Anybody` provides the geometric, bold presence required for the "2001" look. Headlines should often be uppercase with tight tracking.
- **Body:** `Inter` ensures maximum legibility for long-form descriptions and profile details.
- **Technical Labels:** `JetBrains Mono` is used for metadata, section indices (e.g., [01]), and secondary labels to emphasize the "systematic" nature of the design.
- **Scaling:** Display type scales aggressively from mobile to desktop to create a sense of awe. Large display text should overlap the background grid.

## Layout & Spacing

The layout is built on a **12-column fluid grid** visible as a light background pattern (the "monolith" grid). 

- **The Grid:** Use a subtle 1px border grid pattern as the lowest background layer. This guides all element placements.
- **Rhythm:** Spacing follows a strict 8px baseline. Use generous vertical padding between sections (`section-gap`) to allow content to "breathe" in a cinematic way.
- **Margins:** Desktop margins are wide (80px+) to center the narrative. Mobile margins tighten to 24px, but maintain the vertical rhythm.
- **Alignment:** Elements should align strictly to the grid lines. Text blocks should generally occupy 6-8 columns for optimal reading length.

## Elevation & Depth

This design system rejects traditional shadows in favor of **structural layering and outlines**.

- **Tonal Layers:** Elevation is defined by surface color shifts (e.g., a card slightly darker or lighter than the background).
- **Outlines:** Use thin, 1px borders to define containers. In light mode, these are light gray; in dark mode, they are dark charcoal.
- **No Shadows:** Avoid drop shadows entirely. Depth is perceived through the strict hierarchy of the grid and the "stacking" of containers.
- **Focus States:** Active items or hovered cards use a hairline 2px border in the Primary Red accent color.

## Shapes

The shape language is **Sharp (0)**. 

To maintain the architectural and technical aesthetic, there are no rounded corners. Every button, input, card, and image container must have 90-degree angles. This reinforces the precision of the design system.

## Components

### Buttons
- **Primary:** Solid black (Light Mode) or Solid Neutral (Dark Mode) with sharp corners. Text is `label-sm`. Hover state reveals the Primary Red background.
- **Ghost:** 1px border with no background. Primary Red text.

### Chips / Tags
- Small, rectangular boxes with 1px borders. Use `label-sm`. Background should be a subtle tint of the neutral color.

### Timeline
- A vertical 1px line with small circular nodes. The "Active" node is a solid Primary Red circle. 
- Company logos should be greyscale, reverting to color only on hover.

### Input Fields
- Underlined style or fully boxed with 1px borders. Use `jetbrainsMono` for placeholder text to maintain the technical feel.

### Cards
- Simple 1px border containers. Headers within cards should use `label-sm` with the Primary Red accent for section numbering or indices.

### Section Dividers
- Full-width 1px horizontal lines with the section index (e.g., `[02]`) floating just above the line on the left.