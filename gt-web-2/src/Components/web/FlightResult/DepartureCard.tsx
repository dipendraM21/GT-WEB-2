// components/TimeSlotCard.tsx
import Image from 'next/image'
import React from 'react'
import { Box, Text } from 'theme-ui'

type Props = {
  icon: string
  label: string
  timeRange: string
  selected: boolean
  onClick: () => void
}

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
        selected ? 'shadow-md flight-list-card-selected' : 'flight-list-card '
      }`}
    >
      <Image src={icon} alt="icon" width={30} height={30} />
      <Text variant="Maison14Medium20" className="text-nowrap mt-2">
        {label}
      </Text>
      <Text className="text-sm text-gray-500">{timeRange}</Text>
    </Box>
  )
}

export default DepartureCard
