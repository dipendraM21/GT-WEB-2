import Image, { StaticImageData } from 'next/image'
import React from 'react'
import { Box, Text } from 'theme-ui'

type PermissionCheckboxProps = {
  label: string
  labelClass?: string
  icon?: StaticImageData
  checked: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
  className?: string
}

const Checkbox: React.FC<PermissionCheckboxProps> = ({
  label,
  labelClass,
  icon,
  checked,
  disabled = false,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex justify-between items-center py-2 ${className}`}>
      <Box as="div" className="flex items-center">
        {icon && <Image src={icon} alt="icon-logo" width={30} height={30} />}
        <Text
          className={labelClass}
          color="grey_medium"
          variant="Maison18Regular20"
        >
          {label}
        </Text>
      </Box>
      <input
        className="form-check-input permission-checkbox"
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => !disabled && onChange(e.target.checked)}
      />
    </div>
  )
}

export default Checkbox
