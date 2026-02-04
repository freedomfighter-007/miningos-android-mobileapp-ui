/**
 * iOS Layout Component
 * Main layout wrapper with navigation for iOS app
 */

import React, { useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { NavigationBar, TabBar, TabItem } from '../Components'
import { iOS_ROUTES } from '../router/iOSRouter'
import { iOS_COLOR } from '../Theme/iOSColors'

const LayoutContainer = styled.div`
  min-height: 100vh;
  background-color: ${iOS_COLOR.BACKGROUND_PRIMARY};
`

const MainContent = styled.main`
  min-height: 100vh;
`

// Tab Bar Icons
const DashboardIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
  </svg>
)

const MinersIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
  </svg>
)

const AlertsIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
  </svg>
)

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
)

// Route to title mapping
const routeTitles: Record<string, string> = {
  [iOS_ROUTES.DASHBOARD]: 'Dashboard',
  [iOS_ROUTES.MINERS]: 'Miners',
  [iOS_ROUTES.ALERTS]: 'Alerts',
  [iOS_ROUTES.SETTINGS]: 'Settings',
}

export const IOSLayout: React.FC = () => {
  const location = useLocation()

  // Define tabs
  const tabs: TabItem[] = useMemo(
    () => [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: <DashboardIcon />,
        path: iOS_ROUTES.DASHBOARD,
      },
      {
        id: 'miners',
        label: 'Miners',
        icon: <MinersIcon />,
        path: iOS_ROUTES.MINERS,
      },
      {
        id: 'alerts',
        label: 'Alerts',
        icon: <AlertsIcon />,
        path: iOS_ROUTES.ALERTS,
        badge: 3, // Example badge count
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: <SettingsIcon />,
        path: iOS_ROUTES.SETTINGS,
      },
    ],
    [],
  )

  // Get current page title
  const currentTitle = routeTitles[location.pathname] || 'MiningOS'

  // Determine if we should show large title (only for certain pages)
  const largeTitleRoutes: string[] = [iOS_ROUTES.DASHBOARD, iOS_ROUTES.SETTINGS]
  const showLargeTitle = largeTitleRoutes.includes(location.pathname)

  return (
    <LayoutContainer>
      <NavigationBar
        title={currentTitle}
        largeTitle={showLargeTitle}
        transparent={showLargeTitle}
      />
      <MainContent>
        <Outlet />
      </MainContent>
      <TabBar tabs={tabs} />
    </LayoutContainer>
  )
}

export default IOSLayout
