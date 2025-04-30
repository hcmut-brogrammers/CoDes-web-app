import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface IExtendedPalette {
    black: string;
    white: string;
    hover: string;
    selected: string;
    border: string;
    red: string;
  }

  interface Palette extends IExtendedPalette {}
}
