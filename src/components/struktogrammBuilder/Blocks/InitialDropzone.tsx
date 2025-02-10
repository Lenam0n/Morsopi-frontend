import React from "react";
import DropZone from "../DropZone";

const InitialDropzone: React.FC = () => {
  return (
    <DropZone
      zoneId="editor-dropzone"
      onDrop={() => {
        /* hier kann z. B. der erste Block ins Editor-Layout eingefügt werden */
      }}
    >
      <p>⬇️ Ziehe das erste Element hierher ⬇️</p>
    </DropZone>
  );
};

export default InitialDropzone;
