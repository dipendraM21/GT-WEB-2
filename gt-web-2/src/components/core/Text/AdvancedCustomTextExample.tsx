import React from "react";
import { AdvancedCustomText } from "./AdvancedCustomText";

/**
 * Example usage of AdvancedCustomText component
 * Demonstrates all the advanced features and props
 */
export const AdvancedCustomTextExample: React.FC = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Advanced CustomText Component Examples</h2>

      {/* Variants */}
      <section style={{ marginBottom: "2rem" }}>
        <h3>Text Variants</h3>
        <AdvancedCustomText variant="heading-1">
          Heading 1 - Main Title
        </AdvancedCustomText>
        <AdvancedCustomText variant="heading-2">
          Heading 2 - Subtitle
        </AdvancedCustomText>
        <AdvancedCustomText variant="heading-3">
          Heading 3 - Section Title
        </AdvancedCustomText>
        <AdvancedCustomText variant="body">
          Body text - Regular paragraph content
        </AdvancedCustomText>
        <AdvancedCustomText variant="caption">
          Caption text - Small descriptive text
        </AdvancedCustomText>
        <AdvancedCustomText variant="label">
          Label text - Form labels and small text
        </AdvancedCustomText>
        <AdvancedCustomText variant="button">
          Button text - Text for buttons
        </AdvancedCustomText>
      </section>

      {/* Colors */}
      <section style={{ marginBottom: "2rem" }}>
        <h3>Color Variants</h3>
        <AdvancedCustomText color="primary">
          Primary color text
        </AdvancedCustomText>
        <AdvancedCustomText color="secondary">
          Secondary color text
        </AdvancedCustomText>
        <AdvancedCustomText color="success">
          Success color text
        </AdvancedCustomText>
        <AdvancedCustomText color="warning">
          Warning color text
        </AdvancedCustomText>
        <AdvancedCustomText color="error">Error color text</AdvancedCustomText>
        <AdvancedCustomText color="muted">Muted color text</AdvancedCustomText>
        <AdvancedCustomText
          color="white"
          style={{ backgroundColor: "#333", padding: "4px" }}
        >
          White color text
        </AdvancedCustomText>
        <AdvancedCustomText color="black">Black color text</AdvancedCustomText>
        <AdvancedCustomText color="#ff6b6b">
          Custom hex color
        </AdvancedCustomText>
      </section>

      {/* Sizes */}
      <section style={{ marginBottom: "2rem" }}>
        <h3>Size Variants</h3>
        <AdvancedCustomText size="xs">Extra small text (xs)</AdvancedCustomText>
        <AdvancedCustomText size="sm">Small text (sm)</AdvancedCustomText>
        <AdvancedCustomText size="md">Medium text (md)</AdvancedCustomText>
        <AdvancedCustomText size="lg">Large text (lg)</AdvancedCustomText>
        <AdvancedCustomText size="xl">Extra large text (xl)</AdvancedCustomText>
        <AdvancedCustomText size="2xl">2XL text (2xl)</AdvancedCustomText>
      </section>

      {/* Weights */}
      <section style={{ marginBottom: "2rem" }}>
        <h3>Font Weight Variants</h3>
        <AdvancedCustomText weight="light">
          Light weight text
        </AdvancedCustomText>
        <AdvancedCustomText weight="normal">
          Normal weight text
        </AdvancedCustomText>
        <AdvancedCustomText weight="medium">
          Medium weight text
        </AdvancedCustomText>
        <AdvancedCustomText weight="semibold">
          Semibold weight text
        </AdvancedCustomText>
        <AdvancedCustomText weight="bold">Bold weight text</AdvancedCustomText>
      </section>

      {/* Alignment */}
      <section style={{ marginBottom: "2rem" }}>
        <h3>Text Alignment</h3>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <AdvancedCustomText align="left">
            Left aligned text
          </AdvancedCustomText>
        </div>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <AdvancedCustomText align="center">
            Center aligned text
          </AdvancedCustomText>
        </div>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <AdvancedCustomText align="right">
            Right aligned text
          </AdvancedCustomText>
        </div>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <AdvancedCustomText align="justify">
            Justified text that spreads across the full width of the container
          </AdvancedCustomText>
        </div>
      </section>

      {/* Truncate */}
      <section style={{ marginBottom: "2rem" }}>
        <h3>Text Truncation</h3>
        <div
          style={{ width: "200px", border: "1px solid #ccc", padding: "10px" }}
        >
          <AdvancedCustomText truncate>
            This is a very long text that will be truncated with ellipsis when
            it exceeds the container width
          </AdvancedCustomText>
        </div>
      </section>

      {/* Element Types */}
      <section style={{ marginBottom: "2rem" }}>
        <h3>Different Element Types</h3>
        <AdvancedCustomText as="h1" variant="heading-1">
          Rendered as H1
        </AdvancedCustomText>
        <AdvancedCustomText as="h2" variant="heading-2">
          Rendered as H2
        </AdvancedCustomText>
        <AdvancedCustomText as="p" variant="body">
          Rendered as paragraph
        </AdvancedCustomText>
        <AdvancedCustomText
          as="a"
          href="#"
          color="primary"
          style={{ textDecoration: "underline" }}
        >
          Rendered as link
        </AdvancedCustomText>
        <AdvancedCustomText
          as="button"
          onClick={() => alert("Button clicked!")}
          variant="button"
        >
          Rendered as button
        </AdvancedCustomText>
      </section>

      {/* Combined Props */}
      <section style={{ marginBottom: "2rem" }}>
        <h3>Combined Props Example</h3>
        <AdvancedCustomText
          as="h2"
          variant="heading-2"
          color="primary"
          size="xl"
          weight="bold"
          align="center"
          className="custom-heading"
          style={{
            backgroundColor: "#f8f9fa",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        >
          Combined Styling Example
        </AdvancedCustomText>

        <AdvancedCustomText
          variant="body"
          color="secondary"
          size="lg"
          weight="medium"
          align="justify"
          style={{ lineHeight: "1.8" }}
        >
          This is a paragraph with combined styling properties. It demonstrates
          how you can use multiple props together to create rich, styled text
          components without any external dependencies like Theme UI.
        </AdvancedCustomText>
      </section>
    </div>
  );
};

export default AdvancedCustomTextExample;
