// src/components/TemplateSelector.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCVContext, TemplateInfo } from "../../../Utils/context/CvContext";
import Templates from "../Templates/TemplateIndex"; // Kombinierter Export
import { A4_ASPECT_RATIO } from "../../../config/CVConfig";

// Definiere ein lokales Interface (optional, falls du weitere Felder brauchst)
export interface Template {
  id: string;
  name: string;
  previewKey: keyof typeof Templates.Preview;
}

// Erzeuge das Array dynamisch aus Templates.Preview (über den "All"-Teil)
const previewEntries: Template[] = Object.entries(Templates.Preview).map(
  ([key]) => ({
    id: key.toLowerCase(), // z.B. "template1"
    name: key.replace(/([A-Z])/g, " $1").trim(),
    previewKey: key as keyof typeof Templates.Preview,
  })
);

const TemplateSelector: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedTemplate } = useCVContext();

  const handleTemplateSelect = (template: Template) => {
    // Speichere das gesamte TemplateInfo-Objekt im Kontext
    const templateInfo: TemplateInfo = {
      id: template.id,
      name: template.name,
      previewKey: template.previewKey as string,
    };
    setSelectedTemplate(templateInfo);
    navigate("/cv-builder");
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px",
      }}
    >
      {previewEntries.map((template) => (
        <div
          key={template.id}
          onClick={() => handleTemplateSelect(template)}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            cursor: "pointer",
            borderRadius: "6px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
          }}
        >
          {/* Padding-Top-Trick, um das A4-Verhältnis beizubehalten */}
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: `${A4_ASPECT_RATIO * 100}%`,
              overflow: "hidden",
              border: "1px solid #ddd",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }}
            >
              {Templates.Preview[template.previewKey]}
            </div>
          </div>
          <h3 style={{ textAlign: "center", margin: "0" }}>{template.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default TemplateSelector;
