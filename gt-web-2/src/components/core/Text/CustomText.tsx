import React from "react";

export interface CustomTextProps {
  children?: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  color?: string;
  variant?: string;
  sx?: React.CSSProperties;
  [key: string]: unknown; // Allow additional props
}

/**
 * Custom Text component with flexible styling options
 * Supports all standard text props plus custom styling
 */
export const CustomText: React.FC<CustomTextProps> = ({
  children,
  as = "h3",
  className = "",
  color,
  variant,
  sx,
  ...props
}) => {
  const Component = as;

  const combinedStyle: React.CSSProperties = {
    color,
    ...sx,
  };

  return (
    <Component
      className={className}
      style={combinedStyle}
      data-variant={variant}
      {...props}
    >
      {children}
    </Component>
  );
};

export default CustomText;
