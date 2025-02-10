// src/components/TextField.tsx
import React, { useState, useEffect } from "react";
import { useCVContext } from "../../Utils/context/CvContext";

interface TextFieldProps {
  label: string; // Dient auch als Schlüssel im Context
  subheading?: string; // Optionaler Untertitel (wird in h3 gerendert)
}

const TextField: React.FC<TextFieldProps> = ({ label, subheading }) => {
  const { cvTexts, updateCVText } = useCVContext();
  const [text, setText] = useState(cvTexts[label] || "");

  // Aktualisiere den lokalen State, falls sich der gespeicherte Text im Context ändert
  useEffect(() => {
    setText(cvTexts[label] || "");
  }, [cvTexts, label]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    updateCVText(label, newText);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <h2>{label}</h2>
      {subheading && <h3>{subheading}</h3>}
      <textarea
        value={text}
        onChange={handleChange}
        style={{
          width: "100%",
          minHeight: "100px",
          resize: "vertical",
        }}
      />
    </div>
  );
};

export default TextField;
