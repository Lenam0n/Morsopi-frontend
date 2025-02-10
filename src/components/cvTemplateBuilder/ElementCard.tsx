// src/components/CVTemplateBuilder/ElementCard.tsx
import React, { JSX } from "react";
import ElementCardButton from "./ElementCardButton";
import { FaPlus } from "react-icons/fa"; // Beispiel-Icon
import "./ElementCard.css";

interface ElementCardProps {
  title: string;
  preview: JSX.Element;
  onAdd: () => void;
}

const ElementCard: React.FC<ElementCardProps> = ({ title, preview, onAdd }) => {
  return (
    <div className="cv-builder-element-card">
      <div className="cv-builder-element-card-header">
        <h3 className="cv-builder-element-card-title">{title}</h3>
        <ElementCardButton
          icon={FaPlus}
          onClick={onAdd}
          title="Add element"
          className="cv-builder-element-card-add-button"
        />
      </div>
      <div className="cv-builder-element-card-preview">{preview}</div>
    </div>
  );
};

export default ElementCard;
