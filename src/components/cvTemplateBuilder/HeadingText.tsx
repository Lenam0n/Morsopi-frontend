// src/components/CVTemplateBuilder/elements/HeadingText.tsx
import React from "react";

const HeadingText: React.FC = () => {
  return (
    <div
      className="heading-text-component"
      style={{ border: "1px solid #ddd", padding: "10px" }}
    >
      <h2>Heading</h2>
      <p>This is some sample text content.</p>
    </div>
  );
};

export default HeadingText;
