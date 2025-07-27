import { FC, ReactNode } from 'react'
import { components, PlaceholderProps } from 'react-select'
import { Text } from 'theme-ui'

interface CustomPlaceholderProps extends PlaceholderProps<any, false> {
  placeholder: string
  icon: ReactNode
}
export const CustomPlaceholder: FC<CustomPlaceholderProps> = ({
  icon,
  placeholder,
  ...props
}) => {
  return (
    <components.Placeholder {...props}>
      <div className="flex items-center gap-2 text-gray-500">
        {icon}
        <Text color="grey_medium" variant="Maison18Medium125">
          {placeholder}
        </Text>
      </div>
    </components.Placeholder>
  )
}
