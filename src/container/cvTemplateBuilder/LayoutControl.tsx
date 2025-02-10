// src/container/cvTemplateBuilder/LayoutControls.tsx
import React from "react";
import "./LayoutControls.css";

interface LayoutControlsProps {
  columns: number;
  setColumns: (n: number) => void;
  topOffset: number;
  setTopOffset: (n: number) => void;
  elementSpacing: number;
  setElementSpacing: (n: number) => void;
  sideMargin: number;
  setSideMargin: (n: number) => void;
  columnSpacing: number;
  setColumnSpacing: (n: number) => void;
  blocksPerColumn: number;
  setBlocksPerColumn: (n: number) => void;
}

const LayoutControls: React.FC<LayoutControlsProps> = ({
  columns,
  setColumns,
  topOffset,
  setTopOffset,
  elementSpacing,
  setElementSpacing,
  sideMargin,
  setSideMargin,
  columnSpacing,
  setColumnSpacing,
  blocksPerColumn,
  setBlocksPerColumn,
}) => {
  return (
    <div className="cv-builder-layout-controls">
      <h2 className="cv-builder-layout-title">Layout Controls</h2>
      <div>
        <label>Columns: </label>
        <input
          type="number"
          value={columns}
          onChange={(e) => setColumns(parseInt(e.target.value))}
          min={1}
        />
      </div>
      <div>
        <label>Top Offset (px): </label>
        <input
          type="number"
          value={topOffset}
          onChange={(e) => setTopOffset(parseInt(e.target.value))}
          min={0}
        />
      </div>
      <div>
        <label>Element Spacing (px): </label>
        <input
          type="number"
          value={elementSpacing}
          onChange={(e) => setElementSpacing(parseInt(e.target.value))}
          min={0}
        />
      </div>
      <div>
        <label>Side Margin (px): </label>
        <input
          type="number"
          value={sideMargin}
          onChange={(e) => setSideMargin(parseInt(e.target.value))}
          min={0}
        />
      </div>
      <div>
        <label>Column Spacing (px): </label>
        <input
          type="number"
          value={columnSpacing}
          onChange={(e) => setColumnSpacing(parseInt(e.target.value))}
          min={0}
        />
      </div>
      <div>
        <label>Blocks per Column: </label>
        <input
          type="number"
          value={blocksPerColumn}
          onChange={(e) => setBlocksPerColumn(parseInt(e.target.value))}
          min={1}
        />
      </div>
    </div>
  );
};

export default LayoutControls;
