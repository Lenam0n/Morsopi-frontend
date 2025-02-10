import { SavedBlock } from "./EditorInterfaces";

// EditorAction – alle möglichen Aktionen, die der Reducer verarbeiten soll
// In src/types/cv-builder/sidebar/EditorTypes.ts (oder einer vergleichbaren Datei)
export type EditorAction =
  | { type: "UPDATE_TEXT"; field: string; text: string }
  | { type: "CLEAR_TEXTS" }
  | { type: "CHANGE_FONT"; fontFamily: string }
  | { type: "INCREASE_FONT_SIZE" }
  | { type: "DECREASE_FONT_SIZE" }
  | { type: "CHANGE_HEADING_FONT"; fontFamily: string }
  | { type: "INCREASE_HEADING_FONT_SIZE" }
  | { type: "DECREASE_HEADING_FONT_SIZE" }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "JUMP_TO_STATE"; index: number }
  | { type: "SAVE_BLOCK"; block: SavedBlock }
  | { type: "REPLACE_BLOCK"; savedBlockId: string; targetField: string }
  | { type: "MOVE_BLOCK_UP"; savedBlockId: string }
  | { type: "MOVE_BLOCK_DOWN"; savedBlockId: string }
  | { type: "REMOVE_BOOKMARK"; header: string };

export { SavedBlock };
// Falls du weitere Aktionen (z. B. REMOVE_BOOKMARK) nutzen möchtest, füge diese hier hinzu.
