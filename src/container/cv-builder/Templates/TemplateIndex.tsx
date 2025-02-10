// src/components/Templates/TemplateIndex.tsx
import React from "react";
import { CvTemp1 } from "./Temp1/cvTemp1_Preview";
import { CvTemp2 } from "./Temp2/cvTemp2_Preview";
import { CvTemp1Full } from "./Temp1/cvTemp1_full";

// Gruppiere beide Objekte in einem kombinierten Objekt
const Templates = {
  Preview: {
    Template1: <CvTemp1 />,
    Template2: <CvTemp2 />,
  },
  Full: {
    Template1_full: CvTemp1Full,
  },
};

export default Templates;
