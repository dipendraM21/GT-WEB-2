'use client'
import { TimePicker } from 'antd'
import dayjs from 'dayjs'
import { FC, useState } from 'react'
import { TextInputField } from '../TextInputField/TextInputField'
import { TextInputFieldProps } from '@/types/module/core/textInputField'

interface TimeInputFieldProps {
  label: string
  value: string
  placeholder?: string
}

const TimeInputField: FC<TimeInputFieldProps & TextInputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  ...props
}) => {
  const [open, setOpen] = useState(false)

  const handleTimeChange = (time: any) => {
    if (time) {
      const formatted = time.format('HH:mm')
      onChange?.(formatted)
    }
    setOpen(false)
  }

  const handleOpenChange = (status: boolean) => {
    setOpen(status)
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
        {...props}
      />
      <TimePicker
        open={open}
        onOpenChange={handleOpenChange}
        format="HH:mm"
        value={value ? dayjs(value, 'HH:mm') : null}
        onChange={handleTimeChange}
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

export default TimeInputField
