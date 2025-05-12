import { createTheme } from '@mui/material/styles';

import { AppColor } from './app-color';
import { AppStyleVariable } from '.';

const theme = createTheme({
  palette: AppColor,
  cssVariables: true,
  typography: {
    htmlFontSize: 16,
    fontSize: 14,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiTypography: {
      defaultProps: {
        sx: {
          margin: 0,
          textWrap: 'wrap',
        },
      },
      styleOverrides: {
        h1: {},
        h2: {},
        h3: {},
        h4: {},
        h5: {},
        h6: {},
        body1: {},
        body2: {
          fontSize: '14px',
          color: AppColor.caption,
        },
        caption: {},
        paragraph: {},
        subtitle1: {},
        subtitle2: {},
      },
    },
    MuiDivider: {
      defaultProps: {
        variant: 'fullWidth',
        sx: {
          width: '100%',
        },
      },
    },
    MuiSkeleton: {
      defaultProps: {
        variant: 'rectangular',
        animation: 'wave',
      },
    },
    MuiButton: {
      // NOTE: Default props for all buttons
      defaultProps: {
        variant: 'contained',
        sx: {
          textTransform: 'none',
          borderRadius: AppStyleVariable.borderRadius.small,
        },
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            color: AppColor.white,
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            color: AppColor.black,
          },
        },
        {
          props: { variant: 'outlined', color: 'error' },
          style: {
            border: `1px solid ${AppColor.red}`,
            color: AppColor.red,
          },
        },
      ],
    },
  },
});

export default theme;
