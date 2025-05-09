import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import SignUpForm from '@/components/SignUpForm';
import Column from '@/components/ui/Column';
import Row from '@/components/ui/Row';
import { useCreateStyles } from '@/hooks/use-app-style';
import { FunctionCreateStyles } from '@/types/style';

const SignUpPage: FC = () => {
  const styles = useCreateStyles(createStyles);
  return (
    <Row sx={styles.page}>
      <Box sx={styles.heroBanner}>
        <Typography>Logo</Typography>
      </Box>
      <Column sx={styles.form}>
        <SignUpForm />
      </Column>
    </Row>
  );
};

const createStyles: FunctionCreateStyles = (theme) => {
  return {
    page: {
      height: '100%',
      display: 'flex',
    },
    heroBanner: {
      height: '100%',
      flex: 1,
      backgroundColor: theme.palette.hover,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    form: {
      flex: 1,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
};

export default SignUpPage;
