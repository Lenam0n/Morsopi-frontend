import React, { JSX, useState } from "react";
import { useDroppable, useDndMonitor } from "@dnd-kit/core";
import {
  ProcessBlock,
  IfBlock,
  LoopBlock,
  InputBlock,
  OutputBlock,
} from "./index";
import { BlockType } from "../../../types/struktogrammTypes";
import "./FunctionBlock.css";

interface FunctionBlockProps {
  id: string;
  functionName: string;
}

const FunctionBlock: React.FC<FunctionBlockProps> = ({ id, functionName }) => {
  const [aboveElement, setAboveElement] = useState<JSX.Element | null>(null);
  const [belowElement, setBelowElement] = useState<JSX.Element | null>(null);

  const { setNodeRef: setAboveRef, isOver: isOverAbove } = useDroppable({
    id: `function-above-${id}`,
  });

  const { setNodeRef: setBelowRef, isOver: isOverBelow } = useDroppable({
    id: `function-below-${id}`,
  });

  useDndMonitor({
    onDragEnd: (event) => {
      if (!event.over) return;
      const blockType = event.active.id as BlockType;

      const newBlock = getBlockComponent(blockType);

      if (event.over.id === `function-above-${id}`) {
        setAboveElement(newBlock);
      } else if (event.over.id === `function-below-${id}`) {
        setBelowElement(newBlock);
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
        return <p>❓ Unbekannter Block</p>;
    }
  };

  return (
    <div className="function-block">
      <div
        ref={setAboveRef}
        className={`drop-zone ${isOverAbove ? "highlight" : ""}`}
      >
        {aboveElement || <p>⬆️ Oberhalb</p>}
      </div>

      <p>🔣 CALL {functionName}()</p>

      <div
        ref={setBelowRef}
        className={`drop-zone ${isOverBelow ? "highlight" : ""}`}
      >
        {belowElement || <p>⬇️ Unterhalb</p>}
      </div>
    </div>
  );
};

export default FunctionBlock;
