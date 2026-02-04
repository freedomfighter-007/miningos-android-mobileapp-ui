/**
 * iOS Global Styles
 * Base styles for the iOS app following iOS Human Interface Guidelines
 */

import { createGlobalStyle } from 'styled-components'

import { iOS_COLOR } from './iOSColors'

export const IOSGlobalStyle = createGlobalStyle`
  /* iOS Base Styles */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
  }

  html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    touch-action: manipulation;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif;
    background-color: ${iOS_COLOR.BACKGROUND_PRIMARY};
    color: ${iOS_COLOR.LABEL};
    line-height: 1.5;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* iOS-style scrollbar hiding */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Allow text selection in inputs */
  input, textarea {
    -webkit-user-select: auto;
    user-select: auto;
  }

  /* iOS Button Reset */
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
    appearance: none;
  }

  /* iOS Input Reset */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    border: none;
    outline: none;
    appearance: none;
  }

  /* iOS List Reset */
  ul, ol {
    list-style: none;
  }

  /* iOS Link Reset */
  a {
    color: ${iOS_COLOR.SYSTEM_ORANGE};
    text-decoration: none;

    &:active {
      opacity: 0.7;
    }
  }

  /* Safe Area Padding */
  .ios-safe-area {
    padding-top: env(safe-area-inset-top, 47px);
    padding-bottom: env(safe-area-inset-bottom, 34px);
    padding-left: env(safe-area-inset-left, 0);
    padding-right: env(safe-area-inset-right, 0);
  }

  /* iOS Blur Effect Base */
  .ios-blur {
    backdrop-filter: saturate(180%) blur(20px);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
  }

  /* iOS Haptic Touch Effect */
  .ios-pressable {
    transition: transform 0.1s ease-out, opacity 0.1s ease-out;

    &:active {
      transform: scale(0.97);
      opacity: 0.9;
    }
  }

  /* iOS Card Base */
  .ios-card {
    background-color: ${iOS_COLOR.CARD_BACKGROUND};
    border-radius: 14px;
    overflow: hidden;
  }

  /* iOS Section Header */
  .ios-section-header {
    font-size: 13px;
    font-weight: 400;
    color: ${iOS_COLOR.LABEL_SECONDARY};
    text-transform: uppercase;
    letter-spacing: -0.08px;
    padding: 8px 16px;
  }

  /* Number font variant for tabular figures */
  .ios-tabular-nums {
    font-variant-numeric: tabular-nums;
  }

  /* iOS Divider */
  .ios-divider {
    height: 0.5px;
    background-color: ${iOS_COLOR.SEPARATOR};
    margin-left: 16px;
  }

  /* Animation keyframes */
  @keyframes ios-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes ios-slide-up {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes ios-scale-in {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes ios-pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes ios-shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`

export default IOSGlobalStyle
