import React from "react";

interface FontDropdownProps {
  dispatch: React.Dispatch<any>;
}

const fonts = ["Arial", "Times New Roman", "Courier New", "Georgia", "Verdana"];

const FontDropdown: React.FC<FontDropdownProps> = ({ dispatch }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "CHANGE_FONT", fontFamily: e.target.value });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <label>
        Text Font:
        <select onChange={handleChange} style={{ marginLeft: "10px" }}>
          {fonts.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default FontDropdown;
