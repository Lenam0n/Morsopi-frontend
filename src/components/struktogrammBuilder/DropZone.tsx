// DropZone.tsx
import React from "react";
import { useDroppable, useDndMonitor } from "@dnd-kit/core";
import { BlockType } from "../../types/struktogrammTypes";

export interface DropZoneProps {
  /** Die eindeutige ID der DropZone (z. B. "function-above-123") */
  zoneId: string;
  /** Callback, der beim Drop aufgerufen wird und den BlockType übergibt */
  onDrop: (blockType: BlockType) => void;
  /** Optionale Kinder (z. B. Platzhaltertext oder bereits abgelegte Elemente) */
  children?: React.ReactNode;
  /** Optionale zusätzliche CSS-Klassen */
  className?: string;
}

const DropZone: React.FC<DropZoneProps> = ({
  zoneId,
  onDrop,
  children,
  className,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id: zoneId });

  useDndMonitor({
    onDragEnd(event) {
      if (event.over && event.over.id === zoneId) {
        // Wir gehen davon aus, dass der Draggable den BlockType in data.current.type speichert.
        const blockType = event.active.data.current?.type as BlockType;
        if (blockType) {
          onDrop(blockType);
        }
      }
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`${className ? className : "drop-zone"} ${
        isOver ? "highlight" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default DropZone;
