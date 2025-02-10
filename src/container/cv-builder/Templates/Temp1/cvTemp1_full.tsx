// src/components/TemplatePreviews/cvTemp1_full.tsx
import React from "react";
import { EditorSnapshot } from "../../../../types/cv-builder/sidebar/EditorInterfaces";
import "./Temp1.css";

interface CvTemp1FullProps {
  snapshot: EditorSnapshot;
  onFieldClick: (field: string) => void;
  selectedField: string | null;
}

export const CvTemp1Full: React.FC<CvTemp1FullProps> = ({
  snapshot,
  onFieldClick,
  selectedField,
}) => {
  const {
    textFields,
    fontFamily,
    fontSize,
    headingFontFamily,
    headingFontSize,
  } = snapshot;
  return (
    <div className="template-one-full" style={{ fontFamily, fontSize }}>
      <div
        className={`template-one-header ${
          selectedField === "Header" ? "active" : ""
        }`}
        onClick={() => onFieldClick("Header")}
        style={{ fontFamily: headingFontFamily, fontSize: headingFontSize }}
      >
        {textFields["Header"]}
      </div>
      <div
        className={`template-one-subheader ${
          selectedField === "Subheader" ? "active" : ""
        }`}
        onClick={() => onFieldClick("Subheader")}
        style={{ fontFamily: headingFontFamily, fontSize: headingFontSize }}
      >
        {textFields["Subheader"]}
      </div>
      <div
        className={`template-one-content ${
          selectedField === "Content" ? "active" : ""
        }`}
        onClick={() => onFieldClick("Content")}
      >
        {textFields["Content"]}
      </div>
    </div>
  );
};
