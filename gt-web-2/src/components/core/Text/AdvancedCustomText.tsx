import React from "react";

// Define common text variants
export type TextVariant =
  | "heading-1"
  | "heading-2"
  | "heading-3"
  | "body"
  | "caption"
  | "label"
  | "button";

// Define color variants
export type TextColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "muted"
  | "white"
  | "black";

export interface AdvancedCustomTextProps {
  children?: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  color?: TextColor | string;
  variant?: TextVariant;
  style?: React.CSSProperties;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right" | "justify";
  truncate?: boolean;
  onClick?: () => void;
  [key: string]: unknown;
}

/**
 * Advanced Custom Text component with built-in variants and styling
 * No Theme UI dependency - completely custom implementation
 */
export const AdvancedCustomText: React.FC<AdvancedCustomTextProps> = ({
  children,
  as = "span",
  className = "",
  color,
  variant,
  style = {},
  size,
  weight,
  align,
  truncate = false,
  onClick,
  ...props
}) => {
  const Component = as;

  // Generate variant styles
  const getVariantStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {};

    switch (variant) {
      case "heading-1":
        return { fontSize: "2rem", fontWeight: "bold", lineHeight: "1.2" };
      case "heading-2":
        return { fontSize: "1.5rem", fontWeight: "bold", lineHeight: "1.3" };
      case "heading-3":
        return {
          fontSize: "1.25rem",
          fontWeight: "semibold",
          lineHeight: "1.4",
        };
      case "body":
        return { fontSize: "1rem", fontWeight: "normal", lineHeight: "1.5" };
      case "caption":
        return {
          fontSize: "0.875rem",
          fontWeight: "normal",
          lineHeight: "1.4",
        };
      case "label":
        return {
          fontSize: "0.875rem",
          fontWeight: "medium",
          lineHeight: "1.4",
        };
      case "button":
        return {
          fontSize: "0.875rem",
          fontWeight: "medium",
          lineHeight: "1.2",
        };
      default:
        return baseStyles;
    }
  };

  // Generate size styles
  const getSizeStyles = (): React.CSSProperties => {
    switch (size) {
      case "xs":
        return { fontSize: "0.75rem" };
      case "sm":
        return { fontSize: "0.875rem" };
      case "md":
        return { fontSize: "1rem" };
      case "lg":
        return { fontSize: "1.125rem" };
      case "xl":
        return { fontSize: "1.25rem" };
      case "2xl":
        return { fontSize: "1.5rem" };
      default:
        return {};
    }
  };

  // Generate weight styles
  const getWeightStyles = (): React.CSSProperties => {
    switch (weight) {
      case "light":
        return { fontWeight: "300" };
      case "normal":
        return { fontWeight: "400" };
      case "medium":
        return { fontWeight: "500" };
      case "semibold":
        return { fontWeight: "600" };
      case "bold":
        return { fontWeight: "700" };
      default:
        return {};
    }
  };

  // Generate color styles
  const getColorStyles = (): React.CSSProperties => {
    if (!color) return {};

    const colorMap: Record<TextColor, string> = {
      primary: "#007bff",
      secondary: "#6c757d",
      success: "#28a745",
      warning: "#ffc107",
      error: "#dc3545",
      muted: "#6c757d",
      white: "#ffffff",
      black: "#000000",
    };

    return { color: colorMap[color as TextColor] || color };
  };

  // Generate alignment styles
  const getAlignStyles = (): React.CSSProperties => {
    switch (align) {
      case "left":
        return { textAlign: "left" };
      case "center":
        return { textAlign: "center" };
      case "right":
        return { textAlign: "right" };
      case "justify":
        return { textAlign: "justify" };
      default:
        return {};
    }
  };

  // Generate truncate styles
  const getTruncateStyles = (): React.CSSProperties => {
    if (!truncate) return {};

    return {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    };
  };

  const combinedStyle: React.CSSProperties = {
    ...getVariantStyles(),
    ...getSizeStyles(),
    ...getWeightStyles(),
    ...getColorStyles(),
    ...getAlignStyles(),
    ...getTruncateStyles(),
    ...style,
  };

  return (
    <Component
      className={className}
      style={combinedStyle}
      data-variant={variant}
      data-size={size}
      data-weight={weight}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
};

export default AdvancedCustomText;
