import React from "react";

interface HeadingFontDropdownProps {
  dispatch: React.Dispatch<any>;
}

const headingFonts = [
  "Arial",
  "Times New Roman",
  "Courier New",
  "Georgia",
  "Verdana",
];

const HeadingFontDropdown: React.FC<HeadingFontDropdownProps> = ({
  dispatch,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "CHANGE_HEADING_FONT", fontFamily: e.target.value });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <label>
        Heading Font:
        <select onChange={handleChange} style={{ marginLeft: "10px" }}>
          {headingFonts.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default HeadingFontDropdown;
