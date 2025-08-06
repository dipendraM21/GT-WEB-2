// components/TimeSlotCard.tsx
import Image from "next/image";
import React from "react";
import { Box } from "theme-ui";
import CustomText from "../../core/Text/CustomText";

type Props = {
  icon: string;
  label: string;
  timeRange: string;
  selected: boolean;
  onClick: () => void;
};

const DepartureCard: React.FC<Props> = ({
  icon,
  label,
  timeRange,
  selected,
  onClick,
}) => {
  return (
    <Box
      onClick={onClick}
      className={`flight-list-card py-10 px-15 text-center cursor-pointer w-full ${
        selected ? "shadow-md flight-list-card-selected" : "flight-list-card "
      }`}
    >
      <Image src={icon} alt="icon" width={30} height={30} />
      <CustomText variant="font-14-medium-20" className="text-nowrap mt-2">
        {label}
      </CustomText>
      <CustomText variant="font-14-medium-20" className="text-sm text-gray-500">
        {timeRange}
      </CustomText>
    </Box>
  );
};

export default DepartureCard;
