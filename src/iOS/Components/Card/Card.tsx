/**
 * iOS Card Component
 * Card container following iOS design patterns
 */

import React from 'react'
import styled, { css } from 'styled-components'

import { iOS_COLOR } from '../../Theme/iOSColors'

interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'inset' | 'elevated'
  padding?: 'none' | 'small' | 'medium' | 'large'
  onClick?: () => void
  className?: string
}

const paddingMap = {
  none: '0',
  small: '12px',
  medium: '16px',
  large: '20px',
}

const CardContainer = styled.div<{
  $variant: 'default' | 'inset' | 'elevated'
  $padding: 'none' | 'small' | 'medium' | 'large'
  $clickable: boolean
}>`
  background-color: ${iOS_COLOR.CARD_BACKGROUND};
  border-radius: 14px;
  padding: ${(props) => paddingMap[props.$padding]};
  overflow: hidden;
  transition: transform 0.15s ease-out, opacity 0.15s ease-out;

  ${(props) =>
    props.$variant === 'inset' &&
    css`
      margin: 0 16px;
    `}

  ${(props) =>
    props.$variant === 'elevated' &&
    css`
      background-color: ${iOS_COLOR.CARD_BACKGROUND_ELEVATED};
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
    `}

  ${(props) =>
    props.$clickable &&
    css`
      cursor: pointer;

      &:active {
        transform: scale(0.98);
        opacity: 0.9;
      }
    `}
`

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'medium',
  onClick,
  className,
}) => {
  return (
    <CardContainer
      $variant={variant}
      $padding={padding}
      $clickable={!!onClick}
      onClick={onClick}
      className={className}
    >
      {children}
    </CardContainer>
  )
}

// Card Header Component
export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`

export const CardTitle = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: ${iOS_COLOR.LABEL};
  margin: 0;
`

export const CardSubtitle = styled.p`
  font-size: 13px;
  color: ${iOS_COLOR.LABEL_SECONDARY};
  margin: 4px 0 0 0;
`

// Stat Card for displaying metrics
interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  color?: string
}

const StatCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const StatIcon = styled.span<{ $color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: ${(props) => (props.$color ? `${props.$color}20` : iOS_COLOR.FILL_PRIMARY)};

  svg {
    width: 18px;
    height: 18px;
    fill: ${(props) => props.$color || iOS_COLOR.SYSTEM_ORANGE};
  }
`

const StatTitle = styled.span`
  font-size: 13px;
  color: ${iOS_COLOR.LABEL_SECONDARY};
`

const StatValue = styled.span<{ $color?: string }>`
  font-size: 28px;
  font-weight: 700;
  color: ${(props) => props.$color || iOS_COLOR.LABEL};
  font-variant-numeric: tabular-nums;
`

const StatFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

const TrendIndicator = styled.span<{ $trend: 'up' | 'down' | 'neutral' }>`
  font-size: 13px;
  font-weight: 500;
  color: ${(props) =>
    props.$trend === 'up'
      ? iOS_COLOR.STATUS_ONLINE
      : props.$trend === 'down'
        ? iOS_COLOR.STATUS_ERROR
        : iOS_COLOR.LABEL_SECONDARY};
`

const StatSubtitle = styled.span`
  font-size: 13px;
  color: ${iOS_COLOR.LABEL_TERTIARY};
`

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  color,
}) => {
  return (
    <Card padding="medium">
      <StatCardContainer>
        <StatHeader>
          {icon && <StatIcon $color={color}>{icon}</StatIcon>}
          <StatTitle>{title}</StatTitle>
        </StatHeader>
        <StatValue $color={color}>{value}</StatValue>
        {(trend || subtitle) && (
          <StatFooter>
            {trend && trendValue && (
              <TrendIndicator $trend={trend}>
                {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}
                {trendValue}
              </TrendIndicator>
            )}
            {subtitle && <StatSubtitle>{subtitle}</StatSubtitle>}
          </StatFooter>
        )}
      </StatCardContainer>
    </Card>
  )
}

export default Card
