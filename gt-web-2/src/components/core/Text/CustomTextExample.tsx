import React from "react";
import { CustomText } from "./CustomText";

/**
 * Example usage of CustomText component
 * Demonstrates all the props: as, style, className, color, variant
 */
export const CustomTextExample: React.FC = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>CustomText Component Examples</h2>

      {/* Basic usage */}
      <CustomText>Basic text without any props</CustomText>

      {/* With as prop to render as different element */}
      <CustomText
        as="h1"
        style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}
      >
        Heading rendered as h1
      </CustomText>

      {/* With className */}
      <CustomText className="custom-class" style={{ color: "blue" }}>
        Text with custom className and blue color
      </CustomText>

      {/* With color prop */}
      <CustomText color="red" style={{ fontSize: "1.2rem" }}>
        Red colored text with larger font size
      </CustomText>

      {/* With style prop for complex styling */}
      <CustomText
        style={{
          backgroundColor: "#f0f0f0",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      >
        Text with complex styling via style prop
      </CustomText>

      {/* With variant */}
      <CustomText
        variant="heading"
        style={{ fontSize: "1.5rem", fontWeight: "600" }}
      >
        Text with variant prop
      </CustomText>

      {/* As paragraph with multiple props */}
      <CustomText
        as="p"
        color="#333"
        className="paragraph-text"
        style={{
          lineHeight: "1.6",
          marginBottom: "1rem",
          textAlign: "justify",
        }}
      >
        This is a paragraph rendered with the CustomText component. It
        demonstrates how you can use the &apos;as&apos; prop to render as
        different HTML elements, apply custom styling with the &apos;style&apos;
        prop, add CSS classes with &apos;className&apos;, and set colors with
        the &apos;color&apos; prop.
      </CustomText>

      {/* As link */}
      <CustomText
        as="a"
        href="https://example.com"
        style={{
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        This renders as a link
      </CustomText>

      {/* With additional props */}
      <CustomText
        as="div"
        onClick={() => alert("Clicked!")}
        style={{
          backgroundColor: "lightblue",
          padding: "8px",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      >
        Clickable text with onClick handler
      </CustomText>
    </div>
  );
};

export default CustomTextExample;
