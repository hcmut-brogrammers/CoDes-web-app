import { FC } from 'react';
import Stack, { StackProps } from '@mui/material/Stack';

interface IProps extends StackProps {}

const Column: FC<IProps> = ({
  direction = 'column',
  spacing = 2,
  ...props
}) => {
  return <Stack {...props} direction={direction} spacing={spacing} />;
};

export default Column;
