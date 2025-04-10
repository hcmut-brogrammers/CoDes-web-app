import { useTheme } from '@mui/material/styles';

import {
  FunctionCreateConditionalStyle,
  FunctionCreateStyles,
  IAppTheme,
} from '@/_types/style';

export const useCreateStyles = (
  createStyles: FunctionCreateStyles,
): ReturnType<typeof createStyles> => {
  const theme = useTheme();
  const appTheme = theme as IAppTheme;
  return createStyles(appTheme);
};

export const useCreateConditionalStyles = (
  createConditionStyles: FunctionCreateConditionalStyle,
) => {
  const theme = useTheme();
  const appTheme = theme as IAppTheme;
  return createConditionStyles(appTheme);
};
