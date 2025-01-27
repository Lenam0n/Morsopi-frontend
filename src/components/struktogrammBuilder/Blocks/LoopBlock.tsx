import React, { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import "./LoopBlock.css";

interface LoopBlockProps {
  id: string;
  type: "while" | "do-while"; // Hier nur gültige Typen erlauben
  condition: string;
}

const LoopBlock: React.FC<LoopBlockProps> = ({ id, type, condition }) => {
  const [loopCondition, setLoopCondition] = useState(condition);

  const { setNodeRef: setInnerRef, isOver: isOverInner } = useDroppable({
    id: `inner-${id}`,
  });
  const { setNodeRef: setOuterRef, isOver: isOverOuter } = useDroppable({
    id: `outer-${id}`,
  });

  return (
    <div className="loop-block">
      <p className="loop-type">
        {type === "while" ? "🔁 WHILE" : "🔄 DO-WHILE"}
      </p>

      <input
        className="loop-condition-input"
        value={loopCondition}
        onChange={(e) => setLoopCondition(e.target.value)}
        placeholder="Bedingung eingeben..."
      />

      <div
        ref={setInnerRef}
        className={`loop-inner ${isOverInner ? "highlight" : ""}`}
      >
        <p>📌 Inhalt</p>
      </div>

      {type === "do-while" && (
        <div className="loop-condition">
          <p>🔽 Bedingung</p>
        </div>
      )}

      <div
        ref={setOuterRef}
        className={`loop-outer ${isOverOuter ? "highlight" : ""}`}
      >
        <p>⬇️ Außerhalb der Schleife</p>
      </div>
    </div>
  );
};

export default LoopBlock;
