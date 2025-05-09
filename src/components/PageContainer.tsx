import { FC } from 'react';
import Box, { BoxProps } from '@mui/material/Box';

import { useCreateStyles } from '@/hooks/use-app-style';
import { mergeSx } from '@/styles/helper';
import { FunctionCreateStyles } from '@/types/style';

interface IProps extends BoxProps {}
const PageContainer: FC<IProps> = ({ children, ...props }) => {
  const styles = useCreateStyles(createStyles);

  return (
    <Box {...props} sx={mergeSx(styles.page, props?.sx)}>
      {children}
    </Box>
  );
};

const createStyles: FunctionCreateStyles = () => {
  return {
    page: {
      height: '100%',
      padding: '16px',
    },
  };
};
export default PageContainer;
