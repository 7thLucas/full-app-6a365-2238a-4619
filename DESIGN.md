# TacTox Design Guidelines

## Visual Identity
- Clean, modern, premium feel — not childish
- Dark-mode first with a deep navy/charcoal background
- Minimalist UI — the 3D board is the star
- Subtle glow effects and depth shadows for the 3D feel

## Color Palette
- Background: deep charcoal (#0f1117)
- Primary accent: electric indigo (#6366f1)
- Secondary accent: cyan (#06b6d4)
- Player X color: indigo/purple (#818cf8)
- Player O (AI) color: rose/coral (#fb7185)
- Surface/card: dark slate (#1e2130)
- Border: muted dark (#2d3148)
- Foreground text: near-white (#e2e8f0)
- Muted text: slate (#94a3b8)

## Typography
- Headings: Space Grotesk — geometric, modern, slightly playful
- Body: DM Sans — clean and legible at small sizes

## Component Style
- Rounded corners (border-radius 12–16px on cards, 8px on small elements)
- Subtle glassmorphism on UI panels (backdrop-blur + semi-transparent background)
- Hover states with smooth transitions (150–200ms ease)
- Win line highlight: glowing stroke animation

## 3D Board Aesthetics
- Cells rendered as semi-transparent cubes or layered grid planes
- CSS 3D transforms or Three.js for depth perspective
- Each layer (Z=0,1,2) visually stacked with spacing
- X markers: bold geometric cross with purple glow
- O markers: hollow ring with rose glow
- Winning cells: pulsing highlight animation

## Layout
- Centered single-column layout
- Board is the primary focal point
- Minimal top navigation (just title + score)
- "Play Again" button prominent and immediate after win/loss