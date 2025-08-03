import * as CSS from "csstype";

// Basic CSS properties type
export type CSSProperties = CSS.Properties<number | string>;

// Custom style object that extends CSS properties with additional features
export interface CustomStyleObject extends CSSProperties {
  // Add custom properties that you want to support
  [key: string]: string | number | boolean | undefined;
}

// Responsive style value type
export type ResponsiveStyleValue<T> = T | T[] | (T | null | undefined)[];

// Theme-aware style object (simplified version of ThemeUIStyleObject)
export interface ThemeAwareStyleObject {
  // CSS properties
  color?: ResponsiveStyleValue<string>;
  backgroundColor?: ResponsiveStyleValue<string>;
  fontSize?: ResponsiveStyleValue<string | number>;
  fontWeight?: ResponsiveStyleValue<string | number>;
  fontFamily?: ResponsiveStyleValue<string>;
  lineHeight?: ResponsiveStyleValue<string | number>;
  textAlign?: ResponsiveStyleValue<CSS.Property.TextAlign>;
  margin?: ResponsiveStyleValue<string | number>;
  marginTop?: ResponsiveStyleValue<string | number>;
  marginRight?: ResponsiveStyleValue<string | number>;
  marginBottom?: ResponsiveStyleValue<string | number>;
  marginLeft?: ResponsiveStyleValue<string | number>;
  padding?: ResponsiveStyleValue<string | number>;
  paddingTop?: ResponsiveStyleValue<string | number>;
  paddingRight?: ResponsiveStyleValue<string | number>;
  paddingBottom?: ResponsiveStyleValue<string | number>;
  paddingLeft?: ResponsiveStyleValue<string | number>;
  width?: ResponsiveStyleValue<string | number>;
  height?: ResponsiveStyleValue<string | number>;
  display?: ResponsiveStyleValue<CSS.Property.Display>;
  position?: ResponsiveStyleValue<CSS.Property.Position>;
  top?: ResponsiveStyleValue<string | number>;
  right?: ResponsiveStyleValue<string | number>;
  bottom?: ResponsiveStyleValue<string | number>;
  left?: ResponsiveStyleValue<string | number>;
  flex?: ResponsiveStyleValue<string | number>;
  flexDirection?: ResponsiveStyleValue<CSS.Property.FlexDirection>;
  justifyContent?: ResponsiveStyleValue<CSS.Property.JustifyContent>;
  alignItems?: ResponsiveStyleValue<CSS.Property.AlignItems>;
  border?: ResponsiveStyleValue<string>;
  borderRadius?: ResponsiveStyleValue<string | number>;
  boxShadow?: ResponsiveStyleValue<string>;
  opacity?: ResponsiveStyleValue<number>;
  transform?: ResponsiveStyleValue<string>;
  transition?: ResponsiveStyleValue<string>;
  cursor?: ResponsiveStyleValue<CSS.Property.Cursor>;
  overflow?: ResponsiveStyleValue<CSS.Property.Overflow>;
  zIndex?: ResponsiveStyleValue<number | string>;

  // Custom shorthand properties
  bg?: ResponsiveStyleValue<string>;
  m?: ResponsiveStyleValue<string | number>;
  mt?: ResponsiveStyleValue<string | number>;
  mr?: ResponsiveStyleValue<string | number>;
  mb?: ResponsiveStyleValue<string | number>;
  ml?: ResponsiveStyleValue<string | number>;
  mx?: ResponsiveStyleValue<string | number>;
  my?: ResponsiveStyleValue<string | number>;
  p?: ResponsiveStyleValue<string | number>;
  pt?: ResponsiveStyleValue<string | number>;
  pr?: ResponsiveStyleValue<string | number>;
  pb?: ResponsiveStyleValue<string | number>;
  pl?: ResponsiveStyleValue<string | number>;
  px?: ResponsiveStyleValue<string | number>;
  py?: ResponsiveStyleValue<string | number>;

  // Pseudo selectors
  "&:hover"?: ThemeAwareStyleObject;
  "&:focus"?: ThemeAwareStyleObject;
  "&:active"?: ThemeAwareStyleObject;
  "&:disabled"?: ThemeAwareStyleObject;

  // Media queries
  "@media (min-width: 768px)"?: ThemeAwareStyleObject;
  "@media (min-width: 1024px)"?: ThemeAwareStyleObject;

  // Allow any other CSS property
  [key: string]:
    | ResponsiveStyleValue<string | number | boolean>
    | ThemeAwareStyleObject
    | undefined;
}

// Simple style object for basic use cases
export type SimpleStyleObject = {
  [K in keyof CSSProperties]?: CSSProperties[K];
} & {
  [key: string]: string | number | boolean | undefined;
};

// Export the main type you'll use
export type CustomStyleProps = ThemeAwareStyleObject | SimpleStyleObject;
