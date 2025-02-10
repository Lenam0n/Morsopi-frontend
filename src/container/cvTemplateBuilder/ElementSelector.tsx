// src/container/cvTemplateBuilder/ElementSelector.tsx
import React, { JSX } from "react";
import ElementCard from "../../components/cvTemplateBuilder/ElementCard";
import SelfImage from "../../components/cvTemplateBuilder/SelfImage";
import HeadingText from "../../components/cvTemplateBuilder/HeadingText";
import "./ElementSelector.css";

interface ElementSelectorProps {
  onAddElement: (element: JSX.Element) => void;
}

const ElementSelector: React.FC<ElementSelectorProps> = ({ onAddElement }) => {
  const elements = [
    {
      id: "selfImage",
      title: "Self Image",
      preview: <SelfImage />,
    },
    {
      id: "headingText",
      title: "Heading & Text",
      preview: <HeadingText />,
    },
  ];

  return (
    <div className="cv-builder-element-selector">
      <h2 className="cv-builder-element-selector-title">
        Select CV Element to Add
      </h2>
      <div className="cv-builder-element-card-container">
        {elements.map((el) => (
          <ElementCard
            key={el.id}
            title={el.title}
            preview={el.preview}
            onAdd={() => onAddElement(el.preview)}
          />
        ))}
      </div>
    </div>
  );
};

export default ElementSelector;
