/**
 * iOS App Entry Point
 * Main app component for the iOS version
 */

import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { getiOSRouter } from './router/iOSRouter'
import { iOSDarkTheme, IOSGlobalStyle } from './Theme'

export const IOSApp: React.FC = () => {
  const router = getiOSRouter()

  return (
    <ThemeProvider theme={iOSDarkTheme}>
      <IOSGlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default IOSApp
