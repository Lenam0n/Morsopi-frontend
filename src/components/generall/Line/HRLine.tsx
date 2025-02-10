import React from "react";
import "./HRLine.css";

type HRLineProps = {
  styleClass: "Heading";
};

export const HRLine: React.FC<HRLineProps> = ({ styleClass }) => {
  return <hr className={styleClass} />;
};
