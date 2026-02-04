/**
 * Hook to detect iOS mode
 * iOS mode is enabled when:
 * 1. URL starts with /ios
 * 2. Query parameter ?platform=ios is present
 * 3. Running on an actual iOS device (optional)
 */

import { useMemo } from 'react'

export interface IOSModeConfig {
  isIOSMode: boolean
  isIOSDevice: boolean
}

export const useIOSMode = (): IOSModeConfig => {
  const config = useMemo(() => {
    // Check URL path
    const isIOSPath = window.location.pathname.startsWith('/ios')

    // Check query parameter
    const urlParams = new URLSearchParams(window.location.search)
    const platformParam = urlParams.get('platform')
    const isIOSParam = platformParam === 'ios'

    // Check if running on actual iOS device
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

    // iOS mode is enabled if any of these conditions are true
    const isIOSMode = isIOSPath || isIOSParam

    return {
      isIOSMode,
      isIOSDevice,
    }
  }, [])

  return config
}

export default useIOSMode
