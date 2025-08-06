import { CustomText } from "@/components/core/Text";
import React from "react";

interface SortOption {
  label: string;
  subLabel: string;
  value: string;
  active?: boolean;
}

interface FlightSortTabsProps {
  sortOptions: SortOption[];
  onSortChange: (value: string) => void;
  title?: string;
}

const FlightSortTabs: React.FC<FlightSortTabsProps> = ({
  sortOptions,
  onSortChange,
  title,
}) => {
  return (
    <div className="flex flex-col w-100">
      {title && <CustomText variant="font-18-medium-125">{title}</CustomText>}
      <div className="w-full bg-white px-4 mt-2 rounded-xl bg-gradient-background flex flight-list-br border-3 border-[#414141] justify-around text-center items-center">
        {sortOptions.map((option, idx) => (
          <React.Fragment key={option.value}>
            <button
              onClick={() => onSortChange(option.value)}
              className={`flex flex-col items-center justify-center py-2 text-xs text-center ${
                option.active
                  ? "text-blue-600 font-medium"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <CustomText
                variant="font-16-medium-20"
                color="primary-grey-900"
                className="flex items-center gap-1"
              >
                {option.label}
                {/* {option.label === 'Smart' && <FaArrowDown className="text-[10px]" />} */}
              </CustomText>
            </button>
            {idx !== sortOptions.length - 1 && (
              <div className="h-[50px] w-px bg-[#414141] self-center opacity-[0.32]"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FlightSortTabs;
