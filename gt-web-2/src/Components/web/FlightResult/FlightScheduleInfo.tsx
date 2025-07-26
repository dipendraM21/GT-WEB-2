import { FlightScheduleInfoProps } from '@/types/module/flightSearch'
import { FC } from 'react'
import { Text } from 'theme-ui'

const FlightScheduleInfo: FC<FlightScheduleInfoProps> = ({
  date,
  time,
  airportCode,
  city,
  airportName,
  terminal,
  dateVariant = 'DMSans14Medium20',
  timeVariant = 'DMSans28Medium20',
  airportCodeCityVariant = 'DMSans16Demi125',
  airportNameVariant = 'DMSans16Medium125',
  terminalVariant = 'DMSans14Medium20',
  dateColor = 'grey1',
  timeColor = 'primaryText',
  airportCodeCityColor = 'primaryText',
  airportNameColor = 'grey1',
  terminalColor = 'primaryText',
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <Text variant={dateVariant} color={dateColor}>
          {date}
        </Text>
        <Text variant={timeVariant} color={timeColor}>
          {time}
        </Text>
      </div>
      <Text variant={airportCodeCityVariant} color={airportCodeCityColor}>
        {airportCode} - {city}
      </Text>
      <div className="flex flex-col gap-1">
        <Text
          className="flight-airport-name"
          variant={airportNameVariant}
          color={airportNameColor}
        >
          {airportName}
        </Text>
        {terminal && (
          <Text variant={terminalVariant} color={terminalColor}>
            {terminal}
          </Text>
        )}
      </div>
    </div>
  )
}

export default FlightScheduleInfo
