// src/pages/TemplatePage.tsx
import React from "react";
import TemplateSelector from "../../../container/cv-builder/TemplateSelector/TemplateSelector";
import { Helmet } from "react-helmet-async";

const TemplatePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Lebenslauf Builder</title>
        <meta name="description" content="Erstelle deinen Lebenslauf" />
      </Helmet>
      <>
        <h1>Wähle dein Lebenslauf‑Template</h1>
        <TemplateSelector />
      </>
    </>
  );
};

export default TemplatePage;
