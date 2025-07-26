import { FC } from 'react'
import { Text, ThemeUIStyleObject } from 'theme-ui'

export interface OptionType<T = string> {
  label: T
  value: T
}

export interface RadioButtonProps<T> {
  options: OptionType<T>[]
  defaultValue?: T
  textClass?: string
  textColor?: string
  lableClass?: string
  mainClass?: string
  customClassName?: string
  onChange?: (value: T) => void
  name: string
  variant?: string
  selectedValue?: T
  textSx?: ThemeUIStyleObject
}

const CommonRadioButton: FC<RadioButtonProps> = ({
  options,
  defaultValue,
  lableClass = 'radio-label',
  textClass,
  textColor,
  variant = 'Maison16Regular20',
  mainClass,
  customClassName,
  onChange,
  name,
  selectedValue,
  textSx,
}) => {
  return (
    <div className={mainClass}>
      {options.map((option) => (
        <div
          key={option.value}
          className="radio-item"
          onClick={() => onChange && onChange(option.value)}
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          <input
            type="radio"
            id={option.value}
            name={name}
            value={option.value}
            checked={selectedValue === option?.label}
            onChange={(e) => onChange && onChange(e.target.value)}
            className={customClassName}
            style={{ cursor: 'pointer' }}
          />
          <label htmlFor={option.value} className={lableClass}>
            <Text
              className={textClass}
              color={textColor}
              variant={variant}
              sx={textSx}
            >
              {option.label}
            </Text>
          </label>
        </div>
      ))}
    </div>
  )
}

export default CommonRadioButton
