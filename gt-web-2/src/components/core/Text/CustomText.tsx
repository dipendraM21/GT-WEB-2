import React from "react";
import { CustomStyleProps } from "../../../types/module/core/customStyleTypes";

export interface CustomTextProps {
  children?: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  color?: string;
  variant?: string;
  sx?: CustomStyleProps;
  [key: string]: unknown; // Allow additional props
}

/**
 */
export const CustomText: React.FC<CustomTextProps> = ({
  children,
  as = "span",
  className = "",
  color,
  variant,
  sx,
  ...props
}) => {
  const Component = as;

  // Handle sx prop separately since it's CustomStyleProps
  console.log("color", `var(--color-${color})`);
  const styleProps: React.CSSProperties = {
    color: `var(--color-${color})`,
  };

  return (
    <Component
      className={variant}
      style={styleProps}
      // data-variant={variant}
      {...props}
    >
      {children}
    </Component>
  );
};

export default CustomText;
