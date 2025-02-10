// src/components/cvBuilder/sidebar/History/HistoryComponent.tsx
import React from "react";
import { EditorHistoryState } from "../../../../types/cv-builder/sidebar/EditorInterfaces";
import "./HistoryComponent.css";

interface HistoryComponentProps {
  historyState: EditorHistoryState;
  dispatch: React.Dispatch<any>;
}

const HistoryComponent: React.FC<HistoryComponentProps> = ({
  historyState,
  dispatch,
}) => {
  return (
    <div className="cv-history-container">
      <h4 className="cv-history-title">History</h4>
      <ul className="cv-history-list">
        {historyState.snapshots.map((snapshot, index) => (
          <li
            key={index}
            onClick={() => dispatch({ type: "JUMP_TO_STATE", index })}
            className={`cv-history-list-item ${
              index === historyState.currentIndex
                ? "cv-history-list-item-active"
                : ""
            }`}
          >
            <span className="cv-history-item-index">{index}:</span>
            <span className="cv-history-item-description">
              {snapshot.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryComponent;
