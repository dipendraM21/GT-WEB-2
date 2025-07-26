import { FC } from 'react'
import { OptionProps, components } from 'react-select'

interface CityOption {
  value: string
  label: string
  code: string
  customLabel?: string
  customLabelVariant?: string
}

export const CustomOption: FC<OptionProps<CityOption, false>> = ({
  data,
  innerRef,
  innerProps,
  isFocused,
  isSelected,
  ...props
}) => {
  return (
    <components.Option
      {...props}
      data={data}
      innerRef={innerRef}
      innerProps={innerProps}
      isFocused={isFocused}
      isSelected={isSelected}
    >
      <div ref={innerRef} {...innerProps}>
        <span style={{ fontWeight: 'bold' }}>{data.code}</span>
        <span>{data.label}</span>
      </div>
    </components.Option>
  )
}
