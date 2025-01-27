import React from "react";
import { useDroppable } from "@dnd-kit/core";

const InitialDropzone: React.FC = () => {
  const { setNodeRef, isOver } = useDroppable({ id: "editor-dropzone" });

  return (
    <div
      ref={setNodeRef}
      className={`initial-dropzone ${isOver ? "highlight" : ""}`}
    >
      <p>⬇️ Ziehe das erste Element hierher ⬇️</p>
    </div>
  );
};

export default InitialDropzone;
