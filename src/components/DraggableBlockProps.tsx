import React from "react";
import { useDraggable } from "@dnd-kit/core";

interface DraggableBlockProps {
  id: string;
  content: string;
}

const DraggableBlock: React.FC<DraggableBlockProps> = ({ id, content }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

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
