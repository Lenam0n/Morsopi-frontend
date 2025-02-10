import React, { useState, useEffect } from "react";

interface TextEditorControlProps {
  field: string;
  text: string;
  dispatch: React.Dispatch<any>;
}

const TextEditorControl: React.FC<TextEditorControlProps> = ({
  field,
  text,
  dispatch,
}) => {
  const [value, setValue] = useState(text);

  useEffect(() => {
    setValue(text);
  }, [text]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    dispatch({ type: "UPDATE_TEXT", field, text: e.target.value });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Edit "{field}"</h3>
      <textarea
        value={value}
        onChange={handleChange}
        style={{ width: "100%", minHeight: "80px" }}
      />
    </div>
  );
};

export default TextEditorControl;
