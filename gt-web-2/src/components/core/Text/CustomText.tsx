import React from "react";
import { CustomStyleProps } from "../../../types/module/core/customStyleTypes";

export interface CustomTextProps {
  children?: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  color?: string;
  variant?: string;
  sx?: CustomStyleProps;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  [key: string]: unknown;
}

export const CustomText: React.FC<CustomTextProps> = ({
  children,
  as = "span",
  className = "",
  color,
  variant = "",
  sx,
  sm,
  md,
  lg,
  xl,
  ...props
}) => {
  const Component = as;

  const responsiveTextSizes = {
    sm,
    md,
    lg,
    xl,
  };

  const responsiveClasses = Object.entries(responsiveTextSizes)
    .filter(([_, val]) => val !== undefined)
    .map(([key, val]) => `${key}:text-[${val}px]`)
    .join(" ");

  const styleProps: CustomStyleProps = {
    ...(color && { color: `var(--color-${color})` }),
    ...sx,
  };

  return (
    <Component
      className={`${responsiveClasses} ${variant} ${className}`.trim()}
      style={styleProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export default CustomText;
