// src/container/cv-builder/CVBuilderContainer.tsx
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Sidebar from "../../../container/cv-builder/Sidebar/Sidebar";
import Editor from "../../../container/cv-builder/Editor/Editor";
import { useCVContext } from "../../../Utils/context/CvContext";
import { EditorSnapshot } from "../../../types/cv-builder/sidebar/EditorInterfaces";
import { SIDEBAR_HEIGHT } from "../../../config/PageConfig";

const CVPage: React.FC = () => {
  // Hole globale Werte aus dem CVContext
  const { selectedTemplate, historyState, dispatchHistory } = useCVContext();

  // Falls kein Template ausgewählt wurde, leite zur Template-Auswahl weiter.
  if (!selectedTemplate) {
    return <Navigate to="/template-selection" replace />;
  }

  // Lokaler State für das aktuell editierte Textfeld
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedField, setSelectedField] = useState<string | null>(null);

  // Der aktuelle Snapshot wird aus dem globalen History-State bezogen.
  const currentSnapshot: EditorSnapshot =
    historyState.snapshots[historyState.currentIndex];

  return (
    <div
      style={{
        display: "flex",
        height: "calc(-" + SIDEBAR_HEIGHT + "px + 100vh)",
      }}
    >
      <Sidebar
        dispatch={dispatchHistory}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        currentSnapshot={currentSnapshot}
        historyState={historyState}
      />
      <Editor
        snapshot={currentSnapshot}
        onFieldClick={(field) => setSelectedField(field)}
        selectedField={selectedField}
      />
    </div>
  );
};

export default CVPage;
