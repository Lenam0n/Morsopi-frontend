import React from "react";
import { EditorHistoryState } from "../../../../types/cv-builder/sidebar/EditorInterfaces";

interface UndoRedoControlsProps {
  dispatch: React.Dispatch<any>;
  historyState: EditorHistoryState;
}

const UndoRedoControls: React.FC<UndoRedoControlsProps> = ({
  dispatch,
  historyState,
}) => {
  const canUndo = historyState.currentIndex > 0;
  const canRedo = historyState.currentIndex < historyState.snapshots.length - 1;

  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={() => dispatch({ type: "UNDO" })} disabled={!canUndo}>
        Undo
      </button>
      <button
        onClick={() => dispatch({ type: "REDO" })}
        disabled={!canRedo}
        style={{ marginLeft: "10px" }}
      >
        Redo
      </button>
    </div>
  );
};

export default UndoRedoControls;
