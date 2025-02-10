// src/Sidebar/Sidebar.tsx
import React from "react";
import {
  EditorHistoryState,
  EditorSnapshot,
} from "../../../types/cv-builder/sidebar/EditorInterfaces";
import SidebarControls from "./Controls/SidebarControls";
import HistoryComponent from "../../../components/cvBuilder/sidebar/History/HistoryComponent";
import SavedBlocksList from "../../../components/cvBuilder/sidebar/SaveBlock/SavedBlockList";

interface SidebarProps {
  dispatch: React.Dispatch<any>;
  selectedField: string | null;
  setSelectedField: (field: string | null) => void;
  currentSnapshot: EditorSnapshot;
  historyState: EditorHistoryState;
}

const Sidebar: React.FC<SidebarProps> = ({
  dispatch,
  selectedField,
  setSelectedField,
  currentSnapshot,
  historyState,
}) => {
  return (
    <div
      style={{
        width: "300px",
        borderRight: "1px solid #ccc",
        padding: "10px",
        overflowY: "auto",
      }}
    >
      <div id="controls-cv">
        <SidebarControls
          dispatch={dispatch}
          selectedField={selectedField}
          currentSnapshot={currentSnapshot}
          historyState={historyState}
        />
      </div>
      <div id="history-cv">
        {/* History */}
        <HistoryComponent historyState={historyState} dispatch={dispatch} />
      </div>
      <div id="saved-blocks-cv">
        {/* Bereich für gespeicherte Blöcke */}
        <SavedBlocksList
          dispatch={dispatch}
          savedBlocks={currentSnapshot.savedBlocks}
          selectedField={selectedField}
        />
      </div>
    </div>
  );
};

export default Sidebar;
