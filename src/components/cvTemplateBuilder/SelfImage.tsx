// src/components/CVTemplateBuilder/elements/SelfImage.tsx
import React from "react";

const SelfImage: React.FC = () => {
  return (
    <div
      className="self-image-component"
      style={{ border: "1px solid #ddd", padding: "10px", textAlign: "center" }}
    >
      <img
        src="/path/to/your/image.jpg"
        alt="Self"
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};

export default SelfImage;
