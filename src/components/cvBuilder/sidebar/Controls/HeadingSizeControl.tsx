import React from "react";

interface HeadingFontSizeControlProps {
  dispatch: React.Dispatch<any>;
}

const HeadingFontSizeControl: React.FC<HeadingFontSizeControlProps> = ({
  dispatch,
}) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={() => dispatch({ type: "DECREASE_HEADING_FONT_SIZE" })}>
        H-
      </button>
      <button
        onClick={() => dispatch({ type: "INCREASE_HEADING_FONT_SIZE" })}
        style={{ marginLeft: "10px" }}
      >
        H+
      </button>
    </div>
  );
};

export default HeadingFontSizeControl;
