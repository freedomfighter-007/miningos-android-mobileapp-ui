/**
 * iOS Dashboard View
 * Main dashboard screen for the iOS app
 */

import React from 'react'
import styled from 'styled-components'

import { Card, CardHeader, CardTitle, SimpleLineChart, StatCard, Sparkline } from '../../Components'
import { iOS_COLOR } from '../../Theme/iOSColors'

const DashboardContainer = styled.div`
  padding: calc(env(safe-area-inset-top, 47px) + 44px + 20px) 16px
    calc(49px + env(safe-area-inset-bottom, 34px) + 20px);
  min-height: 100vh;
  background-color: ${iOS_COLOR.BACKGROUND_PRIMARY};
`

const WelcomeSection = styled.div`
  margin-bottom: 24px;
`

const Greeting = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${iOS_COLOR.LABEL};
  margin: 0 0 4px 0;
`

const DateText = styled.p`
  font-size: 15px;
  color: ${iOS_COLOR.LABEL_SECONDARY};
  margin: 0;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 24px;
`

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: ${iOS_COLOR.LABEL};
  margin: 0 0 12px 0;
`

const ChartCard = styled(Card)`
  margin-bottom: 16px;
`

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

const ChartValue = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: ${iOS_COLOR.SYSTEM_ORANGE};
  font-variant-numeric: tabular-nums;
`

const ChartChange = styled.span<{ $positive: boolean }>`
  font-size: 13px;
  font-weight: 500;
  color: ${(props) => (props.$positive ? iOS_COLOR.STATUS_ONLINE : iOS_COLOR.STATUS_ERROR)};
  margin-left: 8px;
`

const QuickStatsRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  overflow-x: auto;
  padding-bottom: 8px;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`

const QuickStatCard = styled.div`
  flex-shrink: 0;
  width: 140px;
  padding: 12px;
  background-color: ${iOS_COLOR.CARD_BACKGROUND};
  border-radius: 12px;
`

const QuickStatLabel = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: ${iOS_COLOR.LABEL_TERTIARY};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: 4px;
`

const QuickStatValue = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: ${iOS_COLOR.LABEL};
  font-variant-numeric: tabular-nums;
`

const QuickStatSparkline = styled.div`
  margin-top: 8px;
`

const AlertsPreview = styled.div`
  margin-bottom: 24px;
`

const AlertItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: ${iOS_COLOR.CARD_BACKGROUND};
  border-radius: 12px;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`

const AlertIcon = styled.div<{ $severity: 'critical' | 'warning' | 'info' }>`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.$severity === 'critical'
      ? `${iOS_COLOR.STATUS_ERROR}20`
      : props.$severity === 'warning'
        ? `${iOS_COLOR.STATUS_WARNING}20`
        : `${iOS_COLOR.SYSTEM_BLUE}20`};

  svg {
    width: 20px;
    height: 20px;
    fill: ${(props) =>
      props.$severity === 'critical'
        ? iOS_COLOR.STATUS_ERROR
        : props.$severity === 'warning'
          ? iOS_COLOR.STATUS_WARNING
          : iOS_COLOR.SYSTEM_BLUE};
  }
`

const AlertContent = styled.div`
  flex: 1;
`

const AlertTitle = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: ${iOS_COLOR.LABEL};
  display: block;
`

const AlertTime = styled.span`
  font-size: 13px;
  color: ${iOS_COLOR.LABEL_SECONDARY};
`

// Mock data
const mockHashrateData = [
  { value: 125, label: '12h' },
  { value: 128 },
  { value: 132 },
  { value: 130 },
  { value: 135 },
  { value: 142 },
  { value: 140 },
  { value: 145, label: 'Now' },
]

const mockPowerData = [45, 48, 52, 50, 55, 58, 56, 60]
const mockEfficiencyData = [28, 27, 26, 27, 25, 24, 25, 24]
const mockTempData = [65, 68, 70, 72, 71, 69, 70, 68]

const WarningIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z" />
  </svg>
)

export const Dashboard: React.FC = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <DashboardContainer>
      <WelcomeSection>
        <Greeting>Dashboard</Greeting>
        <DateText>{today}</DateText>
      </WelcomeSection>

      {/* Main Stats */}
      <StatsGrid>
        <StatCard
          title="Total Hashrate"
          value="145.8 TH/s"
          trend="up"
          trendValue="5.2%"
          color={iOS_COLOR.SYSTEM_ORANGE}
        />
        <StatCard
          title="Active Miners"
          value="128"
          subtitle="of 132 total"
          color={iOS_COLOR.STATUS_ONLINE}
        />
        <StatCard
          title="Power Draw"
          value="60.2 kW"
          trend="up"
          trendValue="2.1%"
          color={iOS_COLOR.SYSTEM_BLUE}
        />
        <StatCard
          title="Efficiency"
          value="24.3 J/TH"
          trend="down"
          trendValue="1.8%"
          subtitle="Lower is better"
          color={iOS_COLOR.STATUS_ONLINE}
        />
      </StatsGrid>

      {/* Hashrate Chart */}
      <ChartCard padding="medium">
        <ChartHeader>
          <div>
            <CardTitle>Hashrate</CardTitle>
            <ChartValue>
              145.8 TH/s
              <ChartChange $positive>+5.2%</ChartChange>
            </ChartValue>
          </div>
        </ChartHeader>
        <SimpleLineChart
          data={mockHashrateData}
          height={150}
          color={iOS_COLOR.SYSTEM_ORANGE}
          showArea
          showLabels
        />
      </ChartCard>

      {/* Quick Stats Horizontal Scroll */}
      <SectionTitle>Quick Stats</SectionTitle>
      <QuickStatsRow>
        <QuickStatCard>
          <QuickStatLabel>Power</QuickStatLabel>
          <QuickStatValue>60.2 kW</QuickStatValue>
          <QuickStatSparkline>
            <Sparkline data={mockPowerData} color={iOS_COLOR.SYSTEM_BLUE} />
          </QuickStatSparkline>
        </QuickStatCard>
        <QuickStatCard>
          <QuickStatLabel>Efficiency</QuickStatLabel>
          <QuickStatValue>24.3 J/TH</QuickStatValue>
          <QuickStatSparkline>
            <Sparkline data={mockEfficiencyData} color={iOS_COLOR.STATUS_ONLINE} />
          </QuickStatSparkline>
        </QuickStatCard>
        <QuickStatCard>
          <QuickStatLabel>Avg Temp</QuickStatLabel>
          <QuickStatValue>68°C</QuickStatValue>
          <QuickStatSparkline>
            <Sparkline data={mockTempData} color={iOS_COLOR.STATUS_WARNING} />
          </QuickStatSparkline>
        </QuickStatCard>
        <QuickStatCard>
          <QuickStatLabel>Uptime</QuickStatLabel>
          <QuickStatValue>99.2%</QuickStatValue>
        </QuickStatCard>
      </QuickStatsRow>

      {/* Recent Alerts */}
      <SectionTitle>Recent Alerts</SectionTitle>
      <AlertsPreview>
        <AlertItem>
          <AlertIcon $severity="warning">
            <WarningIcon />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>High temperature on Miner-042</AlertTitle>
            <AlertTime>15 minutes ago</AlertTime>
          </AlertContent>
        </AlertItem>
        <AlertItem>
          <AlertIcon $severity="critical">
            <WarningIcon />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>Miner-087 offline</AlertTitle>
            <AlertTime>1 hour ago</AlertTime>
          </AlertContent>
        </AlertItem>
        <AlertItem>
          <AlertIcon $severity="info">
            <WarningIcon />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>Pool connection restored</AlertTitle>
            <AlertTime>2 hours ago</AlertTime>
          </AlertContent>
        </AlertItem>
      </AlertsPreview>
    </DashboardContainer>
  )
}

export default Dashboard
