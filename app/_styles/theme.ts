'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // TODO: research
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  components: {
    MuiButton: {
      // NOTE: Default props for all buttons
      defaultProps: {
        variant: 'contained',
      },
      // NOTE: Overriding styles based on existing props
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: 'contained' },
              style: {},
            },
          ],
        },
      },
    },
  },
});

export default theme;
