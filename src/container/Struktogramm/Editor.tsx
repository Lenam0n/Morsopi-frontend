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
import {
  DndContext,
  useDroppable,
  DragOverlay,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { Block, BlockType } from "../../types/struktogrammTypes";
import "./Editor.css";

const Editor: React.FC = () => {
  const { blocks, addBlock, undo, redo } = useStruktogramm();
  const [draggedBlock, setDraggedBlock] = useState<Block | null>(null);
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);

  const { setNodeRef: setEditorRef, isOver: isOverEditor } = useDroppable({
    id: "editor-dropzone",
  });

  // Funktion zum Finden der nächstgelegenen Dropzone
  const findClosestDropzone = (dropzone: { id: UniqueIdentifier } | null) => {
    if (!dropzone || typeof dropzone.id !== "string") return null;
    if (
      dropzone.id.startsWith("inner-") ||
      dropzone.id.startsWith("outer-") ||
      dropzone.id === "editor-dropzone"
    ) {
      return dropzone.id;
    }
    return null;
  };

  return (
    <DndContext
      onDragStart={(event) => {
        const type = event.active.id as BlockType;
        setDraggedBlock({
          id: crypto.randomUUID(),
          type,
          content: "Neues Element",
        });
      }}
      onDragEnd={(event) => {
        const target = event.over?.id;
        if (!target || !draggedBlock) {
          setDraggedBlock(null);
          return;
        }

        if (
          typeof target === "string" &&
          (target.startsWith("inner-") ||
            target.startsWith("outer-") ||
            target === "editor-dropzone")
        ) {
          addBlock({ ...draggedBlock, id: crypto.randomUUID() });
          setDraggedBlock(null);
          return;
        }

        const closestDropzone = findClosestDropzone(event.over);
        if (closestDropzone) {
          addBlock({ ...draggedBlock, id: crypto.randomUUID() });
        }

        setDraggedBlock(null);
      }}
    >
      <div className="editor-container">
        <Sidebar />

        <div
          className={`editor-area ${isOverEditor ? "highlight" : ""}`}
          ref={setEditorRef}
        >
          <h1>Struktogramm-Editor</h1>
          <button onClick={undo}>🔙 Undo</button>
          <button onClick={redo}>🔜 Redo</button>

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
        </div>
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
