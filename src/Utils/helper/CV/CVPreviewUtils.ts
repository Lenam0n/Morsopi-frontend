// src/Utils/helper/CVPreviewUtils.ts
import { A4_ASPECT_RATIO } from "../../../config/CVConfig";
import Templates from "../../../container/cv-builder/Templates/TemplateIndex";

const { Full } = Templates;
/**
 * Berechnet die Dimensionen für die CVPreview.
 * @param availableWidth Verfügbare Breite des übergeordneten Elements.
 * @param maxPreviewHeight Maximale Höhe, die erreicht werden darf.
 * @returns Ein Objekt mit { width, height }.
 */
export function calculatePreviewDimensions(
  availableWidth: number,
  maxPreviewHeight: number
): { width: number; height: number } {
  const lockWidth = maxPreviewHeight / A4_ASPECT_RATIO;
  let newWidth: number, newHeight: number;
  if (availableWidth >= lockWidth) {
    newWidth = lockWidth;
    newHeight = maxPreviewHeight;
  } else {
    newWidth = availableWidth;
    newHeight = availableWidth * A4_ASPECT_RATIO;
  }
  return { width: newWidth, height: newHeight };
}

/**
 * Erstellt ein Mapping der Full-Templates.
 * Entfernt den Suffix "_full" und wandelt die Keys in Kleinbuchstaben um.
 */
export function getTemplateFullMapping(): { [key: string]: keyof typeof Full } {
  return Object.keys(Full).reduce((acc, fullKey) => {
    const id = fullKey.replace(/_full$/, "").toLowerCase();
    acc[id] = fullKey as keyof typeof Full;
    return acc;
  }, {} as { [key: string]: keyof typeof Full });
}

/**
 * Ermittelt den Full-Key für ein gegebenes TemplateInfo-Objekt.
 * Hier wird angenommen, dass im TemplateInfo das Feld previewKey gespeichert ist.
 * @param template Das TemplateInfo-Objekt
 * @returns Der passende Full-Key oder undefined.
 */
export function getFullKeyForTemplate(template: {
  previewKey: string;
}): keyof typeof Full | undefined {
  const mapping = getTemplateFullMapping();
  return mapping[template.previewKey.toLowerCase()];
}
