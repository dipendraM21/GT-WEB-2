import { CustomText } from "@/components/core/Text";
import { FlightScheduleInfoProps } from "@/types/module/web/flightSearch";
import { FC } from "react";

const FlightScheduleInfo: FC<FlightScheduleInfoProps> = ({
  date,
  time,
  airportCode,
  city,
  airportName,
  terminal,
  dateVariant = "font-14-medium-20",
  timeVariant = "font-28-medium-20",
  airportCodeCityVariant = "font-16-demi-20",
  airportNameVariant = "font-16-medium-20",
  terminalVariant = "font-14-medium-20",
  dateColor = "primary-grey-300",
  timeColor = "primary-grey-900",
  airportCodeCityColor = "primary-grey-900",
  airportNameColor = "primary-grey-300",
  terminalColor = "primary-grey-900",
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <CustomText variant={dateVariant} color={dateColor}>
          {date}
        </CustomText>
        <CustomText variant={timeVariant} color={timeColor}>
          {time}
        </CustomText>
      </div>
      <CustomText variant={airportCodeCityVariant} color={airportCodeCityColor}>
        {airportCode} - {city}
      </CustomText>
      <div className="flex flex-col gap-1">
        <CustomText
          className="flight-airport-name"
          variant={airportNameVariant}
          color={airportNameColor}
        >
          {airportName}
        </CustomText>
        {terminal && (
          <CustomText variant={terminalVariant} color={terminalColor}>
            {terminal}
          </CustomText>
        )}
      </div>
    </div>
  );
};

export default FlightScheduleInfo;
