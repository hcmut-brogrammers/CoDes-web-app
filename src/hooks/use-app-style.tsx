import { useTheme } from '@mui/material/styles';

import {
  FunctionCreateConditionalStyles,
  FunctionCreateStyles,
  IAppTheme,
} from '@/types/style';

export const useCreateStyles = (createStyles: FunctionCreateStyles) => {
  const theme = useTheme();
  const appTheme = theme as IAppTheme;

  return createStyles(appTheme);
};

export const useCreateConditionalStyles = (
  createConditionStyles: FunctionCreateConditionalStyles,
) => {
  const theme = useTheme();
  const appTheme = theme as IAppTheme;

  return createConditionStyles(appTheme);
};
