/**
 * iOS Settings View
 * App settings and configuration screen
 */

import React, { useState } from 'react'
import styled from 'styled-components'

import { List, ListItem, ListItemToggle, ListItemValue } from '../../Components'
import { iOS_COLOR } from '../../Theme/iOSColors'

const SettingsContainer = styled.div`
  padding: calc(env(safe-area-inset-top, 47px) + 44px + 20px) 0
    calc(49px + env(safe-area-inset-bottom, 34px) + 20px);
  min-height: 100vh;
  background-color: ${iOS_COLOR.BACKGROUND_GROUPED};
`

const PageTitle = styled.h1`
  font-size: 34px;
  font-weight: 700;
  color: ${iOS_COLOR.LABEL};
  margin: 0 0 20px 0;
  padding: 0 16px;
`

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  margin: 0 16px 20px;
  background-color: ${iOS_COLOR.BACKGROUND_GROUPED_SECONDARY};
  border-radius: 14px;
  cursor: pointer;
  transition: transform 0.15s ease-out, opacity 0.15s ease-out;

  &:active {
    transform: scale(0.98);
    opacity: 0.9;
  }
`

const ProfileAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: linear-gradient(135deg, ${iOS_COLOR.SYSTEM_ORANGE}, ${iOS_COLOR.SYSTEM_ORANGE_DARK});
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
  color: ${iOS_COLOR.LABEL};
`

const ProfileInfo = styled.div`
  flex: 1;
`

const ProfileName = styled.h2`
  font-size: 17px;
  font-weight: 600;
  color: ${iOS_COLOR.LABEL};
  margin: 0 0 2px 0;
`

const ProfileEmail = styled.p`
  font-size: 15px;
  color: ${iOS_COLOR.LABEL_SECONDARY};
  margin: 0;
`

const ProfileChevron = styled.span`
  color: ${iOS_COLOR.LABEL_TERTIARY};
`

const SettingsSection = styled.div`
  margin-bottom: 32px;
`

const VersionInfo = styled.div`
  text-align: center;
  padding: 32px 16px;
`

const VersionText = styled.p`
  font-size: 13px;
  color: ${iOS_COLOR.LABEL_TERTIARY};
  margin: 0;
`

const IconWrapper = styled.div<{ $bgColor: string }>`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background-color: ${(props) => props.$bgColor};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 16px;
    height: 16px;
    fill: ${iOS_COLOR.LABEL};
  }
`

// Icons
const NotificationIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
  </svg>
)

const DisplayIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M20 15.31L23.31 12 20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
  </svg>
)

const SecurityIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
  </svg>
)

const DataIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
  </svg>
)

const HelpIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
  </svg>
)

const InfoIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
)

const ChevronIcon = () => (
  <svg width="8" height="13" viewBox="0 0 8 13" fill="currentColor">
    <path d="M1.5 1L6.5 6.5L1.5 12" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
)

