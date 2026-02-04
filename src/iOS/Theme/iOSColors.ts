/**
 * iOS App Color Palette
 * Based on iOS Human Interface Guidelines with MiningOS branding
 */

export const iOS_COLOR = {
  // System Colors (iOS-style)
  SYSTEM_ORANGE: '#F7931A', // Brand primary - Bitcoin orange
  SYSTEM_ORANGE_DARK: '#C4730F',
  SYSTEM_RED: '#FF3B30',
  SYSTEM_GREEN: '#34C759',
  SYSTEM_BLUE: '#007AFF',
  SYSTEM_YELLOW: '#FFCC00',
  SYSTEM_PURPLE: '#AF52DE',
  SYSTEM_PINK: '#FF2D55',
  SYSTEM_TEAL: '#5AC8FA',
  SYSTEM_INDIGO: '#5856D6',

  // Grayscale
  LABEL: '#FFFFFF',
  LABEL_SECONDARY: '#EBEBF599', // 60% opacity
  LABEL_TERTIARY: '#EBEBF54D', // 30% opacity
  LABEL_QUATERNARY: '#EBEBF52E', // 18% opacity

  // Backgrounds (Dark Mode)
  BACKGROUND_PRIMARY: '#000000',
  BACKGROUND_SECONDARY: '#1C1C1E',
  BACKGROUND_TERTIARY: '#2C2C2E',
  BACKGROUND_ELEVATED: '#1C1C1E',
  BACKGROUND_GROUPED: '#000000',
  BACKGROUND_GROUPED_SECONDARY: '#1C1C1E',

  // Fill Colors
  FILL_PRIMARY: '#78788033', // 20% opacity
  FILL_SECONDARY: '#78788029', // 16% opacity
  FILL_TERTIARY: '#7676801F', // 12% opacity
  FILL_QUATERNARY: '#74748014', // 8% opacity

  // Separator Colors
  SEPARATOR: '#54545899', // 60% opacity
  SEPARATOR_OPAQUE: '#38383A',

  // Brand Colors
  BRAND_ORANGE: '#F7931A',
  BRAND_ORANGE_ALPHA_10: '#F7931A1A',
  BRAND_ORANGE_ALPHA_20: '#F7931A33',
  BRAND_ORANGE_ALPHA_30: '#F7931A4D',

  // Status Colors
  STATUS_ONLINE: '#34C759',
  STATUS_OFFLINE: '#8E8E93',
  STATUS_WARNING: '#FF9500',
  STATUS_ERROR: '#FF3B30',
  STATUS_SLEEPING: '#5AC8FA',
  STATUS_MAINTENANCE: '#FF9500',

  // Miner Power Mode Colors
  POWER_SLEEP: '#5AC8FA',
  POWER_LOW: '#34C759',
  POWER_NORMAL: '#30D158',
  POWER_HIGH: '#32D74B',

  // Card Colors
  CARD_BACKGROUND: '#1C1C1E',
  CARD_BACKGROUND_ELEVATED: '#2C2C2E',
  CARD_BORDER: '#38383A',

  // Tab Bar
  TAB_BAR_BACKGROUND: '#1C1C1ED9', // 85% opacity for blur effect
  TAB_BAR_ACTIVE: '#F7931A',
  TAB_BAR_INACTIVE: '#8E8E93',

  // Navigation Bar
  NAV_BAR_BACKGROUND: '#1C1C1ED9',
  NAV_BAR_TITLE: '#FFFFFF',
  NAV_BAR_TINT: '#F7931A',

  // Chart Colors
  CHART_LINE_PRIMARY: '#F7931A',
  CHART_LINE_SECONDARY: '#5AC8FA',
  CHART_AREA_FILL: '#F7931A33',
  CHART_GRID: '#38383A',
} as const

export const iOS_GRADIENTS = {
  ORANGE_GLOW: 'linear-gradient(180deg, #F7931A33 0%, transparent 100%)',
  CARD_HIGHLIGHT: 'linear-gradient(135deg, #2C2C2E 0%, #1C1C1E 100%)',
  STATUS_SUCCESS: 'linear-gradient(180deg, #34C75933 0%, transparent 100%)',
  STATUS_ERROR: 'linear-gradient(180deg, #FF3B3033 0%, transparent 100%)',
} as const

export type iOSColorKey = keyof typeof iOS_COLOR
export type iOSGradientKey = keyof typeof iOS_GRADIENTS
