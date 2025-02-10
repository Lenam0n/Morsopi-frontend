// src/components/ImageArea.tsx
import React from "react";

interface ImageAreaProps {
  imageUrl?: string;
  onImageChange?: (file: File) => void;
}

const ImageArea: React.FC<ImageAreaProps> = ({ imageUrl, onImageChange }) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange?.(e.target.files[0]);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "300px",
        border: "2px dashed #ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="CV Bild"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      ) : (
        <span>Bild hier hochladen</span>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{
          opacity: 0,
          position: "absolute",
          width: "100%",
          height: "100%",
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default ImageArea;
