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

  const addBlock = (block: Block) => {
    const newBlocks = [...blocks, block];
    setBlocks(newBlocks);
    setHistory([...history.slice(0, historyIndex + 1), newBlocks]);
    setHistoryIndex(historyIndex + 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setBlocks(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setBlocks(history[historyIndex + 1]);
    }
  };

  return (
    <StruktogrammContext.Provider value={{ blocks, addBlock, undo, redo }}>
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
