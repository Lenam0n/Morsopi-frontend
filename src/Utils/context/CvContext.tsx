// src/Utils/context/CvContext.tsx
import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  ReactNode,
} from "react";
import {
  editorReducer,
  initialHistoryState,
  EditorHistoryState,
  EditorAction,
} from "../reducer/editorReducer";

interface CVTextData {
  [label: string]: string;
}

/**
 * Neues Interface für Template-Informationen.
 * Es werden alle relevanten Daten zum ausgewählten Template gespeichert.
 */
export interface TemplateInfo {
  id: string;
  name: string;
  previewKey: string; // Beispiel: "Template1"
}

export interface CVContextProps {
  cvTexts: CVTextData;
  updateCVText: (label: string, text: string) => void;
  selectedTemplate: TemplateInfo | null; // Jetzt als Objekt statt als string
  setSelectedTemplate: (template: TemplateInfo | null) => void;
  historyState: EditorHistoryState;
  dispatchHistory: React.Dispatch<EditorAction>;
}

const CVContext = createContext<CVContextProps | undefined>(undefined);

interface CVProviderProps {
  children: ReactNode;
}

export const CVProvider: React.FC<CVProviderProps> = ({ children }) => {
  // Zustände für CV-Texte
  const [cvTexts, setCVTexts] = useState<CVTextData>({});
  // Speichert das ausgewählte Template als Objekt
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateInfo | null>(
    null
  );

  const updateCVText = (label: string, text: string) => {
    setCVTexts((prev) => ({
      ...prev,
      [label]: text,
    }));
  };

  // History-State mit useReducer (für Editor-Aktionen)
  const [historyState, dispatchHistory] = useReducer(
    editorReducer,
    initialHistoryState
  );

  return (
    <CVContext.Provider
      value={{
        cvTexts,
        updateCVText,
        selectedTemplate,
        setSelectedTemplate,
        historyState,
        dispatchHistory,
      }}
    >
      {children}
    </CVContext.Provider>
  );
};

export const useCVContext = (): CVContextProps => {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error("useCVContext must be used within a CVProvider");
  }
  return context;
};
