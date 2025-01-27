import React, { JSX, useState } from "react";
import { useDroppable, useDndMonitor } from "@dnd-kit/core";
import {
  ProcessBlock,
  LoopBlock,
  InputBlock,
  OutputBlock,
  FunctionBlock,
} from "./index";
import { BlockType } from "../../../types/struktogrammTypes";
import "./IfBlock.css";

interface IfBlockProps {
  id: string;
  condition: string;
}

const IfBlock: React.FC<IfBlockProps> = ({ id, condition }) => {
  const [ifCondition, setIfCondition] = useState(condition);
  const [trueBranch, setTrueBranch] = useState<JSX.Element[]>([]);
  const [falseBranch, setFalseBranch] = useState<JSX.Element[]>([]);

  const { setNodeRef: setTrueRef, isOver: isOverTrue } = useDroppable({
    id: `true-${id}`,
  });
  const { setNodeRef: setFalseRef, isOver: isOverFalse } = useDroppable({
    id: `false-${id}`,
  });

  useDndMonitor({
    onDragEnd: (event) => {
      if (!event.over) return;
      const blockType = event.active.id as BlockType;
      const newBlock = getBlockComponent(blockType);

      if (event.over.id === `true-${id}`) {
        setTrueBranch((prev) => [...prev, newBlock]);
      } else if (event.over.id === `false-${id}`) {
        setFalseBranch((prev) => [...prev, newBlock]);
      }
    },
  });

  const getBlockComponent = (type: BlockType): JSX.Element => {
    const newId = crypto.randomUUID();
    switch (type) {
      case "process":
        return <ProcessBlock key={newId} id={newId} content="Neuer Prozess" />;
      case "if":
        return <IfBlock key={newId} id={newId} condition="Neue Bedingung" />;
      case "while":
      case "do-while":
        return (
          <LoopBlock
            key={newId}
            id={newId}
            type={type}
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
    <div className="if-block">
      <input
        className="if-condition"
        value={ifCondition}
        onChange={(e) => setIfCondition(e.target.value)}
        placeholder="Bedingung eingeben..."
      />
      <div className="branches-div">
        <div
          ref={setTrueRef}
          className={`if-branch ${isOverTrue ? "highlight" : ""}`}
        >
          <p>✅ True</p>
          {trueBranch.length > 0 ? (
            trueBranch
          ) : (
            <p className="placeholder">Element hier ablegen</p>
          )}
        </div>

        <div
          ref={setFalseRef}
          className={`if-branch ${isOverFalse ? "highlight" : ""}`}
        >
          <p>❌ False</p>
          {falseBranch.length > 0 ? (
            falseBranch
          ) : (
            <p className="placeholder">Element hier ablegen</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default IfBlock;
