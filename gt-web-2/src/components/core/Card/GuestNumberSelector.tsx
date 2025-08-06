import { FC } from "react";
import { ThemeButton } from "../Button/Button";
import CustomText from "../Text/CustomText";

interface GuestNumberSelectorProps {
  heading: string;
  selectedGuestType: string;
  data: string[];
  onClick: (number: string) => void;
}
const GuestNumberSelector: FC<GuestNumberSelectorProps> = ({
  heading,
  data,
  selectedGuestType,
  onClick,
}) => {
  return (
    <div className="mb-3">
      <CustomText
        variant="font-16-demi-20"
        color="primary_orange_500_transparent"
      >
        {heading}
      </CustomText>
      <div className="flex flex-wrap gap-2 mt-1">
        {data?.map((num) => (
          <ThemeButton
            key={num}
            variant="primary2"
            sx={{
              backgroundColor: selectedGuestType === num ? "#00C6B7" : "white",
            }}
            textSx={{ color: selectedGuestType === num ? "white" : "black" }}
            text={num?.toString()}
            onClick={() => onClick(num)}
          />
        ))}
      </div>
    </div>
  );
};

export default GuestNumberSelector;
