// src/components/cvBuilder/sidebar/Controls/ControlsContainer.tsx
import React from "react";
import UndoRedoControls from "../../../../components/cvBuilder/sidebar/Controls/UndoRedoControls";
import TextEditorControl from "../../../../components/cvBuilder/sidebar/Controls/TextEditorControl";
import ClearButton from "../../../../components/cvBuilder/sidebar/Controls/ClearButton";
import FontDropdown from "../../../../components/cvBuilder/sidebar/Controls/FontDropdown";
import FontSizeControl from "../../../../components/cvBuilder/sidebar/Controls/FontSizeControl";
import HeadingFontDropdown from "../../../../components/cvBuilder/sidebar/Controls/HeadingFontDropdown";
import HeadingFontSizeControl from "../../../../components/cvBuilder/sidebar/Controls/HeadingSizeControl";
import BookmarkButtonBar from "../BookmarkButtonBar/BookmarkButtonBar";
import {
  EditorHistoryState,
  EditorSnapshot,
} from "../../../../types/cv-builder/sidebar/EditorInterfaces";

interface ControlsContainerProps {
  dispatch: React.Dispatch<any>;
  selectedField: string | null;
  currentSnapshot: EditorSnapshot;
  historyState: EditorHistoryState;
}

const SidebarControls: React.FC<ControlsContainerProps> = ({
  dispatch,
  selectedField,
  currentSnapshot,
  historyState,
}) => {
  const isBookmarked = selectedField
    ? currentSnapshot.savedBlocks.some(
        (block) => block.header === selectedField
      )
    : false;

  return (
    <div className="cv-controls-container">
      <h2 className="cv-controls-title">Controls</h2>
      {/* Basis-Steuerungen */}
      <UndoRedoControls dispatch={dispatch} historyState={historyState} />
      {selectedField && (
        <TextEditorControl
          field={selectedField}
          text={currentSnapshot.textFields[selectedField]}
          dispatch={dispatch}
        />
      )}
      <ClearButton dispatch={dispatch} />
      <FontDropdown dispatch={dispatch} />
      <FontSizeControl dispatch={dispatch} />

      {/* Überschriften-Steuerungen */}
      <HeadingFontDropdown dispatch={dispatch} />
      <HeadingFontSizeControl dispatch={dispatch} />

      {/* Bookmark-Buttons */}
      {selectedField && (
        <BookmarkButtonBar
          isBookmarked={isBookmarked}
          onClear={() =>
            dispatch({ type: "UPDATE_TEXT", field: selectedField, text: "" })
          }
          onAdd={() => {
            const newBlock = {
              id: Date.now().toString(),
              header: selectedField,
              content: currentSnapshot.textFields[selectedField],
            };
            dispatch({ type: "SAVE_BLOCK", block: newBlock });
          }}
          onRemove={() =>
            dispatch({ type: "REMOVE_BOOKMARK", header: selectedField })
          }
        />
      )}
    </div>
  );
};

export default SidebarControls;
