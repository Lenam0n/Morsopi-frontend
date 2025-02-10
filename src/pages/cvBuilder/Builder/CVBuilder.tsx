// src/pages/CVBuilder.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useCVContext } from "../../../Utils/context/CvContext";
import CVPage from "../Page/CVPage";

export const CVBuilder: React.FC = () => {
  const { selectedTemplate } = useCVContext();

  // Falls kein Template ausgewählt wurde, leite zur Template-Auswahlseite weiter
  if (!selectedTemplate) {
    return <Navigate to="/template-selection/cv" replace />;
  }

  // Andernfalls rendere den Editor
  return <CVPage />;
};
