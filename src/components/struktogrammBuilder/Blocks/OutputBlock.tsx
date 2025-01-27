import React, { JSX, useState } from "react";
import { useDroppable, useDndMonitor } from "@dnd-kit/core";
import {
  ProcessBlock,
  IfBlock,
  LoopBlock,
  InputBlock,
  FunctionBlock,
} from "./index";
import { BlockType } from "../../../types/struktogrammTypes";
import "./OutputBlock.css";

interface OutputBlockProps {
  id: string;
  content: string;
}

const OutputBlock: React.FC<OutputBlockProps> = ({ id, content }) => {
  const [aboveElement, setAboveElement] = useState<JSX.Element | null>(null);
  const [belowElement, setBelowElement] = useState<JSX.Element | null>(null);

  const { setNodeRef: setAboveRef, isOver: isOverAbove } = useDroppable({
    id: `output-above-${id}`,
  });

  const { setNodeRef: setBelowRef, isOver: isOverBelow } = useDroppable({
    id: `output-below-${id}`,
  });

  useDndMonitor({
    onDragEnd: (event) => {
      if (!event.over) return;
      const blockType = event.active.id as BlockType;

      const newBlock = getBlockComponent(blockType);

      if (event.over.id === `output-above-${id}`) {
        setAboveElement(newBlock);
      } else if (event.over.id === `output-below-${id}`) {
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
        return <p key={newId}>❓ Unbekannter Block</p>;
    }
  };

  return (
    <div className="output-block">
      <div
        ref={setAboveRef}
        className={`drop-zone ${isOverAbove ? "highlight" : ""}`}
      >
        {aboveElement || <p>⬆️ Oberhalb</p>}
      </div>

      <p>📢 OUTPUT: {content}</p>

      <div
        ref={setBelowRef}
        className={`drop-zone ${isOverBelow ? "highlight" : ""}`}
      >
        {belowElement || <p>⬇️ Unterhalb</p>}
      </div>
    </div>
  );
};

export default OutputBlock;
