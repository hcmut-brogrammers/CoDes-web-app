import { FC } from 'react';
import Stack, { StackProps } from '@mui/material/Stack';

interface IProps extends StackProps {}

const Row: FC<IProps> = ({
  direction = 'row',
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
    />
  );
};

export default Row;
