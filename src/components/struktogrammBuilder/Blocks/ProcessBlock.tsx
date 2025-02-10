import React, { JSX, useState } from "react";
import {
  FunctionBlock,
  IfBlock,
  LoopBlock,
  InputBlock,
  OutputBlock,
} from "./index";
import { BlockType } from "../../../types/struktogrammTypes";
import DropZone from "../DropZone";
import "./ProcessBlock.css";

interface ProcessBlockProps {
  id: string;
  content: string;
}

const ProcessBlock: React.FC<ProcessBlockProps> = ({ id, content }) => {
  const [Content, setContent] = useState<string>(content);
  const [aboveElements, setAboveElements] = useState<JSX.Element[]>([]);
  const [belowElements, setBelowElements] = useState<JSX.Element[]>([]);

  const getBlockComponent = (type: BlockType): JSX.Element => {
    const newId = crypto.randomUUID();
    switch (type) {
      case "process":
        return <ProcessBlock key={newId} id={newId} content="Neuer Prozess" />;
      case "function":
        return (
          <FunctionBlock key={newId} id={newId} functionName="Neue Funktion" />
        );
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
    <div className="process-block" data-id={id}>
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
        💾{" "}
        <input
          className="process-input"
          value={Content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Bedingung eingeben..."
        />{" "}
        ()
      </p>

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

export default ProcessBlock;
