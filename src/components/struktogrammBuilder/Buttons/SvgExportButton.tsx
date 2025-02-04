import React from "react";
import swal from "sweetalert2";

interface SvgExportButtonProps {
  /** Breite des exportierten SVGs */
  width: number;
  /** Höhe des exportierten SVGs */
  height: number;
}

const SvgExportButton: React.FC<SvgExportButtonProps> = ({ width, height }) => {
  const handleExport = () => {
    // Suche nach dem Element mit der Klasse "blocks-container"
    const blocksContainer = document.querySelector(".blocks-container");
    if (!blocksContainer) {
      swal.fire(
        "Fehler",
        "Kein Inhalt mit der Klasse 'blocks-container' gefunden!",
        "error"
      );
      return;
    }

    // Hole den HTML-Inhalt des Blocks
    const htmlContent = blocksContainer.outerHTML;

    // Erstelle einen SVG-String, der den HTML-Inhalt über ein foreignObject einbettet.
    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml">
            ${htmlContent}
          </div>
        </foreignObject>
      </svg>
    `;

    // Erstelle einen Blob aus dem SVG-String
    const svgBlob = new Blob([svgString], {
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

    // Gib die URL wieder frei
    URL.revokeObjectURL(svgUrl);
  };

  const handleButtonClick = () => {
    swal
      .fire({
        title: "SVG exportieren",
        text: "Möchten Sie das Struktogramm als SVG exportieren?",
        icon: "info",
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `
    <i class="fa fa-thumbs-up"></i> Great!
  `,
        confirmButtonAriaLabel: "Thumbs up, great!",
        cancelButtonText: `
    <i class="fa fa-thumbs-down"></i>
  `,
        cancelButtonAriaLabel: "Thumbs down",
      })
      .then((willExport) => {
        if (willExport) {
          handleExport();
        }
      });
  };

  return <button onClick={handleButtonClick}>SVG exportieren</button>;
};

export default SvgExportButton;
