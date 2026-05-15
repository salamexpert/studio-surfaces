interface LogoProps {
  /** Height in px. Width scales proportionally (7:1 ratio). */
  height?: number;
  /** Override text colour (defaults to CSS foreground). */
  textColor?: string;
  /** Override accent/tile colour (defaults to terracotta). */
  accentColor?: string;
  className?: string;
}

/**
 * Inline SVG logo — uses document fonts (Fraunces + Inter loaded globally).
 * viewBox 280×56 → aspect 5:1.
 */
export function Logo({
  height = 36,
  textColor = "#1C1712",
  accentColor = "#9B5434",
  className = "",
}: LogoProps) {
  const width = Math.round((280 / 56) * height);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 280 56"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Marino Ceramic Tile"
      role="img"
      className={className}
    >
      <defs>
        {/* Tile gradients — warm sand */}
        <linearGradient id="logo-tl" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#CDBCA2" />
          <stop offset="100%" stopColor="#B8A284" />
        </linearGradient>
        {/* Deep ink */}
        <linearGradient id="logo-tr" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2E2822" />
          <stop offset="100%" stopColor={textColor} />
        </linearGradient>
        {/* Terracotta accent */}
        <linearGradient id="logo-bl" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C07650" />
          <stop offset="100%" stopColor={accentColor} />
        </linearGradient>
        {/* Warm sand reversed */}
        <linearGradient id="logo-br" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#CDBCA2" />
          <stop offset="100%" stopColor="#B8A284" />
        </linearGradient>
      </defs>

      {/* ── Tile mark ─────────────────────────────────────────────────── */}
      {/* Base plate */}
      <rect width="56" height="56" rx="3" fill="#F5EFE7" />
      {/* Grout lines */}
      <rect x="25" y="2" width="6" height="52" fill="#E2D5C5" />
      <rect x="2" y="25" width="52" height="6" fill="#E2D5C5" />

      {/* Top-left tile: warm sand */}
      <rect x="2" y="2" width="23" height="23" rx="2" fill="url(#logo-tl)" />
      {/* Tile surface marks (simulate ceramic texture) */}
      <rect x="5" y="6" width="9" height="2.5" rx="1.2" fill="#DDD0BC" opacity="0.75" />
      <rect x="5" y="10.5" width="6" height="2" rx="1" fill="#DDD0BC" opacity="0.45" />
      <rect x="5" y="14.5" width="4" height="1.5" rx="0.75" fill="#DDD0BC" opacity="0.3" />

      {/* Top-right tile: deep ink */}
      <rect x="31" y="2" width="23" height="23" rx="2" fill="url(#logo-tr)" />
      <rect x="34" y="6" width="9" height="2.5" rx="1.2" fill="#4E463D" opacity="0.65" />
      <rect x="34" y="10.5" width="6" height="2" rx="1" fill="#4E463D" opacity="0.4" />
      <rect x="34" y="14.5" width="4" height="1.5" rx="0.75" fill="#4E463D" opacity="0.25" />

      {/* Bottom-left tile: terracotta accent */}
      <rect x="2" y="31" width="23" height="23" rx="2" fill="url(#logo-bl)" />
      <rect x="5" y="35" width="9" height="2.5" rx="1.2" fill="#D4956A" opacity="0.75" />
      <rect x="5" y="39.5" width="6" height="2" rx="1" fill="#D4956A" opacity="0.45" />
      <rect x="5" y="43.5" width="4" height="1.5" rx="0.75" fill="#D4956A" opacity="0.3" />

      {/* Bottom-right tile: warm sand reversed */}
      <rect x="31" y="31" width="23" height="23" rx="2" fill="url(#logo-br)" />
      <rect x="34" y="35" width="9" height="2.5" rx="1.2" fill="#DDD0BC" opacity="0.75" />
      <rect x="34" y="39.5" width="6" height="2" rx="1" fill="#DDD0BC" opacity="0.45" />
      <rect x="34" y="43.5" width="4" height="1.5" rx="0.75" fill="#DDD0BC" opacity="0.3" />

      {/* ── Logotype ──────────────────────────────────────────────────── */}
      {/* Primary wordmark */}
      <text
        x="68"
        y="37"
        fontFamily="Fraunces, Georgia, 'Times New Roman', serif"
        fontSize="26"
        fontWeight="400"
        fill={textColor}
        letterSpacing="4"
      >
        MARINO
      </text>
      {/* Accent dot */}
      <circle cx="261" cy="33" r="3" fill={accentColor} />

      {/* Sub-wordmark */}
      <text
        x="69"
        y="51"
        fontFamily="Inter, Arial, Helvetica, sans-serif"
        fontSize="9.5"
        fontWeight="600"
        fill={accentColor}
        letterSpacing="4.5"
      >
        CERAMIC TILE
      </text>
    </svg>
  );
}
