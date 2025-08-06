import { TermsCheckboxProps } from "@/types/module/core/commonModule";
import { translation } from "@/utils/translation";
import { FC } from "react";
import { Box } from "theme-ui";
import CustomText from "../Text/CustomText";

export const TermsCheckbox: FC<TermsCheckboxProps> = ({
  wrapperClass,
  wrapperSx,
  text,
  textVariant = "font-16-regular-20",
  textSx,
  textClass = "",
  onChange,
  checked,
}) => {
  return (
    <Box sx={wrapperSx} as="div" className={wrapperClass}>
      <input
        id="terms"
        aria-describedby="terms"
        type="checkbox"
        className="w-3 h-4 mt-[2px] border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
        onChange={(e) => {
          onChange(e?.target?.checked);
        }}
        checked={checked}
      />
      <CustomText
        variant={textVariant}
        color="primary_grey_800"
        className={`${textClass} flex items-center`}
      >
        {text}
        <CustomText
          as="a"
          href="#"
          color="primary-blue-700"
          className="whitespace-nowrap ms-1"
        >
          {translation?.TERMS_OF_SERVICES}
        </CustomText>
        <CustomText sx={textSx} variant={textVariant} className="mx-1">
          and
        </CustomText>
        <CustomText
          as="a"
          href="#"
          color="primary-blue-700"
          className="whitespace-nowrap"
        >
          {translation?.PRICACY_POLICY}
        </CustomText>
      </CustomText>
    </Box>
  );
};
