/**
 * iOS Theme Configuration
 * Follows iOS Human Interface Guidelines for dark mode
 */

import { iOS_COLOR, iOS_GRADIENTS } from './iOSColors'

export interface iOSTheme {
  // Colors
  colors: typeof iOS_COLOR
  gradients: typeof iOS_GRADIENTS

  // Typography
  typography: {
    largeTitle: { fontSize: string; fontWeight: number; lineHeight: string }
    title1: { fontSize: string; fontWeight: number; lineHeight: string }
    title2: { fontSize: string; fontWeight: number; lineHeight: string }
    title3: { fontSize: string; fontWeight: number; lineHeight: string }
    headline: { fontSize: string; fontWeight: number; lineHeight: string }
    body: { fontSize: string; fontWeight: number; lineHeight: string }
    callout: { fontSize: string; fontWeight: number; lineHeight: string }
    subhead: { fontSize: string; fontWeight: number; lineHeight: string }
    footnote: { fontSize: string; fontWeight: number; lineHeight: string }
    caption1: { fontSize: string; fontWeight: number; lineHeight: string }
    caption2: { fontSize: string; fontWeight: number; lineHeight: string }
  }

  // Spacing (iOS standard spacing values)
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    xxl: string
  }

  // Border Radius (iOS standard corner radius)
  borderRadius: {
    small: string
    medium: string
    large: string
    xlarge: string
    full: string
  }

  // Shadows
  shadows: {
    small: string
    medium: string
    large: string
    card: string
  }

  // Safe Areas
  safeArea: {
    top: string
    bottom: string
  }

  // Animation
  animation: {
    fast: string
    normal: string
    slow: string
  }
}

export const iOSDarkTheme: iOSTheme = {
  colors: iOS_COLOR,
  gradients: iOS_GRADIENTS,

  // iOS Typography Scale (SF Pro Display/Text)
  typography: {
    largeTitle: { fontSize: '34px', fontWeight: 700, lineHeight: '41px' },
    title1: { fontSize: '28px', fontWeight: 700, lineHeight: '34px' },
    title2: { fontSize: '22px', fontWeight: 700, lineHeight: '28px' },
    title3: { fontSize: '20px', fontWeight: 600, lineHeight: '25px' },
    headline: { fontSize: '17px', fontWeight: 600, lineHeight: '22px' },
    body: { fontSize: '17px', fontWeight: 400, lineHeight: '22px' },
    callout: { fontSize: '16px', fontWeight: 400, lineHeight: '21px' },
    subhead: { fontSize: '15px', fontWeight: 400, lineHeight: '20px' },
    footnote: { fontSize: '13px', fontWeight: 400, lineHeight: '18px' },
    caption1: { fontSize: '12px', fontWeight: 400, lineHeight: '16px' },
    caption2: { fontSize: '11px', fontWeight: 400, lineHeight: '13px' },
  },

  // iOS Standard Spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    xxl: '32px',
  },

  // iOS Corner Radius
  borderRadius: {
    small: '6px',
    medium: '10px',
    large: '14px',
    xlarge: '20px',
    full: '9999px',
  },

  // iOS Shadows
  shadows: {
    small: '0px 1px 2px rgba(0, 0, 0, 0.3)',
    medium: '0px 2px 8px rgba(0, 0, 0, 0.4)',
    large: '0px 4px 16px rgba(0, 0, 0, 0.5)',
    card: '0px 2px 12px rgba(0, 0, 0, 0.25)',
  },

  // Safe Areas for iOS devices
  safeArea: {
    top: 'env(safe-area-inset-top, 47px)',
    bottom: 'env(safe-area-inset-bottom, 34px)',
  },

  // iOS Standard Animations
  animation: {
    fast: '0.15s ease-out',
    normal: '0.25s ease-out',
    slow: '0.35s ease-out',
  },
}

export default iOSDarkTheme
