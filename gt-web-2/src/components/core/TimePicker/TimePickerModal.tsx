'use client'
import React, { useEffect, useState } from 'react'
import { Box, Text } from 'theme-ui'
import { ThemeButton } from '../Button/Button'

interface TimePickerModalProps {
  isOpen: boolean
  onClose: () => void
  onTimeSelect: (time: string) => void
  initialTime?: string
  title?: string
}

interface TimeValue {
  hours: string
  minutes: string
}

export const TimePickerModal: React.FC<TimePickerModalProps> = ({
  isOpen,
  onClose,
  onTimeSelect,
  initialTime = '00:00',
  title = 'Select Time',
}) => {
  const [selectedTime, setSelectedTime] = useState<TimeValue>({
    hours: '00',
    minutes: '00',
  })

  // Generate hours array (00-23)
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0')
  )

  // Generate minutes array (00-59)
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, '0')
  )

  useEffect(() => {
    if (initialTime) {
      const [h, m] = initialTime.split(':')
      setSelectedTime({
        hours: h || '00',
        minutes: m || '00',
      })
    }
  }, [initialTime])

  const handleHourSelect = (hour: string) => {
    setSelectedTime((prev) => ({ ...prev, hours: hour }))
  }

  const handleMinuteSelect = (minute: string) => {
    setSelectedTime((prev) => ({ ...prev, minutes: minute }))
  }

  const handleConfirm = () => {
    const timeString = `${selectedTime.hours}:${selectedTime.minutes}`
    onTimeSelect(timeString)
    onClose()
  }

  const handleCancel = () => {
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="time-picker-overlay">
      <div className="time-picker-modal">
        <Box sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Text sx={{ fontSize: '18px', fontWeight: 'bold', color: 'text' }}>
              {title}
            </Text>
          </Box>

          {/* Time Display */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Text
              sx={{ fontSize: '24px', fontWeight: 'bold', color: 'primary' }}
            >
              {selectedTime.hours}:{selectedTime.minutes}
            </Text>
          </Box>

          {/* Time Picker */}
          <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
            {/* Hours Column */}
            <Box sx={{ flex: 1 }}>
              <Text
                sx={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  mb: 2,
                  textAlign: 'center',
                }}
              >
                Hours
              </Text>
              <Box
                sx={{
                  height: '200px',
                  overflowY: 'auto',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  bg: 'white',
                }}
                className="time-scroll-container"
              >
                {hours.map((hour) => (
                  <Box
                    key={hour}
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      textAlign: 'center',
                      backgroundColor:
                        selectedTime.hours === hour ? 'primary' : 'transparent',
                      color: selectedTime.hours === hour ? 'white' : 'text',
                      '&:hover': {
                        backgroundColor:
                          selectedTime.hours === hour ? 'primary' : '#f8fafc',
                      },
                      borderBottom: '1px solid #f1f5f9',
                    }}
                    onClick={() => handleHourSelect(hour)}
                  >
                    <Text sx={{ fontSize: '16px', fontWeight: 'medium' }}>
                      {hour}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Minutes Column */}
            <Box sx={{ flex: 1 }}>
              <Text
                sx={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  mb: 2,
                  textAlign: 'center',
                }}
              >
                Minutes
              </Text>
              <Box
                sx={{
                  height: '200px',
                  overflowY: 'auto',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  bg: 'white',
                }}
                className="time-scroll-container"
              >
                {minutes.map((minute) => (
                  <Box
                    key={minute}
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      textAlign: 'center',
                      backgroundColor:
                        selectedTime.minutes === minute
                          ? 'primary'
                          : 'transparent',
                      color: selectedTime.minutes === minute ? 'white' : 'text',
                      '&:hover': {
                        backgroundColor:
                          selectedTime.minutes === minute
                            ? 'primary'
                            : '#f8fafc',
                      },
                      borderBottom: '1px solid #f1f5f9',
                    }}
                    onClick={() => handleMinuteSelect(minute)}
                  >
                    <Text sx={{ fontSize: '16px', fontWeight: 'medium' }}>
                      {minute}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <ThemeButton
              text="Cancel"
              variant="secondary"
              onClick={handleCancel}
              sx={{ px: 4, py: 2 }}
            />
            <ThemeButton
              text="Confirm"
              variant="primary"
              onClick={handleConfirm}
              sx={{ px: 4, py: 2 }}
            />
          </Box>
        </Box>
      </div>

      <style jsx>{`
        .time-picker-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .time-picker-modal {
          background: white;
          border-radius: 12px;
          box-shadow:
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
          max-width: 400px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .time-scroll-container {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e0 #f7fafc;
        }

        .time-scroll-container::-webkit-scrollbar {
          width: 6px;
        }

        .time-scroll-container::-webkit-scrollbar-track {
          background: #f7fafc;
          border-radius: 3px;
        }

        .time-scroll-container::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 3px;
        }

        .time-scroll-container::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }
      `}</style>
    </div>
  )
}
