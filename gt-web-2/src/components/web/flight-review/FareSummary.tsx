"use client";
import { CustomText } from "@/components/core/Text";
import { Box } from "theme-ui";

const FareSummaryUI = () => {
  return (
    <Box
      as="div"
      className="w-full lg:w-1/3 p-4   flex flex-col gap-10 bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <Box as="div" className="flex justify-between items-center">
        <CustomText
          variant="font-24-medium-125"
          color="primary-grey-900"
          className="font-semibold"
          as="label"
        >
          Fare Summary
        </CustomText>
        <CustomText
          variant="font-16-medium-125"
          color="primary-grey-300"
          as="span"
        >
          1 Traveller
        </CustomText>
      </Box>
      <Box as="div" className="space-y-2">
        {/* Fare Type */}
        <Box as="div" className="flex justify-between items-center">
          <CustomText
            variant="font-16-medium-125"
            color="primary-grey-300"
            as="span"
          >
            Fare Type
          </CustomText>
          <CustomText
            variant="font-16-demi-125"
            color="primary-grey-900"
            as="span"
          >
            Partially Refundable
          </CustomText>
        </Box>

        {/* Base Fare */}
        <Box as="div" className="flex justify-between items-center">
          <CustomText
            variant="font-16-medium-125"
            color="primary-grey-300"
            as="span"
          >
            Base Fare
          </CustomText>
          <CustomText
            variant="font-16-demi-125"
            color="primary-grey-900"
            as="span"
          >
            ₹8,713
          </CustomText>
        </Box>

        {/* Taxes & Fees */}
        <Box as="div" className="flex justify-between items-center">
          <CustomText
            variant="font-16-medium-125"
            color="primary-grey-300"
            as="span"
          >
            Taxes & Fees
          </CustomText>
          <CustomText
            variant="font-16-demi-125"
            color="primary-grey-900"
            as="span"
          >
            ₹1,756
          </CustomText>
        </Box>

        {/* Instant Off */}
        <Box as="div" className="flex justify-between items-center">
          <CustomText
            variant="font-16-medium-125"
            color="primary-grey-300"
            as="span"
          >
            Instant Off
          </CustomText>
          <CustomText
            variant="font-16-demi-125"
            color="primary-orange-500-transparent"
            as="span"
          >
            -₹889
          </CustomText>
        </Box>

        <Box as="div" className="border-t border-grey4 pt-3">
          <Box as="div" className="flex justify-between items-center">
            <CustomText
              variant="font-18-medium-125"
              color="primary-grey-900"
              className="font-semibold"
              as="span"
            >
              Total Amount
            </CustomText>
            <CustomText
              variant="font-18-medium-125"
              color="primary-grey-900"
              className="font-semibold"
              as="span"
            >
              ₹9,580
            </CustomText>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FareSummaryUI;
