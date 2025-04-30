import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

import Sidebar from '@/components/Sidebar';
import Row from '@/components/ui/Row';
import { useCreateStyles } from '@/hooks/use-app-style';
import { FunctionCreateStyles } from '@/types/style';

const DashboardPage: FC = () => {
  const styles = useCreateStyles(createStyles);
  return (
    <Row sx={styles.container}>
      <Sidebar />
      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>
    </Row>
  );
};

const createStyles: FunctionCreateStyles = () => {
  return {
    container: {
      height: '100%',
    },
  };
};

export default DashboardPage;
