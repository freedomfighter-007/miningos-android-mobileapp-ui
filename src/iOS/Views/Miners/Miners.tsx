/**
 * iOS Miners View
 * List of all miners with status and key metrics
 */

import React, { useState } from 'react'
import styled from 'styled-components'

import { List, MinerRow, StatusBadge, StatusType } from '../../Components'
import { iOS_COLOR } from '../../Theme/iOSColors'

const MinersContainer = styled.div`
  padding: calc(env(safe-area-inset-top, 47px) + 44px + 60px) 0
    calc(49px + env(safe-area-inset-bottom, 34px) + 20px);
  min-height: 100vh;
  background-color: ${iOS_COLOR.BACKGROUND_PRIMARY};
`

const HeaderSection = styled.div`
  position: fixed;
  top: calc(env(safe-area-inset-top, 47px) + 44px);
  left: 0;
  right: 0;
  z-index: 10;
  background-color: ${iOS_COLOR.BACKGROUND_PRIMARY};
  padding: 12px 16px;
  border-bottom: 0.5px solid ${iOS_COLOR.SEPARATOR};
`

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 12px;
`

const SearchInput = styled.input`
  width: 100%;
  height: 36px;
  padding: 0 12px 0 36px;
  background-color: ${iOS_COLOR.FILL_TERTIARY};
  border-radius: 10px;
  border: none;
  font-size: 17px;
  color: ${iOS_COLOR.LABEL};

  &::placeholder {
    color: ${iOS_COLOR.LABEL_TERTIARY};
  }

  &:focus {
    outline: none;
  }
`

const SearchIcon = styled.span`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: ${iOS_COLOR.LABEL_TERTIARY};

  svg {
    width: 16px;
    height: 16px;
  }
`

const FilterRow = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`

const FilterChip = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 100px;
  border: none;
  background-color: ${(props) =>
    props.$active ? iOS_COLOR.SYSTEM_ORANGE : iOS_COLOR.FILL_TERTIARY};
  color: ${(props) => (props.$active ? iOS_COLOR.LABEL : iOS_COLOR.LABEL_SECONDARY)};
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.15s ease-out;

  &:active {
    opacity: 0.7;
  }
`

const FilterCount = styled.span<{ $active: boolean }>`
  background-color: ${(props) =>
    props.$active ? 'rgba(255, 255, 255, 0.2)' : iOS_COLOR.FILL_PRIMARY};
  padding: 1px 6px;
  border-radius: 100px;
  font-size: 12px;
`

const SummaryBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: ${iOS_COLOR.BACKGROUND_SECONDARY};
`

const SummaryItem = styled.div`
  text-align: center;
`

const SummaryValue = styled.span`
  font-size: 17px;
  font-weight: 600;
  color: ${iOS_COLOR.LABEL};
  display: block;
  font-variant-numeric: tabular-nums;
`

const SummaryLabel = styled.span`
  font-size: 11px;
  color: ${iOS_COLOR.LABEL_TERTIARY};
  text-transform: uppercase;
`

const MinersList = styled.div`
  background-color: ${iOS_COLOR.BACKGROUND_GROUPED_SECONDARY};
  margin: 0 16px;
  border-radius: 14px;
  overflow: hidden;
`

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
`

const EmptyIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background-color: ${iOS_COLOR.FILL_TERTIARY};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;

  svg {
    width: 32px;
    height: 32px;
    fill: ${iOS_COLOR.LABEL_TERTIARY};
  }
`

const EmptyTitle = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: ${iOS_COLOR.LABEL};
  margin: 0 0 4px 0;
`

const EmptyText = styled.p`
  font-size: 15px;
  color: ${iOS_COLOR.LABEL_SECONDARY};
  margin: 0;
