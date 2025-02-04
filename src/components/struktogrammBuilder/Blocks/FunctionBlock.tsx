import React, { JSX, useState } from "react";
import {
  ProcessBlock,
  IfBlock,
  LoopBlock,
  InputBlock,
  OutputBlock,
} from "./index";
import { BlockType } from "../../../types/struktogrammTypes";
import DropZone from "../DropZone";
import "./FunctionBlock.css";

interface FunctionBlockProps {
  id: string;
  functionName: string;
}

const FunctionBlock: React.FC<FunctionBlockProps> = ({ id, functionName }) => {
  const [functionname, setfunctionname] = useState<string>(functionName);
  const [aboveElements, setAboveElements] = useState<JSX.Element[]>([]);
  const [belowElements, setBelowElements] = useState<JSX.Element[]>([]);
  const [insideElements, setInsideElements] = useState<JSX.Element[]>([]);

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
      default:
        return <p key={newId}>❓ Unbekannter Block</p>;
    }
  };

  return (
    <div className="function-block">
      <DropZone
        zoneId={`function-above-${id}`}
        onDrop={(blockType) =>
          setAboveElements((prev) => [...prev, getBlockComponent(blockType)])
        }
      >
        <p>⬆️ Oberhalb</p>
      </DropZone>
      {aboveElements}

      <p>
        🔣 CALL{" "}
        <input
          className="function-input"
          value={functionname}
          onChange={(e) => setfunctionname(e.target.value)}
          placeholder="Bedingung eingeben..."
        />{" "}
        ()
      </p>

      <DropZone
        zoneId={`function-inside-${id}`}
        onDrop={(blockType) =>
          setInsideElements((prev) => [...prev, getBlockComponent(blockType)])
        }
        className="drop-zone inside"
      >
        <p>🔲 Innerhalb</p>
        <div>{insideElements}</div>
      </DropZone>

      <DropZone
        zoneId={`function-below-${id}`}
        onDrop={(blockType) =>
          setBelowElements((prev) => [...prev, getBlockComponent(blockType)])
        }
      >
        <p>⬇️ Unterhalb</p>
      </DropZone>
      {belowElements}
    </div>
  );
};

export default FunctionBlock;
