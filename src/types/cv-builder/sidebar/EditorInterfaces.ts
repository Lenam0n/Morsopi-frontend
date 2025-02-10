// src/components/Editor/editorTypes.ts

// Gespeicherte Blöcke
export interface SavedBlock {
  id: string;
  header: string;
  content: string;
}

// EditorSnapshot – enthält alle Editor-Einstellungen und Daten
export interface EditorSnapshot {
  textFields: { [key: string]: string };
  fontFamily: string;
  fontSize: number;
  headingFontFamily: string;
  headingFontSize: number;
  savedBlocks: SavedBlock[];
  description: string;
}

// EditorHistoryState – verwaltet die History (Snapshots und den aktuellen Index)
export interface EditorHistoryState {
  snapshots: EditorSnapshot[];
  currentIndex: number;
}
