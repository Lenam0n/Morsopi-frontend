import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { BlockType } from "../../../types/struktogrammTypes";
import "./Sidebar.css";

const elements: { type: BlockType; label: string }[] = [
  { type: "process", label: "💾 Verarbeitung" },
  { type: "if", label: "🔀 If-Bedingung" },
  { type: "while", label: "🔁 While-Schleife" },
  { type: "do-while", label: "🔄 Do-While-Schleife" },
  { type: "input", label: "⌨️ Eingabe" },
  { type: "output", label: "📢 Ausgabe" },
  { type: "function", label: "🔣 Funktionsaufruf" },
];

interface SidebarElementProps {
  type: BlockType;
  label: string;
}

const SidebarElement: React.FC<SidebarElementProps> = ({ type, label }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id: type });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="sidebar-element"
    >
      {label}
    </div>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2>📌 Elemente</h2>
      {elements.map((element) => (
        <SidebarElement
          key={element.type}
          type={element.type}
          label={element.label}
        />
      ))}
    </div>
  );
};

export default Sidebar;
