import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Block } from "../../../types/struktogrammTypes";

interface ProcessBlockProps {
  id: string;
  content: string;
}

const ProcessBlock: React.FC<ProcessBlockProps> = ({ id, content }) => {
  const { setNodeRef, isOver } = useDroppable({ id: `process-${id}` });

  return (
    <div className="process-block" data-id={id}>
      <div
        ref={setNodeRef}
        className={`drop-zone ${isOver ? "highlight" : ""}`}
      >
        <p>⬇️ Dropzone für neuen Block</p>
      </div>
      💾 {content}
    </div>
  );
};

export default ProcessBlock;
