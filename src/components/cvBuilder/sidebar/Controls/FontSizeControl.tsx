import React from "react";

interface FontSizeControlProps {
  dispatch: React.Dispatch<any>;
}

const FontSizeControl: React.FC<FontSizeControlProps> = ({ dispatch }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={() => dispatch({ type: "DECREASE_FONT_SIZE" })}>
        A-
      </button>
      <button
        onClick={() => dispatch({ type: "INCREASE_FONT_SIZE" })}
        style={{ marginLeft: "10px" }}
      >
        A+
      </button>
    </div>
  );
};

export default FontSizeControl;
