import { FC } from 'react';
import Box from '@mui/material/Box';

import SignUpForm from '@/components/SignUpForm';
import CodesLogo from '@/components/ui/CodesLogo';
import Column from '@/components/ui/Column';
import ComputerHeroBanner from '@/components/ui/ComputerHeroBanner';
import Row from '@/components/ui/Row';
import { useCreateStyles } from '@/hooks/use-app-style';
import { FunctionCreateStyles } from '@/types/style';

const SignUpPage: FC = () => {
  const styles = useCreateStyles(createStyles);
  return (
    <Row sx={styles.page}>
      <Box sx={styles.heroBanner}>
        <ComputerHeroBanner />
      </Box>
      <Column gap={4} sx={styles.form}>
        <CodesLogo width={100} />
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
