import { FC } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

import { useCreateStyles } from '@/hooks/use-app-style';
import { mergeSx } from '@/styles/helper';
import { FunctionCreateStyles } from '@/types/style';

interface IProps extends ButtonProps {}
const ActionButton: FC<IProps> = ({ children, ...props }) => {
  const styles = useCreateStyles(createStyles);
  return (
    <Button {...props} sx={mergeSx(styles.button, props?.sx)}>
      {children}
    </Button>
  );
};

const createStyles: FunctionCreateStyles = () => {
  return {
    button: {
      textTransform: 'none',
    },
  };
};

export default ActionButton;
