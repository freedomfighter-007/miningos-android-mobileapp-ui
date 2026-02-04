/**
 * iOS Tab Bar Component
 * Bottom navigation following iOS Human Interface Guidelines
 */

import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { iOS_COLOR } from '../../Theme/iOSColors'

export interface TabItem {
  id: string
  label: string
  icon: React.ReactNode
  path: string
  badge?: number
}

interface TabBarProps {
  tabs: TabItem[]
}

const TabBarContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: calc(49px + env(safe-area-inset-bottom, 34px));
  padding-bottom: env(safe-area-inset-bottom, 34px);
  background-color: ${iOS_COLOR.TAB_BAR_BACKGROUND};
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-top: 0.5px solid ${iOS_COLOR.SEPARATOR};
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  z-index: 1000;
`

const TabItem = styled.button<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 49px;
  padding: 6px 0;
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;
  transition: opacity 0.15s ease-out;

  &:active {
    opacity: 0.7;
  }
`

const TabIcon = styled.span<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  margin-bottom: 2px;

  svg {
    width: 25px;
    height: 25px;
    fill: ${(props) => (props.$isActive ? iOS_COLOR.TAB_BAR_ACTIVE : iOS_COLOR.TAB_BAR_INACTIVE)};
    transition: fill 0.15s ease-out;
  }
`

const TabLabel = styled.span<{ $isActive: boolean }>`
  font-size: 10px;
  font-weight: 500;
  color: ${(props) => (props.$isActive ? iOS_COLOR.TAB_BAR_ACTIVE : iOS_COLOR.TAB_BAR_INACTIVE)};
  transition: color 0.15s ease-out;
  letter-spacing: 0.07px;
`

const Badge = styled.span`
  position: absolute;
  top: 2px;
  right: 50%;
  transform: translateX(12px);
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  background-color: ${iOS_COLOR.SYSTEM_RED};
  border-radius: 9px;
  font-size: 12px;
  font-weight: 500;
  color: ${iOS_COLOR.LABEL};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const TabBar: React.FC<TabBarProps> = ({ tabs }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleTabClick = (path: string) => {
    navigate(path)
  }

  return (
    <TabBarContainer>
      {tabs.map((tab) => {
        const isActive = location.pathname.startsWith(tab.path)
        return (
          <TabItem
            key={tab.id}
            $isActive={isActive}
            onClick={() => handleTabClick(tab.path)}
            aria-label={tab.label}
          >
            <TabIcon $isActive={isActive}>{tab.icon}</TabIcon>
            <TabLabel $isActive={isActive}>{tab.label}</TabLabel>
            {tab.badge !== undefined && tab.badge > 0 && (
              <Badge>{tab.badge > 99 ? '99+' : tab.badge}</Badge>
            )}
          </TabItem>
        )
      })}
    </TabBarContainer>
  )
}

export default TabBar
