import React, { createContext, useState, useContext } from "react";
import { Block, StruktogrammState } from "../../types/struktogrammTypes";

const StruktogrammContext = createContext<StruktogrammState | undefined>(
  undefined
);

export const StruktogrammProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [history, setHistory] = useState<Block[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Hilfsfunktion zur Aktualisierung der History
  const updateHistory = (newBlocks: Block[]) => {
    const newHistory = [...history.slice(0, historyIndex + 1), newBlocks];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  /**
   * Fügt einen Block hinzu.
   * @param block - Der neue Block.
   * @param parentId - (Optional) ID des Eltern-Blocks, in den der neue Block verschachtelt werden soll.
   * @param position - (Optional) Zielbereich im Eltern-Block: "above", "below" oder "inside".
   */
  const addBlock = (
    block: Block,
    parentId?: string,
    position?: "above" | "below" | "inside"
  ) => {
    if (!parentId) {
      // Globaler Block – einfach anhängen
      const newBlocks = [...blocks, block];
      setBlocks(newBlocks);
      updateHistory(newBlocks);
    } else {
      // Verschachtelter Block – rekursiv im Blockbaum einfügen
      const newBlocks = addNestedBlock(blocks, parentId, block, position);
      setBlocks(newBlocks);
      updateHistory(newBlocks);
    }
  };

  /**
   * Rekursive Hilfsfunktion, um einen Block im verschachtelten Blockbaum hinzuzufügen.
   */
  const addNestedBlock = (
    blockList: Block[],
    parentId: string,
    newBlock: Block,
    position?: "above" | "below" | "inside"
  ): Block[] => {
    return blockList.map((b) => {
      if (b.id === parentId) {
        if (position === "above") {
          const above = b.above ? [...b.above, newBlock] : [newBlock];
          return { ...b, above };
        }
        if (position === "below") {
          const below = b.below ? [...b.below, newBlock] : [newBlock];
          return { ...b, below };
        }
        if (position === "inside") {
          const inside = b.inside ? [...b.inside, newBlock] : [newBlock];
          return { ...b, inside };
        }
        return b;
      }
      // Falls der aktuelle Block weitere verschachtelte Bereiche hat, wird auch dort rekursiv gesucht.
      let updated = { ...b };
      if (b.above) {
        updated.above = addNestedBlock(b.above, parentId, newBlock, position);
      }
      if (b.below) {
        updated.below = addNestedBlock(b.below, parentId, newBlock, position);
      }
      if (b.inside) {
        updated.inside = addNestedBlock(b.inside, parentId, newBlock, position);
      }
      return updated;
    });
  };

  /**
   * Aktualisiert einen Block (z. B. zum Ändern des Inhalts oder der verschachtelten Bereiche).
   * @param blockId - Die ID des zu aktualisierenden Blocks.
   * @param updatedProperties - Die zu überschreibenden Eigenschaften.
   */
  const updateBlock = (blockId: string, updatedProperties: Partial<Block>) => {
    const newBlocks = updateBlockInTree(blocks, blockId, updatedProperties);
    setBlocks(newBlocks);
    updateHistory(newBlocks);
  };

  const updateBlockInTree = (
    blockList: Block[],
    blockId: string,
    updatedProperties: Partial<Block>
  ): Block[] => {
    return blockList.map((b) => {
      if (b.id === blockId) {
        return { ...b, ...updatedProperties };
      }
      let updated = { ...b };
      if (b.above) {
        updated.above = updateBlockInTree(b.above, blockId, updatedProperties);
      }
      if (b.below) {
        updated.below = updateBlockInTree(b.below, blockId, updatedProperties);
      }
      if (b.inside) {
        updated.inside = updateBlockInTree(
          b.inside,
          blockId,
          updatedProperties
        );
      }
      return updated;
    });
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setBlocks(history[newIndex]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setBlocks(history[newIndex]);
    }
  };

  return (
    <StruktogrammContext.Provider
      value={{ blocks, addBlock, updateBlock, undo, redo }}
    >
      {children}
    </StruktogrammContext.Provider>
  );
};

export const useStruktogramm = () => {
  const context = useContext(StruktogrammContext);
  if (!context) {
    throw new Error(
      "useStruktogramm must be used within a StruktogrammProvider"
    );
  }
  return context;
};
