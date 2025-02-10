// src/container/cvTemplateBuilder/CVTemplateBuilderSidebar.tsx
import React, { JSX } from "react";
import LayoutControls from "../LayoutControl";
import ElementSelector from "../ElementSelector";
import "./CVTemplateBuilderSidebar.css";

interface CVTemplateBuilderSidebarProps {
  columns: number;
  setColumns: (n: number) => void;
  topOffset: number;
  setTopOffset: (n: number) => void;
  elementSpacing: number;
  setElementSpacing: (n: number) => void;
  sideMargin: number;
  setSideMargin: (n: number) => void;
  columnSpacing: number;
  setColumnSpacing: (n: number) => void;
  blocksPerColumn: number;
  setBlocksPerColumn: (n: number) => void;
  onAddElement: (element: JSX.Element) => void;
}

const CVTemplateBuilderSidebar: React.FC<CVTemplateBuilderSidebarProps> = ({
  columns,
  setColumns,
  topOffset,
  setTopOffset,
  elementSpacing,
  setElementSpacing,
  sideMargin,
  setSideMargin,
  columnSpacing,
  setColumnSpacing,
  blocksPerColumn,
  setBlocksPerColumn,
  onAddElement,
}) => {
  return (
    <div className="cv-builder-sidebar">
      <div className="cv-builder-sidebar-controls">
        <LayoutControls
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
        />
      </div>
      <div className="cv-builder-sidebar-elements">
        <ElementSelector onAddElement={onAddElement} />
      </div>
    </div>
  );
};

export default CVTemplateBuilderSidebar;
