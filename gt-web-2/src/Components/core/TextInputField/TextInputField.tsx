'use client'
import eyeIcon from '@/../public/svg/eyeball-open-view.svg'
import eyeClosedIcon from '@/../public/svg/invisible-eye-icon.svg'
import { TextInputFieldProps } from '@/typessss/module/web/textInputField'
import Image from 'next/image'
import React, { forwardRef, useState } from 'react'
import { Box, Input, Text } from 'theme-ui'

const TextInputField = forwardRef<HTMLInputElement, TextInputFieldProps>(
  (
    {
      placeholder,
      variant = 'primaryInput',
      validationVariant = 'Maison16Regular20',
      name = '',
      type,
      disabled = false,
      autoFocus,
      requiredIconSx,
      Inputsx,
      onChange,
      onIconClick,
      onClickWrapper,
      onClick,
      onBlur,
      onKeyDown,
      onFocus,
      value,
      wrapperClass = '',
      showIcon,
      customClassName = '',
      errors,
      touched,
      description,
      maxLength,
      minLength,
      label,
      wrapperSx,
      manualErrorMessage,
      iconSrc,
      labelVariant = 'Maison18Medium125',
      wrapperVariant = '',
      labelClassName,
      autoComplete = 'off',
      firstInputBox = false,
      required,
      labelSx,
      iconWrapperClassName,
      iconWrapperSx,
      manualErrorSX,
      readOnly = false,
      isShowRequired = false,
      isEyeShow = true,
      id = '',
      inputWidth = '',
      labelColor,
    },
    ref
  ) => {
    const [maskedField, setMaskedField] = useState(false)

    const handleIconClick = () => {
      setMaskedField(!maskedField)
    }

    const uniqueId = id || `input-${name}` // Ensure the ID is unique

    const labelProps: { htmlFor: string } = {
      htmlFor: uniqueId, // Use the unique ID here
    }

    return (
      <React.Fragment>
        <Box
          className={wrapperClass}
          variant={wrapperVariant}
          onClick={onClickWrapper}
          mt={firstInputBox ? 0 : '14px'}
          sx={{
            ...wrapperSx,
            position: 'relative',
          }}
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
              color={errors && touched ? 'red_600' : labelColor}
              aria-labelledby={uniqueId} // Correctly associate label with input
              {...labelProps}
            >
              {label}
              {isShowRequired && (
                <Text
                  as="span"
                  color="red_600"
                  sx={{
                    ...requiredIconSx,
                    color: 'red_600',
                    ml: '4px',
                  }}
                >
                  *
                </Text>
              )}
            </Text>
          )}

          <Input
            id={uniqueId} // Use the unique ID for the input field
            variant={variant}
            placeholder={placeholder}
            autoComplete={autoComplete}
            name={name}
            ref={ref}
            type={maskedField && type === 'password' ? 'text' : type}
            disabled={disabled}
            maxLength={maxLength}
            minLength={minLength}
            autoFocus={autoFocus}
            className={`mx-0  ${inputWidth ? inputWidth : 'w-100'} font-noto-sans ${customClassName}`}
            sx={{
              ...Inputsx,
              borderColor: errors && touched ? 'red' : '',
            }}
            onChange={(e) => {
              if (onChange) {
                onChange(e?.target.value)
              }
            }}
            onClick={onClick}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            value={value}
            required={required}
            readOnly={readOnly}
          />
          {errors && touched ? (
            <Text
              sx={{ ...manualErrorSX, color: 'red_600' }}
              variant={validationVariant}
              className="pt-6"
            >
              {errors.toString()}
            </Text>
          ) : (
            <Text
              variant={validationVariant}
              sx={{ my: '5px', minHeight: '11px' }}
            >
              {description}
            </Text>
          )}
          {manualErrorMessage && (
            <Text variant={validationVariant} sx={manualErrorSX}>
              {manualErrorMessage.toString()}
            </Text>
          )}
          {type === 'password' && isEyeShow && (
            <Box
              onClick={handleIconClick}
              className={iconWrapperClassName}
              sx={{
                ...iconWrapperSx,
                position: 'absolute',
                right: '16px',
                top: ['52px', '52px', '53px', '53px', '53px'],
                transform: 'translateY(-50%)',
                cursor: 'pointer',
              }}
            >
              <Image
                height={23}
                width={23}
                alt="check-icon"
                src={maskedField ? eyeIcon : eyeClosedIcon}
              />
            </Box>
          )}
          {showIcon && iconSrc && (
            <Box
              onClick={onIconClick}
              className={iconWrapperClassName}
              sx={iconWrapperSx}
            >
              <Image
                height={20}
                width={20}
                className="primary-input-icon"
                src={iconSrc}
                alt={'icon'}
              />
            </Box>
          )}
        </Box>
      </React.Fragment>
    )
  }
)

TextInputField.displayName = 'TextInputField'
export { TextInputField }
