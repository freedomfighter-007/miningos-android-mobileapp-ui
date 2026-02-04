/**
 * iOS Router Configuration
 * Routing for the iOS app with tab-based navigation
 */

import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { IOSLayout } from '../Layout/iOSLayout'
import { Dashboard } from '../Views/Dashboard/Dashboard'
import { Miners } from '../Views/Miners/Miners'
import { Alerts } from '../Views/Alerts/Alerts'
import { Settings } from '../Views/Settings/Settings'

// iOS Routes
export const iOS_ROUTES = {
  ROOT: '/ios',
  DASHBOARD: '/ios/dashboard',
  MINERS: '/ios/miners',
  ALERTS: '/ios/alerts',
  SETTINGS: '/ios/settings',
} as const

// Create iOS Router
export const getiOSRouter = () =>
  createBrowserRouter([
    {
      path: iOS_ROUTES.ROOT,
      element: <IOSLayout />,
      children: [
        {
          index: true,
          element: <Navigate to={iOS_ROUTES.DASHBOARD} replace />,
        },
        {
          path: iOS_ROUTES.DASHBOARD,
          element: <Dashboard />,
        },
        {
          path: iOS_ROUTES.MINERS,
          element: <Miners />,
        },
        {
          path: iOS_ROUTES.ALERTS,
          element: <Alerts />,
        },
        {
          path: iOS_ROUTES.SETTINGS,
          element: <Settings />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to={iOS_ROUTES.DASHBOARD} replace />,
    },
  ])

export default getiOSRouter
