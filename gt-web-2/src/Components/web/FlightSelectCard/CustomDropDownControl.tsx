import { FC } from 'react'
import { ControlProps, components } from 'react-select'
import { Box, Text } from 'theme-ui'

interface CustomDropDownControlProps extends ControlProps<any, false> {
  label?: string
  customLabelVariant?: string
}

export const CustomDropDownControl: FC<CustomDropDownControlProps> = ({
  label = 'From City :',
  customLabelVariant = 'Maison18Medium125',
  children,
  ...props
}) => {
  return (
    <components.Control {...props}>
      <Box as="div" className="flex flex-col custom-dropdown-control">
        <Text color="grey_dark" variant={customLabelVariant}>
          {label}
        </Text>
        <Box className="mt-3">{children}</Box>
      </Box>
    </components.Control>
  )
}
