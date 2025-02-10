// src/components/CVTemplateBuilder/TemplatePreview.tsx
import React, { JSX } from "react";
import "./TemplatePreview.css";
import { A4_ASPECT_RATIO } from "../../config/CVConfig";

interface TemplatePreviewProps {
  columns: number;
  topOffset: number;
  elementSpacing: number;
  sideMargin: number;
  columnSpacing: number;
  blocksPerColumn: number;
  elements: JSX.Element[];
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  columns,
  topOffset,
  elementSpacing,
  sideMargin,
  columnSpacing,
  blocksPerColumn,
  elements,
}) => {
  // Verwende den Padding-Top-Trick, um das A4-Verhältnis beizubehalten
  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    paddingTop: `${A4_ASPECT_RATIO * 100}%`,
    margin: `${topOffset}px ${sideMargin}px 0 ${sideMargin}px`,
    border: "1px solid #ccc",
    padding: "10px",
    boxSizing: "border-box",
  };

  // Der innere Container wird absolut positioniert, um den gesamten Platz auszufüllen.
  const innerContainerStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    columnGap: `${columnSpacing}px`,
    rowGap: `${elementSpacing}px`,
    padding: "10px",
    boxSizing: "border-box",
  };

  return (
    <div className="cv-builder-template-preview" style={containerStyle}>
      <div style={innerContainerStyle}>
        {elements.map((el, index) => (
          <div key={index} className="cv-builder-preview-element">
            {el}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatePreview;
