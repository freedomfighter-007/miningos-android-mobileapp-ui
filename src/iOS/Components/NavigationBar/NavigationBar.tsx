/**
 * iOS Navigation Bar Component
 * Top navigation following iOS Human Interface Guidelines
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { iOS_COLOR } from '../../Theme/iOSColors'

interface NavigationBarProps {
  title: string
  largeTitle?: boolean
  showBackButton?: boolean
  backButtonLabel?: string
  rightButton?: React.ReactNode
  onBackClick?: () => void
  transparent?: boolean
}

const NavBarContainer = styled.header<{ $transparent?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: ${(props) =>
    props.$transparent ? 'transparent' : iOS_COLOR.NAV_BAR_BACKGROUND};
  backdrop-filter: ${(props) => (props.$transparent ? 'none' : 'saturate(180%) blur(20px)')};
  -webkit-backdrop-filter: ${(props) => (props.$transparent ? 'none' : 'saturate(180%) blur(20px)')};
  border-bottom: ${(props) =>
    props.$transparent ? 'none' : `0.5px solid ${iOS_COLOR.SEPARATOR}`};
`

const SafeArea = styled.div`
  padding-top: env(safe-area-inset-top, 47px);
`

const NavBarContent = styled.div`
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  position: relative;
`

const NavBarSection = styled.div`
  display: flex;
  align-items: center;
  min-width: 70px;
`

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${iOS_COLOR.NAV_BAR_TINT};
  font-size: 17px;
  font-weight: 400;

  &:active {
    opacity: 0.5;
  }
`

const BackIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 17px;
  font-weight: 600;
  color: ${iOS_COLOR.NAV_BAR_TITLE};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 60%;
  text-align: center;
`

const LargeTitleContainer = styled.div`
  padding: 0 16px 8px;
`

const LargeTitle = styled.h1`
  font-size: 34px;
  font-weight: 700;
  color: ${iOS_COLOR.LABEL};
  letter-spacing: 0.37px;
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const ChevronLeftIcon = () => (
  <svg width="12" height="21" viewBox="0 0 12 21" fill="none">
    <path
      d="M10.5 1L1.5 10.5L10.5 20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const NavigationBar: React.FC<NavigationBarProps> = ({
  title,
  largeTitle = false,
  showBackButton = false,
  backButtonLabel = 'Back',
  rightButton,
  onBackClick,
  transparent = false,
}) => {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBackClick) {
      onBackClick()
    } else {
      navigate(-1)
    }
  }

  return (
    <NavBarContainer $transparent={transparent}>
      <SafeArea />
      <NavBarContent>
        <NavBarSection>
          {showBackButton && (
            <BackButton onClick={handleBack} aria-label="Go back">
              <BackIcon>
                <ChevronLeftIcon />
              </BackIcon>
              <span>{backButtonLabel}</span>
            </BackButton>
          )}
        </NavBarSection>

        {!largeTitle && <Title>{title}</Title>}

        <RightSection>
          <NavBarSection style={{ justifyContent: 'flex-end' }}>{rightButton}</NavBarSection>
        </RightSection>
      </NavBarContent>

      {largeTitle && (
        <LargeTitleContainer>
          <LargeTitle>{title}</LargeTitle>
        </LargeTitleContainer>
      )}
    </NavBarContainer>
  )
}

export default NavigationBar
