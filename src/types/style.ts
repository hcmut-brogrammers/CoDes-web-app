import { SxProps, Theme } from '@mui/material';

export interface IAppTheme extends Theme {}

export type StyleProps = Record<string, SxProps>;
export type FunctionCreateStyles = (theme: IAppTheme) => StyleProps;

export type FunctionCreateConditionalStyleItem<
  C extends Record<string, Nilable<boolean>> = Record<string, Nilable<boolean>>,
> = (condition: C) => SxProps;
export type ConditionalStyleProps<K extends string = string> = Record<
  K,
  FunctionCreateConditionalStyleItem
>;
export type FunctionCreateConditionalStyles = (
  theme: IAppTheme,
) => ConditionalStyleProps;
