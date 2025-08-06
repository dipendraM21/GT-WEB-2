import React from "react";
import { Box, Switch, ThemeUIStyleObject } from "theme-ui";
import CustomText from "../Text/CustomText";

interface CustomSwitchProps {
  id?: string;
  name?: string;
  variant?: string;
  label?: string;
  textVariant?: string;
  wrapperClassName?: string;
  checked: boolean;
  switchSx?: ThemeUIStyleObject;
  wrapperSx?: ThemeUIStyleObject;
  onChange: (e: boolean) => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  id,
  name,
  checked,
  label,
  switchSx,
  wrapperSx,
  variant = "switchInput",
  wrapperClassName,
  textVariant = "font-16-regular-20",
  onChange,
}) => {
  return (
    <Box
      className={wrapperClassName}
      sx={{
        display: "inline-block",
        alignItems: "center",
        ...wrapperSx,
      }}
    >
      <CustomText variant={textVariant}>{label}</CustomText>
      <Switch
        id={id}
        name={name}
        checked={checked}
        onChange={(e) => {
          onChange(e?.target?.checked);
        }}
        variant={variant}
        sx={switchSx}
      />
    </Box>
  );
};

export default CustomSwitch;
