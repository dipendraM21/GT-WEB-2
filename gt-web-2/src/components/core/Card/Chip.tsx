import { GiHotMeal, GiWeight } from 'react-icons/gi'
import { MdAirlineSeatLegroomExtra } from 'react-icons/md'
import { Box, Text } from 'theme-ui'

interface FeatureChipProps {
  seats: number
  meals: string
}
export const FeatureChip: React.FC<FeatureChipProps> = ({ seats, meals }) => (
  <Box
    className="flex items-center gap-4 w-full overflow-hidden p-2 rounded-bottom"
    sx={{
      backgroundColor: '#aaaaaaa6',
      flex: 1,
    }}
  >
    <Box className="flex gap-2 items-center">
      <MdAirlineSeatLegroomExtra color="#fc790dd9" size={18} />
      <Text variant="Maison16Medium20" color="primary_text_dark">
        {seats}
      </Text>
    </Box>

    <Box className="flex gap-2 items-center">
      <GiHotMeal color="#fc790dd9" size={18} />
      <Text variant="Maison16Medium20" color="primary_text_dark">
        {meals}
      </Text>
    </Box>

    <Box className="flex gap-2 items-center">
      <GiWeight color="#fc790dd9" size={18} />
      <Text variant="Maison16Medium20" color="primary_text_dark">
        {meals}
      </Text>
    </Box>
  </Box>
)
