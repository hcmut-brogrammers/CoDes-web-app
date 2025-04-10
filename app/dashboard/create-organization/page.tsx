'use client';

import Box from '@mui/material/Box';

import CreateOrganizationForm from '@/_components/CreateOrganizationForm';
import { useCreateStyles } from '@/_hooks/use-app-style';
import { FunctionCreateStyles } from '@/_types/style';

export default function Page() {
  const styles = useCreateStyles(createStyles);
  return (
    <Box sx={styles.container}>
      <CreateOrganizationForm />
    </Box>
  );
}

const createStyles: FunctionCreateStyles = () => {
  return {
    container: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
};
