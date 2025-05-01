import { FC, PropsWithChildren } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import MuiModal, { ModalProps as MuiModalProps } from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import { useCreateStyles } from '@/hooks/use-app-style';
import { mergeSx } from '@/styles/helper';
import { FunctionCreateStyles } from '@/types/style';

interface IProps
  extends Omit<MuiModalProps, 'onClose' | 'children'>,
    PropsWithChildren {
  title?: string;
  containerProps?: BoxProps;
  onClose: () => void;
}
export type ModalProps = IProps;

const Modal: FC<IProps> = ({
  title,
  containerProps,
  children,
  onClose,
  ...props
}) => {
  const styles = useCreateStyles(createStyles);
  return (
    <MuiModal {...props} onClose={onClose}>
      <Box
        {...containerProps}
        sx={mergeSx(styles.container, containerProps?.sx)}
      >
        <Box sx={styles.header}>
          <Typography variant="h5" sx={styles.title}>
            {title}
          </Typography>
        </Box>
        {children}
      </Box>
    </MuiModal>
  );
};

const createStyles: FunctionCreateStyles = (theme) => {
  return {
    container: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '24px',
      backgroundColor: theme.palette.white,
      boxShadow: 6,
    },
    header: {
      marginBottom: '16px',
    },
    title: {
      textAlign: 'center',
    },
  };
};

export default Modal;
