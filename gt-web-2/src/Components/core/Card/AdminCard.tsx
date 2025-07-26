import Link from 'next/link'
import { FC, ReactNode } from 'react'
import { Box, Card, Divider, Text, ThemeUIStyleObject } from 'theme-ui'
import { ThemeButton } from '../Button/Button'

export interface AdminCardProps {
  children?: ReactNode
  cardVariant?: string
  cardClassName?: string
  sx?: ThemeUIStyleObject
  textColor?: string
  heading?: string
  footerContent?: ReactNode
  actionButtonConfig?: {
    text: string
    textColor?: string
    variant?: string
    onClick?: () => void
    sx?: ThemeUIStyleObject
    icon?: ReactNode
    href?: string
  }
}

export const AdminCard: FC<AdminCardProps> = ({
  children,
  footerContent,
  cardVariant = 'selectStoreCard',
  cardClassName = 'show-entire',
  sx,
  textColor = 'primary_text_dark',
  heading,
  actionButtonConfig,
}) => {
  return (
    <div className="page-wrapper pb-3">
      <div className="content">
        <div className="row">
          <div className="col-sm-12">
            <Card
              className={cardClassName}
              variant={cardVariant}
              sx={{ p: 20, ...sx }}
            >
              {(heading || actionButtonConfig) && (
                <Box className="flex justify-between items-center mb-4">
                  {heading && (
                    <Text variant="Maison28Demi20" color={textColor}>
                      {heading}
                    </Text>
                  )}
                  {actionButtonConfig && (
                    <Link
                      href={actionButtonConfig?.href || '#'}
                      style={{ textDecoration: 'none' }}
                    >
                      <ThemeButton
                        wrapperClassName="flex item-center"
                        text={actionButtonConfig.text}
                        textColor={actionButtonConfig.textColor || 'white'}
                        variant={actionButtonConfig.variant || 'primary'}
                        onClick={actionButtonConfig.onClick}
                        sx={actionButtonConfig?.sx}
                        icon={actionButtonConfig?.icon}
                      />
                    </Link>
                  )}
                </Box>
              )}
              {footerContent}
              {children}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FormSectionTitle({ title }: { title: string }) {
  return (
    <>
      <Text variant="Maison24Medium125" color="orange_accent_alpha">
        {title}
      </Text>
      <Divider className="my-3" />
    </>
  )
}
