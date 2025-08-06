import { GiHotMeal, GiWeight } from "react-icons/gi";
import { MdAirlineSeatLegroomExtra } from "react-icons/md";
import { Box } from "theme-ui";
import CustomText from "../Text/CustomText";

interface FeatureChipProps {
  seats: number;
  meals: string;
}
export const FeatureChip: React.FC<FeatureChipProps> = ({ seats, meals }) => (
  <Box
    className="flex items-center gap-4 w-full overflow-hidden p-2 rounded-bottom"
    sx={{
      backgroundColor: "#aaaaaaa6",
      flex: 1,
    }}
  >
    <Box className="flex gap-2 items-center">
      <MdAirlineSeatLegroomExtra color="#fc790dd9" size={18} />
      <CustomText variant="font-16-medium-20" color="primary_grey_800">
        {seats}
      </CustomText>
    </Box>

    <Box className="flex gap-2 items-center">
      <GiHotMeal color="#fc790dd9" size={18} />
      <CustomText variant="font-16-medium-20" color="primary_grey_800">
        {meals}
      </CustomText>
    </Box>

    <Box className="flex gap-2 items-center">
      <GiWeight color="#fc790dd9" size={18} />
      <CustomText variant="font-16-medium-20" color="primary_grey_800">
        {meals}
      </CustomText>
    </Box>
  </Box>
);
