import { SxProps, Theme } from '@mui/material/styles';

const fontSizeBody = 14;
export const DefaultStyles = {
  fontSizeBody,
  fontSizeBodyInPx: `${fontSizeBody}px`,
  fontFamily: 'Roboto',
  lineHeight: 1.5,
};

interface RGB {
  r: number;
  g: number;
  b: number;
}
export const hexToRgb = (hex: string): Undefinable<RGB> => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return;
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
};

export const hexToRgba = (hex: string, opacity: number = 1) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const verifiedOpacity = opacity > 1 || opacity < 0 ? 1 : opacity;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${verifiedOpacity})`;
};

export const shadeHex = (hex: string, shadeFactor: number = 0.2) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const verifiedShadeFactor =
    shadeFactor > 1 || shadeFactor < 0 ? 1 : shadeFactor;
  const shadedRgb = {
    r: rgb.r * (1 - verifiedShadeFactor),
    g: rgb.g * (1 - verifiedShadeFactor),
    b: rgb.b * (1 - verifiedShadeFactor),
  };
  return `rgb(${shadedRgb.r}, ${shadedRgb.g}, ${shadedRgb.b})`;
};

export const uuidToHashedColor = (uuid: string): string => {
  if (!uuid) return '#000000';

  let hash = 0;
  for (let i = 0; i < uuid.length; i++) {
    hash = uuid.charCodeAt(i) + ((hash << 5) - hash);
    hash |= 0; // force to 32-bit integer
  }

  const r = (hash >> 16) & 0xff;
  const g = (hash >> 8) & 0xff;
  const b = hash & 0xff;

  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`;
};

export const mergeSx = (
  ...sx: (Nilable<SxProps<Theme>> | Nilable<SxProps<Theme>>[])[]
): SxProps<Theme> => {
  if (!Array.isArray(sx)) {
    return sx;
  }

  return sx.reduce((acc, curr) => {
    if (Array.isArray(curr)) {
      return { ...acc, ...mergeSx(...curr) } as SxProps<Theme>;
    }

    return { ...acc, ...curr } as SxProps<Theme>;
  }, {}) as SxProps<Theme>;
};
