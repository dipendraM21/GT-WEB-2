'use client'

import { SelectInputFieldProps } from '@/typessss/module/web/selectInputFieldModule'
import Image from 'next/image'
import React, { useRef } from 'react'
import Selects, { DropdownIndicatorProps, components } from 'react-select'
import { Box, Text } from 'theme-ui'
import {
  GroupType,
  OptionType,
  isMultiple,
  stylesConfig,
} from '@/utils/stylesConfig'

export const SelectInputField: React.FC<SelectInputFieldProps> = ({
  wrapperClass,
  wrapperSx,
  isDisabled = false,
  customClassName = '',
  value,
  defaultValue,
  options,
  placeholder,
  onChange,
  onBlur,
  isSearchable = false,
  isLoading = false,
  touched = false,
  errors = '',
  description,
  label,
  stylesConfigs = stylesConfig,
  classNames,
  indicatorIconClassName = 'primary-selection',
  name,
  firstInputBox = false,
  labelVariant = 'Maison18Medium125',
  labelSx,
  inputId,
  instanceId,
  variant,
  id,
  labelClassName,
  isShowRequired,
  requiredIconSx,
  validationVariant = 'Maison16Regular20',
  manualErrorSX,
}) => {
  const currentValueRef = useRef(value)

  const DropdownIndicator = (
    props: DropdownIndicatorProps<OptionType, typeof isMultiple, GroupType>
  ) => {
    return (
      <components.DropdownIndicator {...props}>
        <Image
          className={indicatorIconClassName}
          src={'/svg/select.svg'}
          alt="select"
          width={10}
          height={10}
        />
      </components.DropdownIndicator>
    )
  }

  const labelProps: { htmlFor?: string } = {
    htmlFor: id,
  }
  return (
    <Box
      variant={variant}
      className={wrapperClass}
      mt={firstInputBox ? 'unset' : 14}
      sx={wrapperSx}
    >
      {label && (
        <Text
          className={labelClassName}
          as="label"
          sx={{
            mb: 10,
            ...labelSx,
            color: errors && touched ? 'red_600' : 'primary_text_dark',
          }}
          variant={labelVariant}
          aria-labelledby={id}
          {...labelProps}
        >
          {label}
          {isShowRequired && (
            <Text
              as="span"
              sx={{
                ...requiredIconSx,
                color: 'red',
                ml: '4px',
              }}
            >
              *
            </Text>
          )}
        </Text>
      )}
      <Selects
        isDisabled={isDisabled}
        defaultValue={
          defaultValue
            ? typeof value === 'string'
              ? { value: value, label: value }
              : { value: value?.label, label: value?.label }
            : undefined
        }
        className={errors && touched ? 'react-select-error' : customClassName}
        id={id}
        placeholder={placeholder}
        name={name}
        // classNamePrefix={errors && touched ? 'react-select-error' : ''}
        onBlur={(e) => {
          if (onBlur) {
            onBlur(e, currentValueRef?.current)
          }
        }}
        components={{ DropdownIndicator }}
        value={
          value
            ? typeof value === 'string'
              ? { value: value, label: value }
              : { value: value?.value, label: value?.label }
            : null
        }
        onChange={(selectedOption) => {
          onChange({
            value: selectedOption?.value,
            label: selectedOption?.label,
          })
          if (selectedOption?.value) {
            currentValueRef.current = selectedOption?.value
          }
        }}
        options={
          options?.map((option) => {
            if (typeof option === 'string') {
              return { value: option, label: option }
            } else {
              return { value: option.value, label: option.label }
            }
          }) || []
        }
        isSearchable={isSearchable}
        isLoading={isLoading}
        classNames={{
          ...classNames,
          control: () => (errors && touched ? 'react-select-error' : ''),
        }}
        styles={stylesConfigs}
        inputId={inputId}
        instanceId={instanceId}
        onInputChange={(inputValue, { action }) => {
          if (action === 'input-change') {
            onChange({ value: inputValue, label: inputValue })
            currentValueRef.current = inputValue
          }
        }}
        menuPlacement="auto"
      />
      {errors && touched ? (
        <Text
          sx={{ ...manualErrorSX, color: 'red_600' }}
          variant={validationVariant}
          color="red_600"
          className="pt-6"
        >
          {errors.toString()}
        </Text>
      ) : (
        <Text variant={validationVariant} sx={{ my: '5px', minHeight: '11px' }}>
          {description}
        </Text>
      )}
    </Box>
  )
}
