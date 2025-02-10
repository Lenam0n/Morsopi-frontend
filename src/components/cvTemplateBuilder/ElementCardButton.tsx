// src/components/CVTemplateBuilder/ElementCardButton.tsx
import React from "react";
import { IconType } from "react-icons";
import "./ElementCardButton.css";

export interface ElementCardButtonProps {
  icon: IconType;
  onClick: () => void;
  title?: string;
  disabled?: boolean;
  className?: string;
}

const ElementCardButton: React.FC<ElementCardButtonProps> = ({
  icon: Icon,
  onClick,
  title,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`cv-builder-icon-button ${className}`}
    >
      <Icon />
    </button>
  );
};

export default ElementCardButton;
