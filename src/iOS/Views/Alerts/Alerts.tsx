/**
 * iOS Alerts View
 * Alerts and notifications management screen
 */

import React, { useState } from 'react'
import styled from 'styled-components'

import { Card } from '../../Components'
import { iOS_COLOR } from '../../Theme/iOSColors'

const AlertsContainer = styled.div`
  padding: calc(env(safe-area-inset-top, 47px) + 44px + 20px) 16px
    calc(49px + env(safe-area-inset-bottom, 34px) + 20px);
  min-height: 100vh;
  background-color: ${iOS_COLOR.BACKGROUND_PRIMARY};
`

const HeaderSection = styled.div`
  margin-bottom: 16px;
`

const PageTitle = styled.h1`
  font-size: 34px;
  font-weight: 700;
  color: ${iOS_COLOR.LABEL};
  margin: 0 0 16px 0;
`

const TabsContainer = styled.div`
  display: flex;
  background-color: ${iOS_COLOR.FILL_TERTIARY};
  border-radius: 10px;
  padding: 2px;
`

const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease-out;
  background-color: ${(props) => (props.$active ? iOS_COLOR.LABEL : 'transparent')};
  color: ${(props) => (props.$active ? iOS_COLOR.BACKGROUND_PRIMARY : iOS_COLOR.LABEL)};
`

const AlertsSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
`

const SummaryCard = styled.div<{ $color: string }>`
  background-color: ${iOS_COLOR.CARD_BACKGROUND};
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  border-left: 3px solid ${(props) => props.$color};
`

const SummaryCount = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: ${iOS_COLOR.LABEL};
  display: block;
  font-variant-numeric: tabular-nums;
`

const SummaryLabel = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: ${iOS_COLOR.LABEL_SECONDARY};
  text-transform: uppercase;
`

const AlertsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const AlertCard = styled.div<{ $severity: 'critical' | 'warning' | 'info' }>`
  background-color: ${iOS_COLOR.CARD_BACKGROUND};
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.15s ease-out, opacity 0.15s ease-out;

  &:active {
    transform: scale(0.98);
    opacity: 0.9;
  }
`

const AlertHeader = styled.div<{ $severity: 'critical' | 'warning' | 'info' }>`
  padding: 12px 16px;
  background-color: ${(props) =>
    props.$severity === 'critical'
      ? `${iOS_COLOR.STATUS_ERROR}15`
      : props.$severity === 'warning'
        ? `${iOS_COLOR.STATUS_WARNING}15`
        : `${iOS_COLOR.SYSTEM_BLUE}15`};
  display: flex;
  align-items: center;
  gap: 10px;
`

const AlertIcon = styled.div<{ $severity: 'critical' | 'warning' | 'info' }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.$severity === 'critical'
      ? iOS_COLOR.STATUS_ERROR
      : props.$severity === 'warning'
        ? iOS_COLOR.STATUS_WARNING
        : iOS_COLOR.SYSTEM_BLUE};

  svg {
    width: 18px;
    height: 18px;
    fill: ${iOS_COLOR.LABEL};
  }
`

const AlertHeaderContent = styled.div`
  flex: 1;
`

const AlertTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: ${iOS_COLOR.LABEL};
  margin: 0;
`

const AlertTimestamp = styled.span`
  font-size: 13px;
  color: ${iOS_COLOR.LABEL_SECONDARY};
`

const AlertBody = styled.div`
  padding: 12px 16px;
`

const AlertDescription = styled.p`
  font-size: 15px;
  color: ${iOS_COLOR.LABEL_SECONDARY};
  margin: 0 0 12px 0;
  line-height: 1.4;
`

const AlertMeta = styled.div`
  display: flex;
  gap: 16px;
`

const AlertMetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

const AlertMetaIcon = styled.span`
  color: ${iOS_COLOR.LABEL_TERTIARY};

  svg {
    width: 14px;
    height: 14px;
  }
`

const AlertMetaText = styled.span`
  font-size: 13px;
  color: ${iOS_COLOR.LABEL_TERTIARY};
`

const AlertActions = styled.div`
  display: flex;
  border-top: 0.5px solid ${iOS_COLOR.SEPARATOR};
`

const AlertAction = styled.button<{ $primary?: boolean }>`
  flex: 1;
  padding: 12px;
  border: none;
  background: transparent;
  font-size: 15px;
  font-weight: 500;
  color: ${(props) => (props.$primary ? iOS_COLOR.SYSTEM_ORANGE : iOS_COLOR.LABEL_SECONDARY)};
  cursor: pointer;
  transition: opacity 0.15s ease-out;

  &:active {
    opacity: 0.5;
  }

  &:not(:last-child) {
    border-right: 0.5px solid ${iOS_COLOR.SEPARATOR};
  }
`

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  text-align: center;
`

const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background-color: ${iOS_COLOR.FILL_TERTIARY};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  svg {
    width: 40px;
    height: 40px;
    fill: ${iOS_COLOR.LABEL_TERTIARY};
  }
`

const EmptyTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${iOS_COLOR.LABEL};
  margin: 0 0 8px 0;
`

const EmptyText = styled.p`
  font-size: 15px;
  color: ${iOS_COLOR.LABEL_SECONDARY};
  margin: 0;
