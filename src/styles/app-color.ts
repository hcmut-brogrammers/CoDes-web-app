import { IExtendedPalette, Palette } from '@mui/material/styles';

import { hexToRgba } from './helper';

const PrimaryMain = '#2D69FF';
const Black = '#000000';
const White = '#FFFFFF';

export const AppColor: IAppColor = {
  primary: {
    main: PrimaryMain,
    light: PrimaryMain,
    contrastText: PrimaryMain,
    dark: PrimaryMain,
  },
  black: Black,
  white: White,
  hover: '#e6e6e6',
  selected: '#d1e3ff',
  active: '#d1e3ff',
  border: '#e3e3e3',
  red: '#ff0000',
  // NOTE: text colors
  caption: hexToRgba(Black, 0.6),
};

// NOTE: define for typescript usage
interface IAppColor extends IExtendedPalette, Pick<Palette, 'primary'> {}
