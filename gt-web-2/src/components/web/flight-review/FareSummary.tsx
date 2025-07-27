'use client'
import React from 'react';
import { Box, Text } from 'theme-ui';

const FareSummaryUI = () => {
  return (
    <Box as='div' className="w-full lg:w-1/3 p-4   flex flex-col gap-10 bg-white rounded-lg shadow-lg overflow-hidden">
      <Box as="div" className="flex justify-between items-center">
        <Text
          variant="Primary24Medium125"
          color="primaryText"
          sx={{ fontWeight: 700 }}
          as="label"
        >
          Fare Summary
        </Text>
        <Text variant="DMSans16MRegular125" color="grey1" as="span">
          1 Traveller
        </Text>
      </Box>
      <Box as="div" className="space-y-2">
        {/* Fare Type */}
        <Box as="div" className="flex justify-between items-center">
          <Text
            variant="DMSans16MRegular125"
            color="grey1"
            as="span"
          >
            Fare Type
          </Text>
          <Text
            variant="DMSans16Demi125"
            color="primaryText"
            as="span"
          >
            Partially Refundable
          </Text>
        </Box>

        {/* Base Fare */}
        <Box as="div" className="flex justify-between items-center">
          <Text
            variant="DMSans16MRegular125"
            color="grey1"
            as="span"
          >
            Base Fare
          </Text>
          <Text
            variant="DMSans16Demi125"
            color="primaryText"
            as="span"
          >
            ₹8,713
          </Text>
        </Box>

        {/* Taxes & Fees */}
        <Box as="div" className="flex justify-between items-center">
          <Text
            variant="DMSans16MRegular125"
            color="grey1"
            as="span"
          >
            Taxes & Fees
          </Text>
          <Text
            variant="DMSans16Demi125"
            color="primaryText"
            as="span"
          >
            ₹1,756
          </Text>
        </Box>

        {/* Instant Off */}
        <Box as="div" className="flex justify-between items-center">
          <Text
            variant="DMSans16MRegular125"
            color="grey1"
            as="span"
          >
            Instant Off
          </Text>
          <Text
            variant="DMSans16Demi125"
            color="orange1"
            as="span"
          >
            -₹889
          </Text>
        </Box>

        {/* Divider */}
        <Box as="div" className="border-t border-grey4 pt-3">
          {/* Total Amount */}
          <Box as="div" className="flex justify-between items-center">
            <Text
              variant="Primary18Medium125"
              color="primaryText"
              sx={{ fontWeight: 700 }}
              as="span"
            >
              Total Amount
            </Text>
            <Text
              variant="Primary18Medium125"
              color="primaryText"
              sx={{ fontWeight: 700 }}
              as="span"
            >
              ₹9,580
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FareSummaryUI;