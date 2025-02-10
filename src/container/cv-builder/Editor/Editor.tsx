// src/components/Editor/Editor.tsx
import React from "react";
import CVPreview from "../CVPreview/CVPreview";
import { EditorSnapshot } from "../../../types/cv-builder/sidebar/EditorInterfaces";

interface EditorProps {
  snapshot: EditorSnapshot;
  onFieldClick: (field: string) => void;
  selectedField: string | null;
}

const Editor: React.FC<EditorProps> = ({
  snapshot,
  onFieldClick,
  selectedField,
}) => {
  return (
    <div
      style={{
        flex: 1,
        padding: "20px",
        overflow: "auto",
        justifyItems: "center",
      }}
    >
      <CVPreview
        snapshot={snapshot}
        onFieldClick={onFieldClick}
        selectedField={selectedField}
      />
    </div>
  );
};

export default Editor;
