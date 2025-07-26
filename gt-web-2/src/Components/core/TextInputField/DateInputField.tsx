'use client'
import { TextInputField } from '@/components/shared/TextInputField/TextInputField'
import { TextInputFieldProps } from '@/typessss/module/web/textInputField'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import { FC, useState } from 'react'
import { ThemeUIStyleObject } from 'theme-ui'

interface DateInputFieldProps {
  label: string
  value: string
  placeholder?: string
  format?: string
  validationVariant?: string
  manualErrorMessage?: string
  requiredIconSx?: ThemeUIStyleObject
  manualErrorSX?: ThemeUIStyleObject
}

const DateInputField: FC<DateInputFieldProps & TextInputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  format = 'YYYY-MM-DD',
  manualErrorMessage,
  requiredIconSx,
  manualErrorSX,
  validationVariant,
  ...props
}) => {
  const [open, setOpen] = useState(false)

  const handleDateChange = (date: any) => {
    if (date) {
      const formatted = date.format(format)
      onChange?.(formatted)
    }
    setOpen(false)
  }

  const handleOpenChange = (status: boolean) => {
    setOpen(status)
  }

  const disablePreviousDates = (currentDate: dayjs.Dayjs) => {
    const today = dayjs().startOf('day')
    return (
      currentDate.isBefore(today, 'day') || currentDate.year() < today.year()
    )
  }

  return (
    <div style={{ position: 'relative' }}>
      <TextInputField
        label={label}
        value={value}
        placeholder={placeholder}
        onClick={() => setOpen(true)}
        firstInputBox
        readOnly
        requiredIconSx={requiredIconSx}
        manualErrorMessage={manualErrorMessage}
        {...props}
      />
      <DatePicker
        open={open}
        onOpenChange={handleOpenChange}
        format={format}
        value={value ? dayjs(value, format) : null}
        onChange={handleDateChange}
        disabledDate={disablePreviousDates}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

export default DateInputField
