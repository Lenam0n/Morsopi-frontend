import React from "react";

export interface IconButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  title?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  disabled,
  children,
  title,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        background: "none",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        fontSize: "1.5rem",
        margin: "0 5px",
        padding: 0,
      }}
    >
      {children}
    </button>
  );
};

export default IconButton;
