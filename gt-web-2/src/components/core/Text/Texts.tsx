import {
  CommonHeadingTextProps,
  FromToHeadingTextProps,
  PopupModalHeaderProps,
} from "@/types/module/core/themuiModule";
import React, { Fragment } from "react";
import { GoArrowRight } from "react-icons/go";
import { Box } from "theme-ui";
import CommonSwitch from "../Switch/Switch";
import CustomText from "./CustomText";

export const PopupModalHeader: React.FC<PopupModalHeaderProps> = ({
  sx,
  title,
  customClassName,
  titleVariant = "font-18-demi-20",
}) => {
  return (
    <React.Fragment>
      <CustomText
        className={customClassName}
        color="#303030"
        variant={titleVariant}
        sx={{ paddingBottom: "20px" }}
        as="p"
      >
        {title}
      </CustomText>
      <div
        style={{
          borderBottom: "2px solid #EAEAEA !important",
          width: "100%",
          position: "absolute",
          right: 0,
        }}
      />
    </React.Fragment>
  );
};

export const CommonHeadingText: React.FC<CommonHeadingTextProps> = ({
  sx,
  title,
  label,
  customClassName,
  wrapperClass,
  titleColor,
  isChecked,
  handleSwitchOnChange,
  titleVariant = "font-18-medium-20",
  labelColor,
  labelClass,
}) => {
  return (
    <Box as="div" className={wrapperClass}>
      <CustomText
        className={customClassName}
        color={titleColor}
        variant={titleVariant}
        sx={{}}
      >
        {title}
      </CustomText>
      {label && (
        <CommonSwitch
          labelColor={labelColor}
          labelClass={labelClass}
          handleSwitchOnChange={(e: boolean | string) => {
            if (handleSwitchOnChange) {
              // Create a mock event object that matches the expected type
              const mockEvent = {
                target: { value: e.toString() },
              } as React.ChangeEvent<HTMLInputElement>;
              handleSwitchOnChange(mockEvent);
            }
          }}
          label={label}
          isChecked={isChecked || false}
          switchName={`switchName-${label}`}
        />
      )}
    </Box>
  );
};

export const FromToHeadingText: React.FC<FromToHeadingTextProps> = ({
  from,
  to,
  wrapperClass,
  variant = "font-28-medium-125",
}) => {
  return (
    <Fragment>
      <div className={`flex gap-4 items-center ${wrapperClass}`}>
        <CustomText variant={variant}>{from}</CustomText>
        <GoArrowRight size={25} />
        <CustomText variant={variant}>{to}</CustomText>
      </div>
      <CustomText
        variant="font-16-medium-125"
        className="top-2 relative"
        color="primary-grey-800"
      >
        Tue, 22 Apr •{" "}
        <CustomText
          as="span"
          color="primary-grey-800"
          variant="font-16-regular-20"
        >
          {" "}
          Non-stop • 2h 15m
        </CustomText>{" "}
        •{" "}
        <CustomText
          as="span"
          color="primary-grey-800"
          variant="font-16-regular-20"
        >
          Economy
        </CustomText>
      </CustomText>
    </Fragment>
  );
};
