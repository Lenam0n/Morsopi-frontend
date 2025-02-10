import React from "react";

interface ClearButtonProps {
  dispatch: React.Dispatch<any>;
}

const ClearButton: React.FC<ClearButtonProps> = ({ dispatch }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={() => dispatch({ type: "CLEAR_TEXTS" })}>
        Clear All Text Fields
      </button>
    </div>
  );
};

export default ClearButton;
