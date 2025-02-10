import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { BlockType } from "../../../types/struktogrammTypes";
import "./Sidebar.css";
import SvgExportButton from "../Buttons/SvgExportButton";
import { useStruktogramm } from "../../../Utils/context/StruktogrammContext";

interface SidebarElementProps {
  type: BlockType;
  label: string;
}

const SidebarElement: React.FC<SidebarElementProps> = ({ type, label }) => {
  // Wichtig: Mit "data: { type }" wird der Blocktyp an das Draggable angehängt.
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: type,
    data: { type },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="sidebar-element"
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
      }}
    >
      {label}
    </div>
  );
};

const Sidebar: React.FC = () => {
  const elements: { type: BlockType; label: string }[] = [
    { type: "process", label: "💾 Verarbeitung" },
    { type: "if", label: "🔀 If-Bedingung" },
    { type: "while", label: "🔁 While-Schleife" },
    { type: "do-while", label: "🔄 Do-While-Schleife" },
    { type: "input", label: "⌨️ Eingabe" },
    { type: "output", label: "📢 Ausgabe" },
    { type: "function", label: "🔣 Funktionsaufruf" },
  ];

  const { undo, redo } = useStruktogramm();
  return (
    <div className="sidebar">
      <div id="sidebar-elements">
        <h2>📌 Elemente</h2>
        {elements.map((element) => (
          <SidebarElement
            key={element.type}
            type={element.type}
            label={element.label}
          />
        ))}
      </div>
      <div id="sidebar-controls">
        <h2>🔧 Controls</h2>
        <SvgExportButton width={1200} height={800} />
        <div>
          <button onClick={undo}>🔙 Undo</button>
          <button onClick={redo}>🔜 Redo</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
