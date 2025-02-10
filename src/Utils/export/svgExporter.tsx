import React, { useRef } from "react";

interface SvgExporterProps {
  /** Breite des exportierten SVGs */
  width: number;
  /** Höhe des exportierten SVGs */
  height: number;
  /** Die HTML-Inhalte (z. B. Dein Struktogramm), die im SVG eingebettet werden sollen */
  children: React.ReactNode;
}

const SvgExporter: React.FC<SvgExporterProps> = ({
  width,
  height,
  children,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const handleExport = () => {
    if (!svgRef.current) return;

    // Serialisiere das SVG in einen String
    const svgData = new XMLSerializer().serializeToString(svgRef.current);

    // Erstelle einen Blob aus den SVG-Daten
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const svgUrl = URL.createObjectURL(svgBlob);

    // Erstelle ein temporäres <a>-Element und simuliere einen Klick zum Download
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "struktogram.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Optional: URL wieder freigeben
    URL.revokeObjectURL(svgUrl);
  };

  return (
    <div>
      {/* Button zum Export */}
      <button onClick={handleExport}>Export as SVG</button>

      {/* Das SVG, das die kompletten Struktogramm-Divs enthält */}
      <svg
        ref={svgRef}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
      >
        <foreignObject width="100%" height="100%">
          {/* Wichtig: Setze hier den richtigen Namespace für HTML */}
          <svg xmlns="http://www.w3.org/1999/xhtml">{children}</svg>
        </foreignObject>
      </svg>
    </div>
  );
};

export default SvgExporter;