`

type FilterType = 'all' | 'online' | 'offline' | 'warning' | 'error'

// Mock miners data
const mockMiners: Array<{
  id: string
  name: string
  hashrate: string
  status: StatusType
  temperature: number
}> = [
  { id: '1', name: 'Miner-001', hashrate: '110.5 TH/s', status: 'online', temperature: 65 },
  { id: '2', name: 'Miner-002', hashrate: '108.2 TH/s', status: 'online', temperature: 68 },
  { id: '3', name: 'Miner-003', hashrate: '115.0 TH/s', status: 'online', temperature: 62 },
  { id: '4', name: 'Miner-004', hashrate: '0 TH/s', status: 'offline', temperature: 0 },
  { id: '5', name: 'Miner-005', hashrate: '112.8 TH/s', status: 'warning', temperature: 78 },
  { id: '6', name: 'Miner-006', hashrate: '105.3 TH/s', status: 'online', temperature: 70 },
  { id: '7', name: 'Miner-007', hashrate: '0 TH/s', status: 'error', temperature: 95 },
  { id: '8', name: 'Miner-008', hashrate: '118.1 TH/s', status: 'online', temperature: 64 },
  { id: '9', name: 'Miner-009', hashrate: '0 TH/s', status: 'sleeping', temperature: 35 },
  { id: '10', name: 'Miner-010', hashrate: '109.7 TH/s', status: 'online', temperature: 67 },
  { id: '11', name: 'Miner-011', hashrate: '111.4 TH/s', status: 'online', temperature: 66 },
  { id: '12', name: 'Miner-012', hashrate: '107.9 TH/s', status: 'maintenance', temperature: 45 },
]

const SearchSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
)

const MinerSVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
  </svg>
)

export const Miners: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  const filteredMiners = mockMiners.filter((miner) => {
    const matchesSearch = miner.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'online' && miner.status === 'online') ||
      (activeFilter === 'offline' && (miner.status === 'offline' || miner.status === 'sleeping')) ||
      (activeFilter === 'warning' && miner.status === 'warning') ||
      (activeFilter === 'error' && miner.status === 'error')

    return matchesSearch && matchesFilter
  })

  const statusCounts = {
    all: mockMiners.length,
    online: mockMiners.filter((m) => m.status === 'online').length,
    offline: mockMiners.filter((m) => m.status === 'offline' || m.status === 'sleeping').length,
    warning: mockMiners.filter((m) => m.status === 'warning').length,
    error: mockMiners.filter((m) => m.status === 'error').length,
  }

  const totalHashrate = mockMiners
    .filter((m) => m.status === 'online')
    .reduce((acc, m) => acc + parseFloat(m.hashrate), 0)
    .toFixed(1)

  return (
    <MinersContainer>
      <HeaderSection>
        <SearchContainer>
          <SearchIcon>
            <SearchSVG />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search miners..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>

        <FilterRow>
          <FilterChip $active={activeFilter === 'all'} onClick={() => setActiveFilter('all')}>
            All
            <FilterCount $active={activeFilter === 'all'}>{statusCounts.all}</FilterCount>
          </FilterChip>
          <FilterChip $active={activeFilter === 'online'} onClick={() => setActiveFilter('online')}>
            Online
            <FilterCount $active={activeFilter === 'online'}>{statusCounts.online}</FilterCount>
          </FilterChip>
          <FilterChip
            $active={activeFilter === 'offline'}
            onClick={() => setActiveFilter('offline')}
          >
            Offline
            <FilterCount $active={activeFilter === 'offline'}>{statusCounts.offline}</FilterCount>
          </FilterChip>
          <FilterChip
            $active={activeFilter === 'warning'}
            onClick={() => setActiveFilter('warning')}
          >
            Warning
            <FilterCount $active={activeFilter === 'warning'}>{statusCounts.warning}</FilterCount>
          </FilterChip>
          <FilterChip $active={activeFilter === 'error'} onClick={() => setActiveFilter('error')}>
            Error
            <FilterCount $active={activeFilter === 'error'}>{statusCounts.error}</FilterCount>
          </FilterChip>
        </FilterRow>
      </HeaderSection>

      <SummaryBar>
        <SummaryItem>
          <SummaryValue>{statusCounts.online}</SummaryValue>
          <SummaryLabel>Online</SummaryLabel>
        </SummaryItem>
        <SummaryItem>
          <SummaryValue>{totalHashrate} TH/s</SummaryValue>
          <SummaryLabel>Total Hashrate</SummaryLabel>
        </SummaryItem>
        <SummaryItem>
          <SummaryValue>{statusCounts.error + statusCounts.warning}</SummaryValue>
          <SummaryLabel>Issues</SummaryLabel>
        </SummaryItem>
      </SummaryBar>

      {filteredMiners.length > 0 ? (
        <MinersList>
          {filteredMiners.map((miner) => (
            <MinerRow
              key={miner.id}
              name={miner.name}
              hashrate={miner.hashrate}
              status={miner.status}
              temperature={miner.temperature}
              onClick={() => console.log('Miner clicked:', miner.id)}
            />
          ))}
        </MinersList>
      ) : (
        <EmptyState>
          <EmptyIcon>
            <MinerSVG />
          </EmptyIcon>
          <EmptyTitle>No miners found</EmptyTitle>
          <EmptyText>Try adjusting your search or filter criteria</EmptyText>
        </EmptyState>
      )}
    </MinersContainer>
  )
}

export default Miners
