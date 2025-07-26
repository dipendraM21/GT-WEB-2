import React from 'react'
import { Text } from 'theme-ui'

interface SortOption {
  label: string
  subLabel: string
  value: string
  active?: boolean
}

interface FlightSortTabsProps {
  sortOptions: SortOption[]
  onSortChange: (value: string) => void
  title?: string
}

const FlightSortTabs: React.FC<FlightSortTabsProps> = ({
  sortOptions,
  onSortChange,
  title,
}) => {
  return (
    <div className="flex flex-col w-100">
      {title && <Text variant="Maison18Medium125">{title}</Text>}
      <div className="w-full bg-white px-4 mt-2 rounded-xl bg-gradient-background flex flight-list-br border-3 border-[#414141] justify-around text-center items-center">
        {sortOptions.map((option, idx) => (
          <React.Fragment key={option.value}>
            <button
              onClick={() => onSortChange(option.value)}
              className={`flex flex-col items-center justify-center py-2 text-xs text-center ${
                option.active
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <Text
                variant="Maison16Medium20"
                color="text_primary_strong"
                className="flex items-center gap-1"
              >
                {option.label}
                {/* {option.label === 'Smart' && <FaArrowDown className="text-[10px]" />} */}
              </Text>
            </button>
            {idx !== sortOptions.length - 1 && (
              <div className="h-[50px] w-px bg-[#414141] self-center opacity-[0.32]"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default FlightSortTabs
