/*
 * Default Configurable Data — seeded into Mongo on first boot.
 *
 * BEFORE EDITING: read ./RULES.md (especially R5: schema and defaults must
 * stay in sync) and ./configurables.schema.ts. For per-type schema and
 * default-value samples, see RULES.md §5 "Field Type Reference".
 */

export type TBrandColor = {
  // Base
  background: string;
  foreground: string;
  // Card
  card: string;
  cardForeground: string;
  // Popover
  popover: string;
  popoverForeground: string;
  // Primary
  primary: string;
  primaryForeground: string;
  // Secondary
  secondary: string;
  secondaryForeground: string;
  // Muted
  muted: string;
  mutedForeground: string;
  // Accent
  accent: string;
  accentForeground: string;
  // Destructive
  destructive: string;
  destructiveForeground: string;
  // Border / Input / Ring
  border: string;
  input: string;
  ring: string;
  // Charts
  chart1?: string;
  chart2?: string;
  chart3?: string;
  chart4?: string;
  chart5?: string;
  // Navbar
  navbarBackground: string;
  // Sidebar
  sidebarBackground: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
};

export type TFont = {
  headingFont: string;
  textFont: string;
};

export type TDefaultConfigurableData = {
  appName: string;
  logoUrl: string;
  brandColor: TBrandColor;
  font: TFont;
  gameTitle: string;
  gameTagline?: string;
  playerXColor?: string;
  playerOColor?: string;
  aiDifficulty?: "easy" | "medium" | "hard";
  showScoreboard?: boolean;
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "TacTox",
  logoUrl: "",
  brandColor: {
    // Base
    background:        "#0f1117",
    foreground:        "#e2e8f0",
    // Card
    card:              "#1e2130",
    cardForeground:    "#e2e8f0",
    // Popover
    popover:           "#1e2130",
    popoverForeground: "#e2e8f0",
    // Primary
    primary:           "#6366f1",
    primaryForeground: "#ffffff",
    // Secondary
    secondary:           "#06b6d4",
    secondaryForeground: "#ffffff",
    // Muted
    muted:           "#2d3148",
    mutedForeground: "#94a3b8",
    // Accent
    accent:           "#818cf8",
    accentForeground: "#ffffff",
    // Destructive
    destructive:           "#fb7185",
    destructiveForeground: "#ffffff",
    // Border / Input / Ring
    border: "#2d3148",
    input:  "#2d3148",
    ring:   "#6366f1",
    // Charts
    chart1: "#6366f1",
    chart2: "#06b6d4",
    chart3: "#fb7185",
    chart4: "#818cf8",
    chart5: "#f59e0b",
    // Navbar
    navbarBackground: "#0f1117",
    // Sidebar
    sidebarBackground:        "#1e2130",
    sidebarForeground:        "#e2e8f0",
    sidebarPrimary:           "#6366f1",
    sidebarPrimaryForeground: "#ffffff",
    sidebarAccent:            "#2d3148",
    sidebarAccentForeground:  "#e2e8f0",
    sidebarBorder:            "#2d3148",
    sidebarRing:              "#6366f1",
  },
  font: {
    headingFont: "Space Grotesk",
    textFont: "DM Sans",
  },
  gameTitle: "TacTox",
  gameTagline: "3D Tic-Tac-Toe — Outsmart the AI in three dimensions",
  playerXColor: "#818cf8",
  playerOColor: "#fb7185",
  aiDifficulty: "medium",
  showScoreboard: true,
};
