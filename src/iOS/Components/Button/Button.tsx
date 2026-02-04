/**
 * iOS Button Component
 * Buttons following iOS Human Interface Guidelines
 */

import React from 'react'
import styled, { css } from 'styled-components'

import { iOS_COLOR } from '../../Theme/iOSColors'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'plain'
type ButtonSize = 'small' | 'medium' | 'large'

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  disabled?: boolean
  loading?: boolean
  icon?: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

const sizeStyles = {
  small: css`
    height: 32px;
    padding: 0 12px;
    font-size: 15px;
    border-radius: 8px;
    gap: 6px;
  `,
  medium: css`
    height: 44px;
    padding: 0 20px;
    font-size: 17px;
    border-radius: 12px;
    gap: 8px;
  `,
  large: css`
    height: 50px;
    padding: 0 24px;
    font-size: 17px;
    border-radius: 14px;
    gap: 8px;
  `,
}

const variantStyles = {
  primary: css`
    background-color: ${iOS_COLOR.SYSTEM_ORANGE};
    color: ${iOS_COLOR.LABEL};

    &:active:not(:disabled) {
      background-color: ${iOS_COLOR.SYSTEM_ORANGE_DARK};
    }
  `,
  secondary: css`
    background-color: ${iOS_COLOR.FILL_PRIMARY};
    color: ${iOS_COLOR.SYSTEM_ORANGE};

    &:active:not(:disabled) {
      background-color: ${iOS_COLOR.FILL_SECONDARY};
    }
  `,
  tertiary: css`
    background-color: transparent;
    color: ${iOS_COLOR.SYSTEM_ORANGE};

    &:active:not(:disabled) {
      opacity: 0.5;
    }
  `,
  destructive: css`
    background-color: ${iOS_COLOR.SYSTEM_RED};
    color: ${iOS_COLOR.LABEL};

    &:active:not(:disabled) {
      opacity: 0.8;
    }
  `,
  plain: css`
    background-color: transparent;
    color: ${iOS_COLOR.LABEL};

    &:active:not(:disabled) {
      opacity: 0.5;
    }
  `,
}

const StyledButton = styled.button<{
  $variant: ButtonVariant
  $size: ButtonSize
  $fullWidth: boolean
  $loading: boolean
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease-out;
  white-space: nowrap;
  position: relative;

  ${(props) => sizeStyles[props.$size]}
  ${(props) => variantStyles[props.$variant]}

  ${(props) =>
    props.$fullWidth &&
    css`
      width: 100%;
    `}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  ${(props) =>
    props.$loading &&
    css`
      color: transparent !important;
    `}
`

const ButtonIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
`

const LoadingSpinner = styled.span`
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  onClick,
  type = 'button',
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $loading={loading}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
    >
      {loading && <LoadingSpinner />}
      {icon && <ButtonIcon>{icon}</ButtonIcon>}
      {children}
    </StyledButton>
  )
}

// Icon Button for toolbar/navigation
interface IconButtonProps {
  icon: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  size?: number
  color?: string
  'aria-label': string
}

const StyledIconButton = styled.button<{ $size: number; $color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.$size + 16}px;
  height: ${(props) => props.$size + 16}px;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.15s ease-out;

  svg {
    width: ${(props) => props.$size}px;
    height: ${(props) => props.$size}px;
    fill: ${(props) => props.$color || iOS_COLOR.SYSTEM_ORANGE};
  }

  &:active:not(:disabled) {
    background-color: ${iOS_COLOR.FILL_TERTIARY};
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  disabled = false,
  size = 22,
  color,
  'aria-label': ariaLabel,
}) => {
  return (
    <StyledIconButton
      onClick={onClick}
      disabled={disabled}
      $size={size}
      $color={color}
      aria-label={ariaLabel}
    >
      {icon}
    </StyledIconButton>
  )
}

export default Button
