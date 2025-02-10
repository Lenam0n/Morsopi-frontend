// src/pages/CVTemplateBuilderPage.tsx
import React, { useState, JSX } from "react";
import CVTemplateBuilderSidebar from "../../container/cvTemplateBuilder/Sidebar/CVTemplateBuilderSidebar";
import TemplatePreview from "../../container/cvTemplateBuilder/TemplatePreview";
import "./CVTemplateBuilder.css";

const CVTemplateBuilderPage: React.FC = () => {
  // Layout-Parameter
  const [columns, setColumns] = useState<number>(2);
  const [topOffset, setTopOffset] = useState<number>(10);
  const [elementSpacing, setElementSpacing] = useState<number>(10);
  const [sideMargin, setSideMargin] = useState<number>(10);
  const [columnSpacing, setColumnSpacing] = useState<number>(20); // Abstand zwischen den Spalten
  const [blocksPerColumn, setBlocksPerColumn] = useState<number>(3); // Maximale Anzahl der Blöcke pro Spalte

  // Liste der hinzugefügten Elemente (JSX-Elemente)
  const [elements, setElements] = useState<JSX.Element[]>([]);

  const handleAddElement = (element: JSX.Element) => {
    setElements([...elements, element]);
  };

  return (
    <>
      <h1>CV Template Builder</h1>
      <div className="cv-builder-page">
        <CVTemplateBuilderSidebar
          columns={columns}
          setColumns={setColumns}
          topOffset={topOffset}
          setTopOffset={setTopOffset}
          elementSpacing={elementSpacing}
          setElementSpacing={setElementSpacing}
          sideMargin={sideMargin}
          setSideMargin={setSideMargin}
          columnSpacing={columnSpacing}
          setColumnSpacing={setColumnSpacing}
          blocksPerColumn={blocksPerColumn}
          setBlocksPerColumn={setBlocksPerColumn}
          onAddElement={handleAddElement}
        />
        <TemplatePreview
          columns={columns}
          topOffset={topOffset}
          elementSpacing={elementSpacing}
          sideMargin={sideMargin}
          columnSpacing={columnSpacing}
          blocksPerColumn={blocksPerColumn}
          elements={elements}
        />
      </div>
    </>
  );
};

export default CVTemplateBuilderPage;
