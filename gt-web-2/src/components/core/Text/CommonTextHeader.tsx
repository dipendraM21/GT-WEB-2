import { FC } from "react";
import { Box } from "theme-ui";
import CustomText from "./CustomText";

export interface SectionTitleBarProps {
  primaryText?: string;
  primaryVariant?: string;
  primaryClass?: string;
  secondaryText?: string;
  secondaryVariant?: string;
  secondaryClass?: string;
  secondaryColor?: string;
  primaryColor?: string;
  onActionClick?: () => void;
}
const SectionTitleBar: FC<SectionTitleBarProps> = ({
  primaryText,
  primaryColor = "primary-grey-600",
  secondaryColor = "primary-grey-600",
  primaryVariant = "font-16-medium-125",
  primaryClass,
  secondaryClass,
  secondaryText,
  secondaryVariant = "font-16-medium-125",
  onActionClick,
}) => {
  return (
    <Box
      as="div"
      className="flex items-center justify-between py-2 border-b-2 border-[#e7e7e8]"
    >
      <CustomText
        variant={primaryVariant}
        color={primaryColor}
        className={primaryClass}
      >
        {primaryText}
      </CustomText>

      <CustomText
        color={secondaryColor}
        variant={secondaryVariant}
        className={secondaryClass}
        onClick={onActionClick}
      >
        {secondaryText}
      </CustomText>
    </Box>
  );
};

export default SectionTitleBar;
