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
}

export interface StruktogrammState {
  blocks: Block[];
  addBlock: (block: Block) => void;
  undo: () => void;
  redo: () => void;
}
