export type BlockType =
  | "process"
  | "if"
  | "while"
  | "do-while"
  | "input"
  | "output"
  | "function";

export interface Block {
  id: string;
  type: BlockType;
  content: string;
  // Optionale verschachtelte Bereiche:
  above?: Block[];
  below?: Block[];
  inside?: Block[];
  // Für If-Blöcke könnten zusätzlich z. B. trueBranch/falseBranch definiert werden.
}

export interface StruktogrammState {
  blocks: Block[];
  addBlock: (
    block: Block,
    parentId?: string,
    position?: "above" | "below" | "inside"
  ) => void;
  updateBlock: (blockId: string, updatedProperties: Partial<Block>) => void;
  undo: () => void;
  redo: () => void;
}

export interface ActionButtonProps {
  type: "undo" | "redo";
  onClick: () => void;
}
