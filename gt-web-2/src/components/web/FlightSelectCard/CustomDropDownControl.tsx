import { CustomText } from "@/components/core/Text";
import { FC } from "react";
import { ControlProps, components } from "react-select";
import { Box } from "theme-ui";

interface CustomDropDownControlProps extends ControlProps<any, false> {
  label?: string;
  customLabelVariant?: string;
}

export const CustomDropDownControl: FC<CustomDropDownControlProps> = ({
  label = "From City :",
  customLabelVariant = "font-18-medium-125",
  children,
  ...props
}) => {
  return (
    <components.Control {...props}>
      <Box as="div" className="flex flex-col custom-dropdown-control">
        <CustomText color="grey_dark" variant={customLabelVariant}>
          {label}
        </CustomText>
        <Box className="mt-3">{children}</Box>
      </Box>
    </components.Control>
  );
};
