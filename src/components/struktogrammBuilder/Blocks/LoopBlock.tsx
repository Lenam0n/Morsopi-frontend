import React, { JSX, useState } from "react";
import DropZone from "../DropZone";
import { BlockType } from "../../../types/struktogrammTypes";
import {
  ProcessBlock,
  IfBlock,
  LoopBlock as LoopBlockComponent, // Beachte: Hier verwenden wir den gleichen Blocktyp rekursiv.
  InputBlock,
  OutputBlock,
  FunctionBlock,
} from "./index";
import "./LoopBlock.css";

interface LoopBlockProps {
  id: string;
  type: "while" | "do-while";
  condition: string;
}

const LoopBlock: React.FC<LoopBlockProps> = ({ id, type, condition }) => {
  const [loopCondition, setLoopCondition] = useState(condition);
  const [innerElements, setInnerElements] = useState<JSX.Element[]>([]);

  // Funktion zum Erzeugen einer neuen Block-Komponente basierend auf dem Blocktyp
  const getBlockComponent = (blockType: BlockType): JSX.Element => {
    const newId = crypto.randomUUID();
    switch (blockType) {
      case "process":
        return <ProcessBlock key={newId} id={newId} content="Neuer Prozess" />;
      case "if":
        return <IfBlock key={newId} id={newId} condition="Neue Bedingung" />;
      case "while":
      case "do-while":
        return (
          <LoopBlockComponent
            key={newId}
            id={newId}
            type={blockType as "while" | "do-while"}
            condition="Neue Schleife"
          />
        );
      case "input":
        return <InputBlock key={newId} id={newId} content="Neue Eingabe" />;
      case "output":
        return <OutputBlock key={newId} id={newId} content="Neue Ausgabe" />;
      case "function":
        return (
          <FunctionBlock key={newId} id={newId} functionName="Neue Funktion" />
        );
      default:
        return <p key={newId}>❓ Unbekannter Block</p>;
    }
  };

  return (
    <div className="loop-block">
      <p className="loop-type">
        {type === "while" ? "🔁 WHILE" : "🔄 DO-WHILE"}
      </p>

      {type === "while" && (
        <div className="loop-condition">
          <p>🔽 Bedingung</p>
          <input
            className="loop-condition-input"
            value={loopCondition}
            onChange={(e) => setLoopCondition(e.target.value)}
            placeholder="Bedingung eingeben..."
          />
        </div>
      )}

      {/* Innere Dropzone für den Schleifen-Inhalt */}
      <DropZone
        zoneId={`inner-${id}`}
        onDrop={(blockType) =>
          setInnerElements((prev) => [...prev, getBlockComponent(blockType)])
        }
        className="loop-inner"
      >
        <p>📌 Inhalt</p>
        {innerElements}
      </DropZone>

      {type === "do-while" && (
        <div className="loop-condition">
          <p>🔽 Bedingung</p>
          <input
            className="loop-condition-input"
            value={loopCondition}
            onChange={(e) => setLoopCondition(e.target.value)}
            placeholder="Bedingung eingeben..."
          />
        </div>
      )}

      {/* Äußere Dropzone für Elemente außerhalb der Schleife */}
      <DropZone
        zoneId={`outer-${id}`}
        onDrop={(blockType) => {
          // Hier kannst Du zusätzliches Verhalten definieren, falls etwas in der äußeren Zone gedroppt wird.
          console.log(
            "Block vom Typ",
            blockType,
            "wurde in der äußeren Zone gedroppt."
          );
        }}
        className="loop-outer"
      >
        <p>⬇️ Außerhalb der Schleife</p>
      </DropZone>
    </div>
  );
};

export default LoopBlock;
