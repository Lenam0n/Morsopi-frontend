import React, { JSX, useState } from "react";
import {
  ProcessBlock,
  IfBlock,
  LoopBlock,
  InputBlock,
  FunctionBlock,
} from "./index";
import { BlockType } from "../../../types/struktogrammTypes";
import DropZone from "../DropZone";
import "./OutputBlock.css";

interface OutputBlockProps {
  id: string;
  content: string;
}

const OutputBlock: React.FC<OutputBlockProps> = ({ id, content }) => {
  // Hier wird wieder nur ein einzelnes Element erwartet.
  const [Content, setContent] = useState<string>(content);
  const [aboveElement, setAboveElement] = useState<JSX.Element | null>(null);
  const [belowElement, setBelowElement] = useState<JSX.Element | null>(null);

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
      <DropZone
        zoneId={`output-above-${id}`}
        onDrop={(blockType) => setAboveElement(getBlockComponent(blockType))}
      >
        {aboveElement || <p>⬆️ Oberhalb</p>}
      </DropZone>

      <p>
        📢 OUTPUT:{" "}
        <input
          className="Output-input"
          value={Content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Ausgabe eingeben..."
        />
      </p>

      <DropZone
        zoneId={`output-below-${id}`}
        onDrop={(blockType) => setBelowElement(getBlockComponent(blockType))}
      >
        {belowElement || <p>⬇️ Unterhalb</p>}
      </DropZone>
    </div>
  );
};

export default OutputBlock;
