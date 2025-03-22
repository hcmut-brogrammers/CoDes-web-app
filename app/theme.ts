'use client';

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  // TODO: research
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-roboto)'
  }
})

export default theme;