/**
 * iOS Miner Card Component
 * Card for displaying individual miner information
 */

import React from 'react'
import styled from 'styled-components'

import { iOS_COLOR } from '../../Theme/iOSColors'
import { StatusBadge, StatusType } from '../StatusBadge/StatusBadge'

interface MinerCardProps {
  id: string
  name: string
  model: string
  hashrate: string
  power: string
  temperature: number
  status: StatusType
  efficiency?: string
  pool?: string
  onClick?: () => void
}

const CardContainer = styled.div`
  background-color: ${iOS_COLOR.CARD_BACKGROUND};
  border-radius: 14px;
  padding: 16px;
  cursor: pointer;
  transition: transform 0.15s ease-out, opacity 0.15s ease-out;

  &:active {
    transform: scale(0.98);
    opacity: 0.9;
  }
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`

const MinerInfo = styled.div`
  flex: 1;
`

const MinerName = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: ${iOS_COLOR.LABEL};
  margin: 0 0 4px 0;
`

const MinerModel = styled.p`
  font-size: 13px;
  color: ${iOS_COLOR.LABEL_SECONDARY};
  margin: 0;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const StatLabel = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: ${iOS_COLOR.LABEL_TERTIARY};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const StatValue = styled.span<{ $highlight?: boolean }>`
  font-size: 17px;
  font-weight: 600;
  color: ${(props) => (props.$highlight ? iOS_COLOR.SYSTEM_ORANGE : iOS_COLOR.LABEL)};
  font-variant-numeric: tabular-nums;
`

const TemperatureValue = styled.span<{ $temp: number }>`
  font-size: 17px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: ${(props) => {
    if (props.$temp >= 85) return iOS_COLOR.STATUS_ERROR
    if (props.$temp >= 75) return iOS_COLOR.STATUS_WARNING
    return iOS_COLOR.STATUS_ONLINE
  }};
`

const PoolBadge = styled.div`
  margin-top: 12px;
  padding: 8px 12px;
  background-color: ${iOS_COLOR.FILL_TERTIARY};
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
`

const PoolIcon = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background-color: ${iOS_COLOR.SYSTEM_BLUE};
  display: flex;
  align-items: center;
  justify-content: center;
`

const PoolName = styled.span`
  font-size: 13px;
  color: ${iOS_COLOR.LABEL_SECONDARY};
`

export const MinerCard: React.FC<MinerCardProps> = ({
  name,
  model,
  hashrate,
  power,
  temperature,
  status,
  efficiency,
  pool,
  onClick,
}) => {
  return (
    <CardContainer onClick={onClick}>
      <CardHeader>
        <MinerInfo>
          <MinerName>{name}</MinerName>
          <MinerModel>{model}</MinerModel>
        </MinerInfo>
        <StatusBadge status={status} size="small" />
      </CardHeader>

      <StatsGrid>
        <StatItem>
          <StatLabel>Hashrate</StatLabel>
          <StatValue $highlight>{hashrate}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Power</StatLabel>
          <StatValue>{power}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Temperature</StatLabel>
          <TemperatureValue $temp={temperature}>{temperature}°C</TemperatureValue>
        </StatItem>
        {efficiency && (
          <StatItem>
            <StatLabel>Efficiency</StatLabel>
            <StatValue>{efficiency}</StatValue>
          </StatItem>
        )}
      </StatsGrid>

      {pool && (
        <PoolBadge>
          <PoolIcon>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="white">
              <circle cx="5" cy="5" r="4" />
            </svg>
          </PoolIcon>
          <PoolName>{pool}</PoolName>
        </PoolBadge>
      )}
    </CardContainer>
  )
}

// Compact Miner Row for list views
interface MinerRowProps {
  name: string
  hashrate: string
  status: StatusType
  temperature: number
  onClick?: () => void
}

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: transparent;
  cursor: pointer;
  position: relative;

  &:active {
    background-color: ${iOS_COLOR.FILL_TERTIARY};
  }

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 16px;
    right: 0;
    height: 0.5px;
    background-color: ${iOS_COLOR.SEPARATOR};
  }
`

const RowInfo = styled.div`
  flex: 1;
  min-width: 0;
`

const RowName = styled.span`
  font-size: 17px;
  color: ${iOS_COLOR.LABEL};
  display: block;
`

const RowHashrate = styled.span`
  font-size: 15px;
  color: ${iOS_COLOR.SYSTEM_ORANGE};
  font-weight: 500;
  font-variant-numeric: tabular-nums;
`

const RowStats = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const RowTemp = styled.span<{ $temp: number }>`
  font-size: 15px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: ${(props) => {
    if (props.$temp >= 85) return iOS_COLOR.STATUS_ERROR
    if (props.$temp >= 75) return iOS_COLOR.STATUS_WARNING
    return iOS_COLOR.LABEL_SECONDARY
  }};
`

const ChevronRight = styled.span`
  color: ${iOS_COLOR.LABEL_TERTIARY};
  margin-left: 8px;
`

export const MinerRow: React.FC<MinerRowProps> = ({
  name,
  hashrate,
  status,
  temperature,
  onClick,
}) => {
  return (
    <RowContainer onClick={onClick}>
      <StatusBadge status={status} size="small" showDot label="" />
      <RowInfo style={{ marginLeft: '12px' }}>
        <RowName>{name}</RowName>
        <RowHashrate>{hashrate}</RowHashrate>
      </RowInfo>
      <RowStats>
        <RowTemp $temp={temperature}>{temperature}°C</RowTemp>
        <ChevronRight>
          <svg width="8" height="13" viewBox="0 0 8 13" fill="currentColor">
            <path d="M1.5 1L6.5 6.5L1.5 12" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </ChevronRight>
      </RowStats>
    </RowContainer>
  )
}

export default MinerCard
