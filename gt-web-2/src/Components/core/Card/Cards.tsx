import { FC } from 'react'
import { Box } from 'theme-ui'
import SectionTitleBar, { SectionTitleBarProps } from '../Text/CommonTextHeader'

interface CommonCardProps extends SectionTitleBarProps {
  className?: string
  children?: React.ReactNode
  title?: string
  titleColor?: string
  secondaryColor?: string
  secondaryText?: string
  onPress?: any
}
export const CommonCard: FC<CommonCardProps> = ({
  className,
  title,
  secondaryText,
  titleColor = 'primary_text_dark',
  secondaryColor = 'primary_text_dark',
  children,
  ...props
}) => {
  return (
    <Box
      className={`flight-panel md:col-span-4 xl:col-span-4 2xl:col-span-3 w-full hidden lg:block bg-white py-30 px-28 bg-gradient-background flight-list-br border-2 ${className}`}
    >
      <SectionTitleBar
        primaryColor={titleColor}
        secondaryColor={secondaryColor}
        primaryText={title}
        secondaryText={secondaryText}
        {...props}
      />
      {children}
    </Box>
  )
}