export const Settings: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [pushEnabled, setPushEnabled] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [biometricEnabled, setBiometricEnabled] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)

  return (
    <SettingsContainer>
      <PageTitle>Settings</PageTitle>

      {/* Profile Section */}
      <ProfileSection>
        <ProfileAvatar>JD</ProfileAvatar>
        <ProfileInfo>
          <ProfileName>John Doe</ProfileName>
          <ProfileEmail>john.doe@example.com</ProfileEmail>
        </ProfileInfo>
        <ProfileChevron>
          <ChevronIcon />
        </ProfileChevron>
      </ProfileSection>

      {/* Notifications */}
      <SettingsSection>
        <List header="Notifications" variant="inset">
          <ListItemToggle
            title="Enable Notifications"
            leading={
              <IconWrapper $bgColor={iOS_COLOR.SYSTEM_RED}>
                <NotificationIcon />
              </IconWrapper>
            }
            checked={notificationsEnabled}
            onChange={setNotificationsEnabled}
          />
          <ListItemToggle
            title="Push Notifications"
            subtitle="Receive alerts on your device"
            checked={pushEnabled}
            onChange={setPushEnabled}
            disabled={!notificationsEnabled}
          />
          <ListItemToggle
            title="Sound"
            subtitle="Play sound for critical alerts"
            checked={soundEnabled}
            onChange={setSoundEnabled}
            disabled={!notificationsEnabled}
          />
          <ListItem
            title="Alert Preferences"
            leading={
              <IconWrapper $bgColor={iOS_COLOR.STATUS_WARNING}>
                <NotificationIcon />
              </IconWrapper>
            }
            onClick={() => console.log('Alert preferences')}
          />
        </List>
      </SettingsSection>

      {/* Display */}
      <SettingsSection>
        <List header="Display" variant="inset">
          <ListItemValue
            title="Appearance"
            value="Dark"
            leading={
              <IconWrapper $bgColor={iOS_COLOR.SYSTEM_PURPLE}>
                <DisplayIcon />
              </IconWrapper>
            }
            showChevron
            onClick={() => console.log('Appearance')}
          />
          <ListItemValue
            title="Temperature Unit"
            value="Celsius"
            showChevron
            onClick={() => console.log('Temperature')}
          />
          <ListItemValue
            title="Hashrate Unit"
            value="TH/s"
            showChevron
            onClick={() => console.log('Hashrate')}
          />
        </List>
      </SettingsSection>

      {/* Security */}
      <SettingsSection>
        <List header="Security" variant="inset">
          <ListItemToggle
            title="Face ID / Touch ID"
            subtitle="Use biometric authentication"
            leading={
              <IconWrapper $bgColor={iOS_COLOR.STATUS_ONLINE}>
                <SecurityIcon />
              </IconWrapper>
            }
            checked={biometricEnabled}
            onChange={setBiometricEnabled}
          />
          <ListItem
            title="Change Password"
            leading={
              <IconWrapper $bgColor={iOS_COLOR.SYSTEM_BLUE}>
                <SecurityIcon />
              </IconWrapper>
            }
            onClick={() => console.log('Change password')}
          />
          <ListItem
            title="Two-Factor Authentication"
            trailing={
              <span style={{ color: iOS_COLOR.STATUS_ONLINE, fontSize: '15px' }}>Enabled</span>
            }
            onClick={() => console.log('2FA')}
          />
        </List>
      </SettingsSection>

      {/* Data & Sync */}
      <SettingsSection>
        <List header="Data & Sync" variant="inset">
          <ListItemToggle
            title="Auto Refresh"
            subtitle="Automatically update data"
            leading={
              <IconWrapper $bgColor={iOS_COLOR.SYSTEM_TEAL}>
                <DataIcon />
              </IconWrapper>
            }
            checked={autoRefresh}
            onChange={setAutoRefresh}
          />
          <ListItemValue
            title="Refresh Interval"
            value="2 min"
            showChevron
            onClick={() => console.log('Refresh interval')}
          />
          <ListItem
            title="Clear Cache"
            subtitle="Free up storage space"
            onClick={() => console.log('Clear cache')}
          />
        </List>
      </SettingsSection>

      {/* Support */}
      <SettingsSection>
        <List header="Support" variant="inset">
          <ListItem
            title="Help Center"
            leading={
              <IconWrapper $bgColor={iOS_COLOR.SYSTEM_ORANGE}>
                <HelpIcon />
              </IconWrapper>
            }
            onClick={() => console.log('Help')}
          />
          <ListItem
            title="Contact Support"
            onClick={() => console.log('Contact')}
          />
          <ListItem
            title="About"
            leading={
              <IconWrapper $bgColor={iOS_COLOR.LABEL_TERTIARY}>
                <InfoIcon />
              </IconWrapper>
            }
            onClick={() => console.log('About')}
          />
        </List>
      </SettingsSection>

      {/* Sign Out */}
      <SettingsSection>
        <List variant="inset">
          <ListItem
            title="Sign Out"
            destructive
            showChevron={false}
            onClick={() => console.log('Sign out')}
          />
        </List>
      </SettingsSection>

      <VersionInfo>
        <VersionText>MiningOS iOS v1.0.0 (Build 1)</VersionText>
      </VersionInfo>
    </SettingsContainer>
  )
}

export default Settings
