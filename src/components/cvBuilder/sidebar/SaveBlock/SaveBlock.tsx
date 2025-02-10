// src/components/cvBuilder/sidebarControls/SaveBlock.tsx
import React, { useState } from "react";
import {
  EditorSnapshot,
  SavedBlock,
} from "../../../../types/cv-builder/sidebar/EditorInterfaces";

interface SaveBlockProps {
  dispatch: React.Dispatch<any>;
  currentSnapshot: EditorSnapshot;
}

const SaveBlock: React.FC<SaveBlockProps> = ({
  dispatch,
  currentSnapshot,
}) => {
  const [header, setHeader] = useState("");
  const [contentField, setContentField] = useState("");

  const handleSave = () => {
    // Falls entweder Header oder Inhalt leer ist, nichts tun
    if (!header.trim() || !contentField.trim()) return;
    const newBlock: SavedBlock = {
      id: Date.now().toString(),
      header,
      content: contentField,
    };
    dispatch({ type: "SAVE_BLOCK", block: newBlock });
    setHeader("");
    setContentField("");
  };

  return (
    <div
      style={{
        marginBottom: "20px",
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      <h4>Save Block</h4>
      <input
        type="text"
        placeholder="Block Header"
        value={header}
        onChange={(e) => setHeader(e.target.value)}
        style={{ width: "100%", marginBottom: "5px" }}
      />
      <textarea
        placeholder="Block Content"
        value={contentField}
        onChange={(e) => setContentField(e.target.value)}
        style={{ width: "100%", minHeight: "60px", marginBottom: "5px" }}
      />
      <button onClick={handleSave}>Save Block</button>
    </div>
  );
};

export default SaveBlock;
