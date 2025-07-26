import { ThemeButton } from '@/components/web/core/Button/Button'
import { FC } from 'react'
import { Text } from 'theme-ui'

interface GuestNumberSelectorProps {
  heading: string
  selectedGuestType: string
  data: string[]
  onClick: (number: string) => void
}
const GuestNumberSelector: FC<GuestNumberSelectorProps> = ({
  heading,
  data,
  selectedGuestType,
  onClick,
}) => {
  return (
    <div className="mb-3">
      <Text variant="Maison16Demi20" color="orange_accent_alpha">
        {heading}
      </Text>
      <div className="flex flex-wrap gap-2 mt-1">
        {data?.map((num) => (
          <ThemeButton
            key={num}
            variant="primary2"
            sx={{
              backgroundColor: selectedGuestType === num ? '#00C6B7' : 'white',
            }}
            textSx={{ color: selectedGuestType === num ? 'white' : 'black' }}
            text={num?.toString()}
            onClick={() => onClick(num)}
          />
        ))}
      </div>
    </div>
  )
}

export default GuestNumberSelector
