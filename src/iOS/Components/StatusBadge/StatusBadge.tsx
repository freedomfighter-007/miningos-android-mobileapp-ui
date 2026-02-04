/**
 * iOS Status Badge Component
 * Status indicators for miners, devices, and other entities
 */

import React from 'react'
import styled from 'styled-components'

import { iOS_COLOR } from '../../Theme/iOSColors'

export type StatusType = 'online' | 'offline' | 'warning' | 'error' | 'sleeping' | 'maintenance'

interface StatusBadgeProps {
  status: StatusType
  label?: string
  size?: 'small' | 'medium' | 'large'
  showDot?: boolean
}

const statusColors: Record<StatusType, string> = {
  online: iOS_COLOR.STATUS_ONLINE,
  offline: iOS_COLOR.STATUS_OFFLINE,
  warning: iOS_COLOR.STATUS_WARNING,
  error: iOS_COLOR.STATUS_ERROR,
  sleeping: iOS_COLOR.STATUS_SLEEPING,
  maintenance: iOS_COLOR.STATUS_MAINTENANCE,
}

const statusLabels: Record<StatusType, string> = {
  online: 'Online',
  offline: 'Offline',
  warning: 'Warning',
  error: 'Error',
  sleeping: 'Sleeping',
  maintenance: 'Maintenance',
}

const sizeConfig = {
  small: { dot: 6, padding: '2px 8px', fontSize: '11px', gap: '4px' },
  medium: { dot: 8, padding: '4px 10px', fontSize: '13px', gap: '6px' },
  large: { dot: 10, padding: '6px 12px', fontSize: '15px', gap: '8px' },
}

const BadgeContainer = styled.span<{ $status: StatusType; $size: 'small' | 'medium' | 'large' }>`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => sizeConfig[props.$size].gap};
  padding: ${(props) => sizeConfig[props.$size].padding};
  background-color: ${(props) => `${statusColors[props.$status]}20`};
  border-radius: 100px;
`

const StatusDot = styled.span<{ $status: StatusType; $size: 'small' | 'medium' | 'large' }>`
  width: ${(props) => sizeConfig[props.$size].dot}px;
  height: ${(props) => sizeConfig[props.$size].dot}px;
  border-radius: 50%;
  background-color: ${(props) => statusColors[props.$status]};
  flex-shrink: 0;

  ${(props) =>
    (props.$status === 'online' || props.$status === 'warning') &&
    `
    animation: pulse 2s infinite;

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.6;
      }
    }
  `}
`

const StatusLabel = styled.span<{ $status: StatusType; $size: 'small' | 'medium' | 'large' }>`
  font-size: ${(props) => sizeConfig[props.$size].fontSize};
  font-weight: 500;
  color: ${(props) => statusColors[props.$status]};
  white-space: nowrap;
`

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  size = 'medium',
  showDot = true,
}) => {
  return (
    <BadgeContainer $status={status} $size={size}>
      {showDot && <StatusDot $status={status} $size={size} />}
      <StatusLabel $status={status} $size={size}>
        {label || statusLabels[status]}
      </StatusLabel>
    </BadgeContainer>
  )
}

// Simple Status Dot Component
interface StatusDotOnlyProps {
  status: StatusType
  size?: number
}

const SimpleDot = styled.span<{ $status: StatusType; $size: number }>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  border-radius: 50%;
  background-color: ${(props) => statusColors[props.$status]};
  flex-shrink: 0;
  display: inline-block;
`

export const StatusDotOnly: React.FC<StatusDotOnlyProps> = ({ status, size = 8 }) => {
  return <SimpleDot $status={status} $size={size} />
}

export default StatusBadge
