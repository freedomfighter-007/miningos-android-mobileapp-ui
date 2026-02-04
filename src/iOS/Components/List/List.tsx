/**
 * iOS List Component
 * List views following iOS Human Interface Guidelines
 */

import React from 'react'
import styled, { css } from 'styled-components'

import { iOS_COLOR } from '../../Theme/iOSColors'

// List Container
interface ListProps {
  children: React.ReactNode
  variant?: 'inset' | 'plain' | 'grouped'
  header?: string
  footer?: string
  className?: string
}

const ListContainer = styled.div<{ $variant: 'inset' | 'plain' | 'grouped' }>`
  ${(props) =>
    props.$variant === 'inset' &&
    css`
      margin: 0 16px;
      border-radius: 14px;
      overflow: hidden;
      background-color: ${iOS_COLOR.BACKGROUND_GROUPED_SECONDARY};
    `}

  ${(props) =>
    props.$variant === 'grouped' &&
    css`
      background-color: ${iOS_COLOR.BACKGROUND_GROUPED_SECONDARY};
    `}

  ${(props) =>
    props.$variant === 'plain' &&
    css`
      background-color: transparent;
    `}
`

const ListHeader = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: ${iOS_COLOR.LABEL_SECONDARY};
  text-transform: uppercase;
  letter-spacing: -0.08px;
  padding: 16px 16px 8px;
`

const ListFooter = styled.div`
  font-size: 13px;
  color: ${iOS_COLOR.LABEL_SECONDARY};
  padding: 8px 16px 16px;
`

export const List: React.FC<ListProps> = ({
  children,
  variant = 'inset',
  header,
  footer,
  className,
}) => {
  return (
    <div className={className}>
      {header && <ListHeader>{header}</ListHeader>}
      <ListContainer $variant={variant}>{children}</ListContainer>
      {footer && <ListFooter>{footer}</ListFooter>}
    </div>
  )
}

// List Item
interface ListItemProps {
  children?: React.ReactNode
  title: string
  subtitle?: string
  leading?: React.ReactNode
  trailing?: React.ReactNode
  showChevron?: boolean
  onClick?: () => void
  destructive?: boolean
  disabled?: boolean
}

const ListItemContainer = styled.button<{ $destructive?: boolean; $disabled?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 44px;
  padding: 11px 16px;
  background-color: transparent;
  border: none;
  text-align: left;
  position: relative;
  cursor: ${(props) => (props.$disabled ? 'default' : 'pointer')};
  opacity: ${(props) => (props.$disabled ? 0.4 : 1)};
  transition: background-color 0.1s ease-out;

  &:active {
    background-color: ${(props) => (props.$disabled ? 'transparent' : iOS_COLOR.FILL_TERTIARY)};
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

const ListItemLeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;

  svg {
    width: 28px;
    height: 28px;
  }
`

const ListItemContent = styled.div`
  flex: 1;
  min-width: 0;
`

const ListItemTitle = styled.span<{ $destructive?: boolean }>`
  font-size: 17px;
  color: ${(props) => (props.$destructive ? iOS_COLOR.SYSTEM_RED : iOS_COLOR.LABEL)};
  display: block;
`

const ListItemSubtitle = styled.span`
  font-size: 15px;
  color: ${iOS_COLOR.LABEL_SECONDARY};
  display: block;
  margin-top: 2px;
`

const ListItemTrailing = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
`

const ChevronRight = styled.span`
  color: ${iOS_COLOR.LABEL_TERTIARY};
  margin-left: 8px;
  display: flex;
  align-items: center;
`

const ChevronIcon = () => (
  <svg width="8" height="13" viewBox="0 0 8 13" fill="currentColor">
    <path d="M1.5 1L6.5 6.5L1.5 12" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
)

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  leading,
  trailing,
  showChevron = true,
  onClick,
  destructive = false,
  disabled = false,
}) => {
  return (
    <ListItemContainer
      onClick={disabled ? undefined : onClick}
      $destructive={destructive}
      $disabled={disabled}
      as={onClick ? 'button' : 'div'}
    >
      {leading && <ListItemLeading>{leading}</ListItemLeading>}
      <ListItemContent>
        <ListItemTitle $destructive={destructive}>{title}</ListItemTitle>
        {subtitle && <ListItemSubtitle>{subtitle}</ListItemSubtitle>}
      </ListItemContent>
      {trailing && <ListItemTrailing>{trailing}</ListItemTrailing>}
      {showChevron && onClick && (
        <ChevronRight>
          <ChevronIcon />
        </ChevronRight>
      )}
    </ListItemContainer>
  )
}

// List Item with Toggle
interface ListItemToggleProps {
  title: string
  subtitle?: string
  leading?: React.ReactNode
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

const Toggle = styled.button<{ $checked: boolean; $disabled?: boolean }>`
  width: 51px;
  height: 31px;
  border-radius: 16px;
  padding: 2px;
  border: none;
  cursor: ${(props) => (props.$disabled ? 'default' : 'pointer')};
  background-color: ${(props) =>
    props.$checked ? iOS_COLOR.SYSTEM_ORANGE : iOS_COLOR.FILL_PRIMARY};
  transition: background-color 0.2s ease-out;
  opacity: ${(props) => (props.$disabled ? 0.4 : 1)};
`

const ToggleThumb = styled.span<{ $checked: boolean }>`
  display: block;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  background-color: ${iOS_COLOR.LABEL};
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15), 0 3px 1px rgba(0, 0, 0, 0.06);
  transform: translateX(${(props) => (props.$checked ? '20px' : '0')});
  transition: transform 0.2s ease-out;
`

export const ListItemToggle: React.FC<ListItemToggleProps> = ({
  title,
  subtitle,
  leading,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <ListItemContainer as="div" $disabled={disabled}>
      {leading && <ListItemLeading>{leading}</ListItemLeading>}
      <ListItemContent>
        <ListItemTitle>{title}</ListItemTitle>
        {subtitle && <ListItemSubtitle>{subtitle}</ListItemSubtitle>}
      </ListItemContent>
      <Toggle
        $checked={checked}
        $disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        role="switch"
        aria-checked={checked}
      >
        <ToggleThumb $checked={checked} />
      </Toggle>
    </ListItemContainer>
  )
}

// List Item with Value
interface ListItemValueProps {
  title: string
  value: string
  leading?: React.ReactNode
  showChevron?: boolean
  onClick?: () => void
}

const ListItemValueText = styled.span`
  font-size: 17px;
  color: ${iOS_COLOR.LABEL_SECONDARY};
`

export const ListItemValue: React.FC<ListItemValueProps> = ({
  title,
  value,
  leading,
  showChevron = false,
  onClick,
}) => {
  return (
    <ListItemContainer onClick={onClick} as={onClick ? 'button' : 'div'}>
      {leading && <ListItemLeading>{leading}</ListItemLeading>}
      <ListItemContent>
        <ListItemTitle>{title}</ListItemTitle>
      </ListItemContent>
      <ListItemValueText>{value}</ListItemValueText>
      {showChevron && onClick && (
        <ChevronRight>
          <ChevronIcon />
        </ChevronRight>
      )}
    </ListItemContainer>
  )
}

export default List
