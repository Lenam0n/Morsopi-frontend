import React from "react";
import { ActionButtonProps } from "../../../types/struktogrammTypes";

const ActionButton: React.FC<ActionButtonProps> = ({ type, onClick }) => {
  return (
    <button onClick={onClick} className={`action-button ${type}`}>
      {type === "undo" ? "🔙 Undo" : "🔜 Redo"}
    </button>
  );
};

export default ActionButton;
