import React, { JSX, useState } from "react";
import {
  ProcessBlock,
  IfBlock,
  LoopBlock,
  OutputBlock,
  FunctionBlock,
} from "./index";
import { BlockType } from "../../../types/struktogrammTypes";
import DropZone from "../DropZone";
import "./InputBlock.css";

interface InputBlockProps {
  id: string;
  content: string;
}

const InputBlock: React.FC<InputBlockProps> = ({ id, content }) => {
  // Hier wird nur ein einzelnes Element (statt Array) erwartet.
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
    <div className="input-block">
      <DropZone
        zoneId={`input-above-${id}`}
        onDrop={(blockType) => setAboveElement(getBlockComponent(blockType))}
      >
        {aboveElement || <p>⬆️ Oberhalb</p>}
      </DropZone>

      <p>
        ⌨️ Eingabe:{" "}
        <input
          className="function-input"
          value={Content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Bedingung eingeben..."
        />
      </p>

      <DropZone
        zoneId={`input-below-${id}`}
        onDrop={(blockType) => setBelowElement(getBlockComponent(blockType))}
      >
        {belowElement || <p>⬇️ Unterhalb</p>}
      </DropZone>
    </div>
  );
};

export default InputBlock;
