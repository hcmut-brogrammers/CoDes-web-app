import { createTheme } from '@mui/material/styles';

import { AppColor } from './app-color';

const theme = createTheme({
  palette: AppColor,
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  components: {
    MuiTypography: {
      defaultProps: {
        sx: {
          textWrap: 'wrap',
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
          maxWidth: 'fit-content',
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
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
