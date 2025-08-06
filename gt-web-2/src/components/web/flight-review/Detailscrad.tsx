import { CustomText } from "@/components/core/Text";
import AirlinesLogos from "@/components/web/logos/AirlinesLogos";
import Image from "next/image";
import {
  FaArrowRight,
  FaBolt,
  FaClock,
  FaCoffee,
  FaPlane,
  FaSuitcase,
  FaTv,
  FaWifi,
} from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { Box } from "theme-ui";

interface FlightBookingUiProps {
  showWarning?: boolean;
}

const FlightBookingUI = ({ showWarning = false }: FlightBookingUiProps) => {
  return (
    <Box className=" mx-auto bg-white rounded-lg shadow-lg overflow-hidden ">
      {/* First Flight Section */}
      <Box className="p-4 md:p-6 border-b border-gray-200 flex gap-10 flex-col">
        <Box className="flex flex-col ">
          <CustomText
            variant="font-28-medium-125"
            color="primary-grey-900"
            className=" font-semibold flex items-center gap-2"
          >
            Ghaziabad <FaArrowRight className="text-gray-900 w-4 h-4" /> Mumbai
          </CustomText>
          <CustomText
            variant="font-14-regular-20"
            color="primary-grey-300"
            as="span"
          >
            {" "}
            <strong>Wed, 16 Jul</strong> • Non-stop • 2h 10m • Economy
          </CustomText>
        </Box>

        {/* Warning Banner */}
        {showWarning && (
          <Box className="bg-yellow-50 border border-yellow-200 rounded-lg p-2  flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <FaPlane className="text-yellow-600 w-4 h-4 flex-shrink-0 hidden md:block" />
            <CustomText
              variant="font-14-regular-20"
              color="primary-orange-500-transparent"
              as="span"
            >
              You searched for a flight from{" "}
              <CustomText as="span" sx={{ fontWeight: 500 }}>
                DEL (Delhi Indira Gandhi International Airport)
              </CustomText>{" "}
              , but you have selected{" "}
              <CustomText as="span" sx={{ fontWeight: 500 }}>
                HDO (Hindon Airport)
              </CustomText>{" "}
              as the departure airport.
            </CustomText>
          </Box>
        )}

        {/* Airline Info */}
        <Box className="flex flex-col sm:flex-row sm:items-center gap-3  ">
          <AirlinesLogos names="Air India" width={140} height={65} />
          <Box className="flex flex-wrap items-center gap-2 ">
            <CustomText
              variant="font-18-medium-125"
              color="primary-grey-900"
              className="font-semibold"
            >
              Air India Express
            </CustomText>
            <CustomText
              variant="font-14-regular-20"
              color="primary-grey-300"
              as="span"
            >
              IX 1178
            </CustomText>
            <CustomText
              color="primary-green-700"
              className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 border border-green-800 border-1"
            >
              <FaClock className="w-3 h-3" />
              70% On-time
            </CustomText>
          </Box>
        </Box>

        {/* Flight Details */}
        <Box className="flex flex-col lg:flex-row lg:items-start justify-between  gap-6 ">
          <Box className="flex items-start flex-1 ">
            <Box className="text-center flex-1 flex-col flex items-start">
              <CustomText
                variant="font-14-regular-20"
                color="primary-grey-300"
                className="mb-1"
              >
                Wed, 16 Jul
              </CustomText>
              <CustomText variant="font-60-bold-132" color="primary-grey-900">
                11:35
              </CustomText>
              <CustomText
                variant="font-14-medium-20"
                color="primary-grey-900"
                className="font-medium mt-1"
              >
                HDO - Ghaziabad
              </CustomText>
              <CustomText variant="font-14-regular-20" color="primary-grey-300">
                Hindon Airport
              </CustomText>
            </Box>

            <Box className="flex flex-col items-center px-4 self-center">
              <CustomText variant="font-14-regular-20" color="primary-grey-300">
                2h 10m
              </CustomText>
              <Image
                src="/images/line.svg"
                alt="Flight route line"
                width={100}
                height={2}
                className="w-full max-w-xs"
              />
            </Box>

            <Box className="text-center flex-1 flex-col flex items-end">
              <CustomText
                variant="font-14-regular-20"
                color="primary-grey-300"
                className="mb-1"
              >
                Wed, 16 Jul
              </CustomText>
              <CustomText variant="font-60-bold-132" color="primary-grey-900">
                13:45
              </CustomText>
              <CustomText
                variant="font-14-medium-20"
                color="primary-grey-900"
                className="font-medium mt-1"
              >
                BOM - Mumbai
              </CustomText>
              <CustomText variant="font-14-regular-20" color="primary-grey-300">
                Chatrapati Shivaji
              </CustomText>
              <CustomText variant="font-14-regular-20" color="primary-grey-300">
                International Airport
              </CustomText>
              <CustomText variant="font-14-regular-20" color="primary-grey-300">
                Terminal 2
              </CustomText>
            </Box>
          </Box>

          {/* Baggage Section */}
          <Box className="lg:ml-8  lg:border-gray-200 lg:pl-6 border-t lg:border-t-0 border-gray-200  lg:pt-0 flex flex-col items-start gap-3">
            <CustomText variant="font-14-medium-20" color="primary-grey-300">
              {" "}
              <strong>Baggage</strong>{" "}
            </CustomText>
            <Box className="space-y-2">
              <Box className="flex items-center gap-2">
                <FaSuitcase className="w-4 h-4 text-gray-600 flex-shrink-0" />
                <CustomText
                  variant="font-14-regular-20"
                  color="primary-grey-300"
                >
                  <strong>Cabin</strong> : 7 kg per adult
                </CustomText>
              </Box>
              <Box className="flex items-center gap-2">
                <FaSuitcase className="w-4 h-4 text-gray-600 flex-shrink-0" />
                <CustomText
                  variant="font-14-regular-20"
                  color="primary-grey-300"
                >
                  <strong>Check-in</strong> : 15 kg per piece, 1 piece per adult
                </CustomText>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Flight Features */}
        <Box className="flex flex-wrap items-center gap-2 md:gap-4 text-gray-600 text-sm mt-4">
          <Box className="flex items-center gap-1">
            <FaPlane className="w-4 h-4" />
            <CustomText variant="font-14-regular-20" color="primary-grey-300">
              B737MAX8
            </CustomText>
          </Box>
          <Box className="flex items-center gap-1">
            <Image src="/images/chair.svg" alt="chair" width={16} height={16} />
            <CustomText variant="font-14-regular-20" color="primary-grey-300">
              Narrow
            </CustomText>
          </Box>
          <Box className="flex items-center gap-1">
            <MdGridView className="w-4 h-4" />
            <CustomText
              variant="font-14-regular-20"
              color="primary-grey-300"
              className="hidden sm:inline"
            >
              Narrow (Limited seat tilt)
            </CustomText>
          </Box>
          <FaWifi className="w-4 h-4" />
          <FaCoffee className="w-4 h-4" />
          <FaTv className="w-4 h-4" />
          <FaBolt className="w-4 h-4" />
        </Box>
      </Box>
    </Box>
  );
};

export default FlightBookingUI;