`

type AlertSeverity = 'critical' | 'warning' | 'info'
type TabType = 'active' | 'resolved'

interface Alert {
  id: string
  title: string
  description: string
  severity: AlertSeverity
  timestamp: string
  device?: string
  container?: string
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'High Temperature Alert',
    description: 'Miner-042 has exceeded the temperature threshold of 85°C. Current temperature: 89°C.',
    severity: 'critical',
    timestamp: '15 min ago',
    device: 'Miner-042',
    container: 'Container A',
  },
  {
    id: '2',
    title: 'Miner Offline',
    description: 'Miner-087 has been offline for more than 30 minutes. Last seen online at 2:45 PM.',
    severity: 'critical',
    timestamp: '1 hour ago',
    device: 'Miner-087',
    container: 'Container B',
  },
  {
    id: '3',
    title: 'Hashrate Drop Detected',
    description: 'Miner-023 hashrate dropped below expected threshold. Current: 85 TH/s, Expected: 110 TH/s.',
    severity: 'warning',
    timestamp: '2 hours ago',
    device: 'Miner-023',
    container: 'Container A',
  },
  {
    id: '4',
    title: 'Pool Connection Warning',
    description: 'Intermittent connection issues detected with primary mining pool.',
    severity: 'warning',
    timestamp: '3 hours ago',
  },
  {
    id: '5',
    title: 'Firmware Update Available',
    description: 'New firmware version 2.1.5 is available for 12 miners.',
    severity: 'info',
    timestamp: '5 hours ago',
  },
]

const WarningIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
  </svg>
)

const ErrorIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
)

const InfoIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
)

const CheckIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
)

const DeviceIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4z" />
  </svg>
)

const getAlertIcon = (severity: AlertSeverity) => {
  switch (severity) {
    case 'critical':
      return <ErrorIcon />
    case 'warning':
      return <WarningIcon />
    case 'info':
      return <InfoIcon />
  }
}

export const Alerts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('active')

  const alertCounts = {
    critical: mockAlerts.filter((a) => a.severity === 'critical').length,
    warning: mockAlerts.filter((a) => a.severity === 'warning').length,
    info: mockAlerts.filter((a) => a.severity === 'info').length,
  }

  return (
    <AlertsContainer>
      <HeaderSection>
        <PageTitle>Alerts</PageTitle>
        <TabsContainer>
          <Tab $active={activeTab === 'active'} onClick={() => setActiveTab('active')}>
            Active ({mockAlerts.length})
          </Tab>
          <Tab $active={activeTab === 'resolved'} onClick={() => setActiveTab('resolved')}>
            Resolved
          </Tab>
        </TabsContainer>
      </HeaderSection>

      <AlertsSummary>
        <SummaryCard $color={iOS_COLOR.STATUS_ERROR}>
          <SummaryCount>{alertCounts.critical}</SummaryCount>
          <SummaryLabel>Critical</SummaryLabel>
        </SummaryCard>
        <SummaryCard $color={iOS_COLOR.STATUS_WARNING}>
          <SummaryCount>{alertCounts.warning}</SummaryCount>
          <SummaryLabel>Warning</SummaryLabel>
        </SummaryCard>
        <SummaryCard $color={iOS_COLOR.SYSTEM_BLUE}>
          <SummaryCount>{alertCounts.info}</SummaryCount>
          <SummaryLabel>Info</SummaryLabel>
        </SummaryCard>
      </AlertsSummary>

      {activeTab === 'active' && mockAlerts.length > 0 ? (
        <AlertsList>
          {mockAlerts.map((alert) => (
            <AlertCard key={alert.id} $severity={alert.severity}>
              <AlertHeader $severity={alert.severity}>
                <AlertIcon $severity={alert.severity}>{getAlertIcon(alert.severity)}</AlertIcon>
                <AlertHeaderContent>
                  <AlertTitle>{alert.title}</AlertTitle>
                  <AlertTimestamp>{alert.timestamp}</AlertTimestamp>
                </AlertHeaderContent>
              </AlertHeader>
              <AlertBody>
                <AlertDescription>{alert.description}</AlertDescription>
                <AlertMeta>
                  {alert.device && (
                    <AlertMetaItem>
                      <AlertMetaIcon>
                        <DeviceIcon />
                      </AlertMetaIcon>
                      <AlertMetaText>{alert.device}</AlertMetaText>
                    </AlertMetaItem>
                  )}
                  {alert.container && (
                    <AlertMetaItem>
                      <AlertMetaText>{alert.container}</AlertMetaText>
                    </AlertMetaItem>
                  )}
                </AlertMeta>
              </AlertBody>
              <AlertActions>
                <AlertAction>Dismiss</AlertAction>
                <AlertAction $primary>View Details</AlertAction>
              </AlertActions>
            </AlertCard>
          ))}
        </AlertsList>
      ) : (
        <EmptyState>
          <EmptyIcon>
            <CheckIcon />
          </EmptyIcon>
          <EmptyTitle>All Clear</EmptyTitle>
          <EmptyText>
            {activeTab === 'active'
              ? 'No active alerts at the moment'
              : 'No resolved alerts to show'}
          </EmptyText>
        </EmptyState>
      )}
    </AlertsContainer>
  )
}

export default Alerts
