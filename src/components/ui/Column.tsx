import { FC } from 'react';
import Stack, { StackProps } from '@mui/material/Stack';

import { mergeSx } from '@/styles/helper';

interface IProps extends StackProps {}

const Column: FC<IProps> = ({
  direction = 'column',
  justifyContent = 'flex-start',
  alignItems = 'flex-start',
  ...props
}) => {
  return (
    <Stack
      {...props}
      direction={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}
      sx={mergeSx({ width: '100%' }, props?.sx)}
    />
  );
};

export default Column;
