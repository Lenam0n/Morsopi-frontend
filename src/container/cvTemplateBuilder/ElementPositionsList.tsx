import React, { useState } from "react";
import "./ElementPositionsList.css";

export interface TemplateElement {
  id: string;
  name: string;
  column: number;
  blockIndex: number;
}

interface ElementPositionsListProps {
  elements: TemplateElement[];
  onUpdatePosition: (
    id: string,
    newColumn: number,
    newBlockIndex: number
  ) => void;
}

const ElementPositionsList: React.FC<ElementPositionsListProps> = ({
  elements,
  onUpdatePosition,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newColumn, setNewColumn] = useState<number>(0);
  const [newBlockIndex, setNewBlockIndex] = useState<number>(0);

  const handleEditClick = (element: TemplateElement) => {
    setEditingId(element.id);
    setNewColumn(element.column);
    setNewBlockIndex(element.blockIndex);
  };

  const handleUpdate = () => {
    if (editingId !== null) {
      onUpdatePosition(editingId, newColumn, newBlockIndex);
      setEditingId(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div className="cv-element-positions-container">
      <h2 className="cv-element-positions-title">Element Positions</h2>
      <ul className="cv-element-positions-list">
        {elements.map((el) => (
          <li key={el.id} className="cv-element-positions-item">
            <span className="cv-element-name">{el.name}</span>
            <span className="cv-element-info">
              Column: {el.column}, Block: {el.blockIndex}
            </span>
            <button
              className="cv-edit-button"
              onClick={() => handleEditClick(el)}
            >
              Edit Position
            </button>
            {editingId === el.id && (
              <div className="cv-edit-menu">
                <label>
                  Column:
                  <input
                    type="number"
                    value={newColumn}
                    onChange={(e) => setNewColumn(parseInt(e.target.value))}
                  />
                </label>
                <label>
                  Block:
                  <input
                    type="number"
                    value={newBlockIndex}
                    onChange={(e) => setNewBlockIndex(parseInt(e.target.value))}
                  />
                </label>
                <button className="cv-update-button" onClick={handleUpdate}>
                  Update
                </button>
                <button className="cv-cancel-button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ElementPositionsList;
