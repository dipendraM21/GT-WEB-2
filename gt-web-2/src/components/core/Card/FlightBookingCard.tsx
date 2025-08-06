import FlightIcon from "@/../public/images/flight-1.png";
import { FlightBookingCardProps } from "@/types/module/core/routesModule";
import { FlightSegment } from "@/types/module/web/flightSearch";
import {
  convertToTime,
  formatValue,
  getNuumberOfStops,
} from "@/utils/functions";
import Image from "next/image";
import React, { useState } from "react";
import { MdChevronRight } from "react-icons/md";
import { TbCircleArrowDownFilled } from "react-icons/tb";
import { Box, Card, Divider } from "theme-ui";
import { ThemeButton } from "../Button/Button";
import CommonRadioButton from "../RadioButton/RadioButton";
import CustomText from "../Text/CustomText";
import { FeatureChip } from "./Chip";

const FlightBookingCard: React.FC<FlightBookingCardProps> = ({
  item,
  translation,
  buttonSX,
  isRoundTrip = false,
  onClickBook,
  onDetailsClick,
  isSelected = false,
  selectedCard,
  FareData,
  segMentData,
}) => {
  const [showAllFareData, setShowAllFareData] = useState(false);
  const displayFare = showAllFareData ? FareData : FareData?.slice(0, 3);
  return (
    <>
      {segMentData.map((flight: FlightSegment, index: number) => (
        <Card
          key={index}
          className="bg-white rounded-xl bg-gradient-background flight-list-round-trip-br"
          sx={{
            border: isSelected
              ? "1px solid #FF3F1F"
              : "1px solid hsl(214.3 1.80% 91.4%)",
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-20">
            {!isRoundTrip && (
              <Box className="flex justify-start gap-2 w-full mr-b-20 sm:w-auto sm:justify-start sm:mb-0">
                <Box className="flex gap-3 items-center">
                  <Image
                    src={FlightIcon}
                    alt="itm-src"
                    height={50}
                    width={50}
                  />
                  <Box className="flex flex-col gap-1 items-baseline">
                    <CustomText
                      variant="font-22-medium-125"
                      color="primary_grey_800"
                    >
                      {flight?.airlineName}
                    </CustomText>
                    <CustomText
                      variant="font-14-medium-20"
                      color="primary_grey_600"
                    >
                      {flight?.flightCode}
                    </CustomText>
                  </Box>
                </Box>
              </Box>
            )}

            <Box className="flex justify-content-start gap-2 items-center">
              {/* {isRoundTrip && (
              // <Image src={flight?.src} alt="itm-src" height={40} width={40} />
            )} */}
              <Box className="flex flex-col items-baseline gap-2">
                <CustomText variant="font-20-demi-25" color="primary_grey_800">
                  {convertToTime(flight?.departureTime)}
                </CustomText>
                <CustomText
                  variant="font-14-medium-20"
                  color="primary_grey_600"
                >
                  {flight?.from}
                </CustomText>
              </Box>

              <Box className="flex flex-col items-center px-4">
                <CustomText
                  variant="font-14-medium-20"
                  color="primary_grey_600"
                >
                  {convertToTime(flight?.departureTime)}
                </CustomText>
                <Divider color="black" style={{ width: "100px" }} />
                <CustomText
                  variant="font-12-regular-125"
                  color="primary_grey_800"
                >
                  {getNuumberOfStops(flight?.stops)}
                </CustomText>
              </Box>

              <Box className="flex flex-col gap-2 items-baseline px-4">
                <CustomText variant="Maison20Demi125" color="primary_text_dark">
                  {convertToTime(flight?.arrivalTime)}
                </CustomText>
                <CustomText
                  variant="font-14-medium-20"
                  color="primary_grey_600"
                >
                  {flight?.to}
                </CustomText>
              </Box>
              <div className="flex flex-col items-baseline gap-2">
                <CommonRadioButton
                  variant="font-20-demi-25"
                  options={displayFare?.map((option) => ({
                    value: formatValue(option.baseFare),
                    label: formatValue(option.baseFare),
                  }))}
                  name="paymentOptions"
                  textClass="mgl-10"
                  textColor="primary_grey_800"
                  selectedValue={""}
                  mainClass="radio-group flex justify-start gap-0 item-center ml-20 flex-col"
                />
                {FareData?.length > 3 && (
                  <TbCircleArrowDownFilled
                    size={28}
                    onClick={() => setShowAllFareData((prev) => !prev)}
                  />
                )}
              </div>
            </Box>

            <div className="flex items-center gap-3 mt-20 md:mt-0 justify-end sm:justify-normal w-full sm:w-auto">
              {!isRoundTrip && (
                <Box className="flex flex-col gap-2 cursor-pointer">
                  <ThemeButton
                    className="book-btn"
                    variant="secondary3"
                    sx={buttonSX}
                    text={translation?.BOOK}
                    onClick={onClickBook}
                  />
                  <Box
                    className="flex justify-end items-center"
                    onClick={onDetailsClick}
                  >
                    <CustomText
                      variant="font-18-medium-20"
                      color="primary_grey_800"
                    >
                      {translation?.FLIGHT_DETAILS}
                    </CustomText>
                    <MdChevronRight color="#ff7b00" size={23} />
                  </Box>
                </Box>
              )}
            </div>
          </div>
          <FeatureChip meals={FareData?.[0]?.meal} seats={2} />
        </Card>
      ))}
    </>
  );
};

export default React.memo(FlightBookingCard);
