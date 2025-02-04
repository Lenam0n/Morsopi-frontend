import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { BlockType } from "../types/struktogrammTypes";

interface DraggableBlockProps {
  id: string;
  content: string;
  /** Der Blocktyp, der beim Droppen verwendet wird */
  type: BlockType;
}

const DraggableBlock: React.FC<DraggableBlockProps> = ({
  id,
  content,
  type,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { type }, // Hier wird der Blocktyp an das Draggable angehängt.
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : "none",
        padding: "10px",
        border: "1px solid black",
        cursor: "grab",
      }}
    >
      {content}
    </div>
  );
};

export default DraggableBlock;
