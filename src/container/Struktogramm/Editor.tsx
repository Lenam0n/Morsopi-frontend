import React, { useState } from "react";
import { useStruktogramm } from "../../Utils/context/StruktogrammContext";
import {
  ProcessBlock,
  IfBlock,
  LoopBlock,
  InputBlock,
  OutputBlock,
  FunctionBlock,
} from "../../components/struktogrammBuilder/Blocks/index";
import Sidebar from "../../components/struktogrammBuilder/Sidebar/Sidebar";
import InitialDropzone from "../../components/struktogrammBuilder/Blocks/InitialDropzone";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { Block, BlockType } from "../../types/struktogrammTypes";
import DropZone from "../../components/struktogrammBuilder/DropZone";
import "./Editor.css";

const Editor: React.FC = () => {
  const { blocks, addBlock} = useStruktogramm();
  const [draggedBlock, setDraggedBlock] = useState<Block | null>(null);
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);

  return (
    <DndContext
      onDragStart={(event) => {
        // Hole den Blocktyp aus den an den Draggable angehängten Daten
        const type = event.active.data.current?.type as BlockType;
        setDraggedBlock({
          id: crypto.randomUUID(),
          type,
          content: "Neues Element",
        });
      }}
      // Wir entfernen hier die globale onDragEnd‑Logik, weil die einzelnen DropZones (global oder verschachtelt)
      // den Drop selbst verarbeiten.
      onDragEnd={() => {
        setDraggedBlock(null);
      }}
    >
      <div className="editor-container">
        <Sidebar />
        {/* Globaler Editorbereich als DropZone */}
        <DropZone
          zoneId="editor-dropzone"
          onDrop={(blockType) => {
            // Wird in den globalen Bereich (editor-dropzone) gedroppt, dann füge global hinzu.
            addBlock({
              id: crypto.randomUUID(),
              type: blockType,
              content: "Neues Element",
            });
          }}
          className="editor-area"
        >
          <h1>Struktogramm-Editor</h1>

          {blocks.length === 0 ? (
            <InitialDropzone />
          ) : (
            <div className="blocks-container">
              {blocks.map((block) => (
                <div
                  className={`block-wrapper ${block.type}-block`}
                  key={block.id}
                  onMouseEnter={() => setHoveredBlock(block.type)}
                  onMouseLeave={() => setHoveredBlock(null)}
                >
                  {block.type === "process" && (
                    <ProcessBlock id={block.id} content={block.content} />
                  )}
                  {block.type === "if" && (
                    <IfBlock id={block.id} condition={block.content} />
                  )}
                  {["while", "do-while"].includes(block.type) && (
                    <LoopBlock
                      id={block.id}
                      type={block.type as "while" | "do-while"}
                      condition={block.content}
                    />
                  )}
                  {block.type === "input" && (
                    <InputBlock id={block.id} content={block.content} />
                  )}
                  {block.type === "output" && (
                    <OutputBlock id={block.id} content={block.content} />
                  )}
                  {block.type === "function" && (
                    <FunctionBlock id={block.id} functionName={block.content} />
                  )}
                  {hoveredBlock === block.type && (
                    <div className="block-tooltip">
                      {block.type.toUpperCase()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </DropZone>
      </div>

      <DragOverlay>
        {draggedBlock && (
          <div className="drag-overlay">
            {draggedBlock.type === "process" && (
              <ProcessBlock
                id={draggedBlock.id}
                content={draggedBlock.content}
              />
            )}
            {draggedBlock.type === "if" && (
              <IfBlock id={draggedBlock.id} condition={draggedBlock.content} />
            )}
            {["while", "do-while"].includes(draggedBlock.type) && (
              <LoopBlock
                id={draggedBlock.id}
                type={draggedBlock.type as "while" | "do-while"}
                condition={draggedBlock.content}
              />
            )}
            {draggedBlock.type === "input" && (
              <InputBlock id={draggedBlock.id} content={draggedBlock.content} />
            )}
            {draggedBlock.type === "output" && (
              <OutputBlock
                id={draggedBlock.id}
                content={draggedBlock.content}
              />
            )}
            {draggedBlock.type === "function" && (
              <FunctionBlock
                id={draggedBlock.id}
                functionName={draggedBlock.content}
              />
            )}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default Editor;
