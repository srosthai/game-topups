// Helper to generate self-contained, high-resolution SVG logos as Data URIs for game thumbnails.
// This guarantees 100% reliable loading with zero CORS or network latency issues.

interface SVGGameConfig {
  name: string;
  sub?: string;
  bgGrad: [string, string];
  accentColor: string;
  iconType: 'sword' | 'crosshair' | 'sparkle' | 'trophy' | 'gamepad' | 'flame' | 'shield' | 'star' | 'ball';
}

const GAME_CONFIGS: Record<string, SVGGameConfig> = {
  'Mobile Legends': {
    name: 'MOBILE LEGENDS',
    sub: 'BANG BANG',
    bgGrad: ['#1E1B4B', '#4338CA'],
    accentColor: '#F59E0B',
    iconType: 'sword',
  },
  'PUBG Mobile': {
    name: 'PUBG',
    sub: 'MOBILE',
    bgGrad: ['#18181B', '#27272A'],
    accentColor: '#F59E0B',
    iconType: 'crosshair',
  },
  'Free Fire': {
    name: 'FREE FIRE',
    sub: 'GARENA',
    bgGrad: ['#7C2D12', '#EA580C'],
    accentColor: '#FDE047',
    iconType: 'flame',
  },
  'Clash of Clans': {
    name: 'CLASH OF CLANS',
    sub: 'SUPERCELL',
    bgGrad: ['#78350F', '#D97706'],
    accentColor: '#FEF08A',
    iconType: 'shield',
  },
  'Call of Duty: Mobile': {
    name: 'CALL OF DUTY',
    sub: 'MOBILE',
    bgGrad: ['#09090B', '#27272A'],
    accentColor: '#84CC16',
    iconType: 'crosshair',
  },
  'Arena of Valor': {
    name: 'ARENA OF VALOR',
    sub: 'AOV',
    bgGrad: ['#1E3A8A', '#2563EB'],
    accentColor: '#FBBF24',
    iconType: 'sword',
  },
  'Honor of Kings': {
    name: 'HONOR OF KINGS',
    sub: 'HOK',
    bgGrad: ['#581C87', '#9333EA'],
    accentColor: '#FACC15',
    iconType: 'trophy',
  },
  'Genshin Impact': {
    name: 'GENSHIN IMPACT',
    sub: 'HOYOVERSE',
    bgGrad: ['#064E3B', '#0D9488'],
    accentColor: '#A7F3D0',
    iconType: 'sparkle',
  },
  'Roblox': {
    name: 'ROBLOX',
    sub: 'GAMES',
    bgGrad: ['#881337', '#E11D48'],
    accentColor: '#FFFFFF',
    iconType: 'gamepad',
  },
  'Wild Rift': {
    name: 'WILD RIFT',
    sub: 'LEAGUE OF LEGENDS',
    bgGrad: ['#0F172A', '#0284C7'],
    accentColor: '#38BDF8',
    iconType: 'sword',
  },
  'Brawl Stars': {
    name: 'BRAWL STARS',
    sub: 'SUPERCELL',
    bgGrad: ['#701A75', '#C026D3'],
    accentColor: '#FDE047',
    iconType: 'star',
  },
  'Clash Royale': {
    name: 'CLASH ROYALE',
    sub: 'SUPERCELL',
    bgGrad: ['#1E3A8A', '#3B82F6'],
    accentColor: '#FACC15',
    iconType: 'trophy',
  },
  'Honkai: Star Rail': {
    name: 'STAR RAIL',
    sub: 'HONKAI',
    bgGrad: ['#312E81', '#6366F1'],
    accentColor: '#F472B6',
    iconType: 'sparkle',
  },
  'EA Sports FC Mobile': {
    name: 'FC MOBILE',
    sub: 'EA SPORTS',
    bgGrad: ['#064E3B', '#10B981'],
    accentColor: '#34D399',
    iconType: 'ball',
  },
  'eFootball Mobile': {
    name: 'eFOOTBALL',
    sub: 'KONAMI',
    bgGrad: ['#1E1B4B', '#4F46E5'],
    accentColor: '#F43F5E',
    iconType: 'ball',
  },
  'Pokémon UNITE': {
    name: 'POKÉMON UNITE',
    sub: 'UNITE',
    bgGrad: ['#312E81', '#7C3AED'],
    accentColor: '#FBBF24',
    iconType: 'star',
  },
  'Stumble Guys': {
    name: 'STUMBLE GUYS',
    sub: 'PARTY',
    bgGrad: ['#155E75', '#06B6D4'],
    accentColor: '#FDE047',
    iconType: 'gamepad',
  },
  'Hay Day': {
    name: 'HAY DAY',
    sub: 'FARM',
    bgGrad: ['#14532D', '#22C55E'],
    accentColor: '#FEF08A',
    iconType: 'shield',
  },
  'Lords Mobile': {
    name: 'LORDS MOBILE',
    sub: 'IGG',
    bgGrad: ['#701A75', '#A21CAF'],
    accentColor: '#FACC15',
    iconType: 'trophy',
  },
  'Metal Slug: Awakening': {
    name: 'METAL SLUG',
    sub: 'AWAKENING',
    bgGrad: ['#7F1D1D', '#DC2626'],
    accentColor: '#FCD34D',
    iconType: 'crosshair',
  },
  'Solo Leveling: Arise': {
    name: 'SOLO LEVELING',
    sub: 'ARISE',
    bgGrad: ['#18181B', '#3F3F46'],
    accentColor: '#818CF8',
    iconType: 'sword',
  },
  'Zenless Zone Zero': {
    name: 'ZENLESS ZONE ZERO',
    sub: 'ZZZ',
    bgGrad: ['#172554', '#2563EB'],
    accentColor: '#FACC15',
    iconType: 'flame',
  },
};

