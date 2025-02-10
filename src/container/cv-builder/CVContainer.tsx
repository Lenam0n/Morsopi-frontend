// src/components/CVContainer.tsx
import React from "react";

interface CVContainerProps {
  children: React.ReactNode;
}

const CVContainer: React.FC<CVContainerProps> = ({ children }) => {
  return (
    <div
      style={{
        width: "800px", // feste Breite
        margin: "0 auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px", // fester Abstand zwischen den Elementen
        maxHeight: "1000px", // maximale Höhe (Max Cap)
        overflowY: "auto", // falls Inhalt überläuft
      }}
    >
      {children}
    </div>
  );
};

export default CVContainer;
