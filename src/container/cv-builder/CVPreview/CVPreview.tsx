// src/components/CVPreview/CVPreview.tsx
import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import { useCVContext } from "../../../Utils/context/CvContext";
import { EditorSnapshot } from "../../../types/cv-builder/sidebar/EditorInterfaces";
import Templates from "../Templates/TemplateIndex";
import {
  calculatePreviewDimensions,
  getTemplateFullMapping,
} from "../../../Utils/helper/CV/CVPreviewUtils";
import { MAX_PREVIEW_HEIGHT } from "../../../config/CVConfig";

const { Full } = Templates;
export const templateFullMapping: { [key: string]: keyof typeof Full } =
  getTemplateFullMapping();

interface CVPreviewProps {
  snapshot: EditorSnapshot;
  onFieldClick: (field: string) => void;
  selectedField: string | null;
}

const CVPreview: React.FC<CVPreviewProps> = ({
  snapshot,
  onFieldClick,
  selectedField,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const { selectedTemplate } = useCVContext();
  // Verwende selectedTemplate.id als Schlüssel (in Kleinbuchstaben) aus dem Kontext
  const fullKey = selectedTemplate
    ? templateFullMapping[selectedTemplate.id.toLowerCase()]
    : undefined;
  const TemplateComponent = fullKey ? Full[fullKey] : undefined;

  // Berechnet die Dimensionen anhand der Breite des Parent-Elements mithilfe der Utility-Funktion.
  const calculateDimensions = () => {
    if (containerRef.current) {
      const parentWidth =
        containerRef.current.parentElement?.clientWidth ||
        containerRef.current.clientWidth;
      const newDimensions = calculatePreviewDimensions(
        parentWidth,
        MAX_PREVIEW_HEIGHT
      );
      setDimensions(newDimensions);
    }
  };

  useLayoutEffect(() => {
    calculateDimensions();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeHandler = () => calculateDimensions();
    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(() => resizeHandler());
      if (containerRef.current.parentElement) {
        observer.observe(containerRef.current.parentElement);
      } else {
        observer.observe(containerRef.current);
      }
      return () => {
        observer.disconnect();
      };
    } else {
      window.addEventListener("resize", resizeHandler);
      return () => {
        window.removeEventListener("resize", resizeHandler);
      };
    }
  }, []);

  const outerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    maxWidth:
      dimensions.height === MAX_PREVIEW_HEIGHT
        ? `${dimensions.width}px`
        : "100%",
    height: `${dimensions.height}px`,
    overflow: "hidden",
    border: "1px solid #000",
    boxSizing: "border-box",
  };

  const innerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
  };

  return (
    <div ref={containerRef} style={outerStyle}>
      {TemplateComponent ? (
        <div style={innerStyle}>
          <TemplateComponent
            snapshot={snapshot}
            onFieldClick={onFieldClick}
            selectedField={selectedField}
          />
        </div>
      ) : (
        <p>No template selected.</p>
      )}
    </div>
  );
};

export default CVPreview;
