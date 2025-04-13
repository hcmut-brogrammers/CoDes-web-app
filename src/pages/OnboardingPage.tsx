import { FC } from 'react';
import Box from '@mui/material/Box';

import CreateOrganizationForm from '@/components/CreateOrganizationForm';
import { useCreateStyles } from '@/hooks/use-app-style';
import { FunctionCreateStyles } from '@/types/style';

const OnboardingPage: FC = () => {
  const styles = useCreateStyles(createStyles);
  return (
    <Box sx={styles.container}>
      <CreateOrganizationForm />
    </Box>
  );
};

const createStyles: FunctionCreateStyles = () => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
  };
};

export default OnboardingPage;
