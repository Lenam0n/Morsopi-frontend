// src/Utils/reducer/editorReducer.ts
export interface EditorSnapshot {
  textFields: { [key: string]: string };
  fontFamily: string;
  fontSize: number;
  headingFontFamily: string;
  headingFontSize: number;
  savedBlocks: any[]; // Passe diesen Typ ggf. an
  description: string;
}

export interface EditorHistoryState {
  snapshots: EditorSnapshot[];
  currentIndex: number;
}

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
  | { type: "SAVE_BLOCK"; block: any } // Passe den Typ von SavedBlock an
  | { type: "REPLACE_BLOCK"; savedBlockId: string; targetField: string }
  | { type: "MOVE_BLOCK_UP"; savedBlockId: string }
  | { type: "MOVE_BLOCK_DOWN"; savedBlockId: string }
  | { type: "REMOVE_BOOKMARK"; header: string };

export const initialHistoryState: EditorHistoryState = {
  snapshots: [
    {
      textFields: {
        Header: "Lebenslauf",
        Subheader: "Meine Daten",
        Content: "Hier steht der Inhalt...",
      },
      fontFamily: "Arial",
      fontSize: 16,
      headingFontFamily: "Arial",
      headingFontSize: 20,
      savedBlocks: [],
      description: "Initial state",
    },
  ],
  currentIndex: 0,
};

export function editorReducer(
  state: EditorHistoryState,
  action: EditorAction
): EditorHistoryState {
  const currentSnapshot = state.snapshots[state.currentIndex];
  switch (action.type) {
    case "UPDATE_TEXT": {
      const newTextFields = {
        ...currentSnapshot.textFields,
        [action.field]: action.text,
      };
      const newSnapshot: EditorSnapshot = {
        ...currentSnapshot,
        textFields: newTextFields,
        description: `Updated ${action.field}`,
      };
      const newSnapshots = state.snapshots
        .slice(0, state.currentIndex + 1)
        .concat(newSnapshot);
      return { snapshots: newSnapshots, currentIndex: state.currentIndex + 1 };
    }
    // ... (weitere Cases, wie in deinem Originalcode)
    case "REMOVE_BOOKMARK": {
      const newSavedBlocks = currentSnapshot.savedBlocks.filter(
        (b) => b.header !== action.header
      );
      const newSnapshot: EditorSnapshot = {
        ...currentSnapshot,
        savedBlocks: newSavedBlocks,
        description: `Removed bookmark for ${action.header}`,
      };
      const newSnapshots = state.snapshots
        .slice(0, state.currentIndex + 1)
        .concat(newSnapshot);
      return { snapshots: newSnapshots, currentIndex: state.currentIndex + 1 };
    }
    default:
      return state;
  }
}
