import { CSSObject, Theme } from '@mui/material/styles';

interface ITransitionParams {
  theme: Theme;
  props: string[];
}
export const AppStylesVariable = {
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
  },
  iconFontSize: {
    small: '20px',
    medium: '24px',
    large: '28px',
  },
  transition: {
    open: ({ theme, props }: ITransitionParams): CSSObject => {
      return {
        transition: theme.transitions.create(props, {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      };
    },
    close: ({ theme, props }: ITransitionParams): CSSObject => {
      return {
        transition: theme.transitions.create(props, {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      };
    },
  },
};

export const CommonSelector = {
  Paper: '& .MuiPaper-root',
};
