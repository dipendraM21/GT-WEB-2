'use client'
import Loader from '@/../public/svg/loader.svg'
import { ButtonProps } from '@/types/module/core/themuiModule'
import Image from 'next/image'
import { CSSProperties, forwardRef, MouseEvent } from 'react'
import { Box, Button, Text } from 'theme-ui'

const defaultButtonTextStyle: CSSProperties = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

const squareButtonTextStyle: CSSProperties = {
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  wordBreak: 'break-word',
  hyphens: 'auto',
}

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text

  const truncated = text.slice(0, maxLength - 1)
  const lastSpaceIndex = truncated.lastIndexOf(' ')

  if (lastSpaceIndex > 0) {
    return truncated.slice(0, lastSpaceIndex) + '...'
  }

  return truncated + '...'
}

export const ThemeButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      text,
      icon,
      textColor = 'white',
      iconRight,
      textVariant = 'Maison16Demi20',
      isIconOnly,
      onBlur = () => null,
      onClick = () => null,
      toggleOnClick = () => null,
      sx,
      disabled = false,
      variant = 'primary',
      type,
      className,
      textSx,
      multilineTextSx,
      children,
      iconStyles,
      iconClassName,
      multilineText,
      quantity = 0,
      isSquareButton = false,
      isUpArrow = false,
      isDownArrow = false,
      autoFocus = false,
      accessKey = '',
      isLoading = false,
      wrapperClassName,
      btnColor,
    },
    ref
  ) => {
    const baseTextStyle = isSquareButton
      ? squareButtonTextStyle
      : defaultButtonTextStyle
    const maxTextLength = 50

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (
        ref &&
        typeof ref === 'object' &&
        ref.current &&
        variant === 'iconOnlyBtn'
      ) {
        ref.current.blur()
      }
      if (onClick) {
        onClick(event)
      }
    }

    return (
      <Button
        autoFocus={autoFocus}
        type={type}
        onClick={handleClick}
        color={btnColor}
        sx={{ position: 'relative', ...sx }}
        variant={variant}
        disabled={disabled || isLoading}
        className={className}
        onBlur={onBlur}
        accessKey={accessKey}
        ref={ref}
      >
        <Box className={wrapperClassName}>
          {icon && isLoading ? (
            <Loader size={30} color="white" style={{ background: 'white' }} />
          ) : (
            icon && (
              <Box
                className={iconClassName}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: isIconOnly ? 0 : icon === 'string' ? 6 : 2,
                  ...iconStyles,
                }}
                onClick={toggleOnClick}
              >
                {typeof icon === 'string' ? (
                  <Image height={20} width={20} src={icon} alt="Icon" />
                ) : (
                  icon
                )}
              </Box>
            )
          )}

          {text ? (
            <Box
              className={
                isLoading ? 'flex justify-center items-center gap-6' : ''
              }
            >
              <Text
                variant={textVariant}
                color={textColor}
                sx={{
                  ...baseTextStyle,
                  ...textSx,
                }}
              >
                {truncateText(text, maxTextLength)}
              </Text>
            </Box>
          ) : null}

          {children}
          {iconRight && (
            <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
              {typeof iconRight === 'string' ? (
                <Image
                  height={20}
                  width={20}
                  src={iconRight}
                  alt="Right Icon"
                />
              ) : (
                iconRight
              )}
            </Box>
          )}
        </Box>
        {quantity > 0 && <Box className="quantity-counter">{quantity}</Box>}
        {isDownArrow && (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.42871 11.4285L10.0001 18.5713L18.5716 11.4285"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 18.5715V2.85718"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {isUpArrow && (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.42871 8.57153L10.0001 1.42868L18.5716 8.57153"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 18.5715V2.85718"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </Button>
    )
  }
)

ThemeButton.displayName = 'ThemeButton'
