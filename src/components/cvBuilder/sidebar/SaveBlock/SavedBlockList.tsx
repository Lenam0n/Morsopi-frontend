// src/components/cvBuilder/sidebarControls/SavedBlocksList.tsx
import React from "react";
import { SavedBlock } from "../../../../types/cv-builder/sidebar/EditorInterfaces";
import { HRLine } from "../../../generall/Line/HRLine";

interface SavedBlocksListProps {
  dispatch: React.Dispatch<any>;
  savedBlocks: SavedBlock[];
  selectedField: string | null;
}

const SavedBlocksList: React.FC<SavedBlocksListProps> = ({
  dispatch,
  savedBlocks,
  selectedField,
}) => {
  const handleReplace = (blockId: string) => {
    if (!selectedField) {
      alert("Please select a field to replace.");
      return;
    }
    dispatch({
      type: "REPLACE_BLOCK",
      savedBlockId: blockId,
      targetField: selectedField,
    });
  };

  const handleMoveUp = (blockId: string) => {
    dispatch({ type: "MOVE_BLOCK_UP", savedBlockId: blockId });
  };

  const handleMoveDown = (blockId: string) => {
    dispatch({ type: "MOVE_BLOCK_DOWN", savedBlockId: blockId });
  };

  return (
    <div
      style={{
        marginBottom: "20px",
        border: "1px solid #aaa",
        padding: "10px",
      }}
    >
      <h4>Bookmarked Blocks</h4>
      <HRLine styleClass={"Heading"} />
      {savedBlocks.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {savedBlocks.map((block) => (
            <li
              key={block.id}
              style={{
                marginBottom: "10px",
                border: "1px solid #ccc",
                padding: "5px",
              }}
            >
              <strong>{block.header}</strong>
              <p style={{ margin: "5px 0" }}>{block.content}</p>
              <div>
                <button
                  onClick={() => handleReplace(block.id)}
                  disabled={!selectedField}
                >
                  Replace
                </button>
                <button
                  onClick={() => handleMoveUp(block.id)}
                  style={{ marginLeft: "5px" }}
                >
                  Move Up
                </button>
                <button
                  onClick={() => handleMoveDown(block.id)}
                  style={{ marginLeft: "5px" }}
                >
                  Move Down
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Wenn keine Blocks vorhanden sind, bleibt der Bereich leer */}
    </div>
  );
};

export default SavedBlocksList;