function getIconSVG(type: string, color: string): string {
  switch (type) {
    case 'sword':
      return `<path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 13l2 2" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
    case 'crosshair':
      return `<circle cx="12" cy="12" r="8" stroke="${color}" stroke-width="2" fill="none"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>`;
    case 'flame':
      return `<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3" stroke="${color}" stroke-width="2" fill="none"/>`;
    case 'trophy':
      return `<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M12 15a7 7 0 0 0 7-7V3H5v5a7 7 0 0 0 7 7Z" stroke="${color}" stroke-width="2" fill="none"/>`;
    case 'sparkle':
      return `<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" stroke="${color}" stroke-width="2" fill="none"/>`;
    case 'star':
      return `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="${color}" stroke-width="2" fill="none"/>`;
    case 'ball':
      return `<circle cx="12" cy="12" r="9" stroke="${color}" stroke-width="2" fill="none"/><path d="M12 3a9 9 0 0 0 0 18M3 12a9 9 0 0 0 18 0" stroke="${color}" stroke-width="1.5"/>`;
    default:
      return `<rect x="2" y="6" width="20" height="12" rx="4" stroke="${color}" stroke-width="2" fill="none"/><circle cx="8" cy="12" r="1.5" fill="${color}"/><circle cx="16" cy="12" r="1.5" fill="${color}"/>`;
  }
}

export function generateGameLogoSVG(gameName: string): string {
  const cfg = GAME_CONFIGS[gameName] || {
    name: gameName.toUpperCase(),
    sub: 'GAME TOPUP',
    bgGrad: ['#1F2937', '#111827'],
    accentColor: '#A8C88A',
    iconType: 'gamepad',
  };

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 225" width="300" height="225">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${cfg.bgGrad[0]}"/>
      <stop offset="100%" stop-color="${cfg.bgGrad[1]}"/>
    </linearGradient>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Background Card -->
  <rect width="300" height="225" rx="16" fill="url(#bg)"/>
  <rect width="300" height="225" rx="16" fill="url(#grid)"/>

  <!-- Decorative Outer Frame -->
  <rect x="8" y="8" width="284" height="209" rx="12" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>

  <!-- Icon Circle Container -->
  <circle cx="150" cy="80" r="32" fill="rgba(0,0,0,0.3)" stroke="${cfg.accentColor}" stroke-width="2.5"/>
  <g transform="translate(138, 68)">
    ${getIconSVG(cfg.iconType, cfg.accentColor)}
  </g>

  <!-- Game Title Text -->
  <text x="150" y="145" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="20" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">
    ${cfg.name}
  </text>

  <!-- Subtitle / Publisher Badge -->
  <rect x="90" y="162" width="120" height="22" rx="6" fill="${cfg.accentColor}"/>
  <text x="150" y="177" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="10" fill="#1D1D1D" text-anchor="middle" letter-spacing="1.5">
    ${cfg.sub}
  </text>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
