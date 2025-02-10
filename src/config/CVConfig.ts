// src/config/templateConfig.ts
export const A4_ASPECT_RATIO = 297 / 210; // ca. 1.414

// Maximale Höhe der Vorschau (z. B. für einen Laptop)
export const MAX_PREVIEW_HEIGHT = 678; // in px

export const TEMPLATE_WIDTH = 595; // Beispielbreite in px (A4 bei 72 DPI)
export const TEMPLATE_HEIGHT = Math.round(TEMPLATE_WIDTH * A4_ASPECT_RATIO); // ca. 842 px

// Für die Editor-Vorschau verwenden wir einen Skalierungsfaktor, z.B. 0.5:
export const PREVIEW_SCALE = 0.5;
export const PREVIEW_WIDTH = Math.round(TEMPLATE_WIDTH * PREVIEW_SCALE);
export const PREVIEW_HEIGHT = Math.round(TEMPLATE_HEIGHT * PREVIEW_SCALE);
