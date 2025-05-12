import { FC } from 'react';
import Box from '@mui/material/Box';

import SignInForm from '@/components/SignInForm';
import CodesLogo from '@/components/ui/CodesLogo';
import Column from '@/components/ui/Column';
import ComputerHeroBanner from '@/components/ui/ComputerHeroBanner';
import Row from '@/components/ui/Row';
import { useCreateStyles } from '@/hooks/use-app-style';
import { FunctionCreateStyles } from '@/types/style';

const SignInPage: FC = () => {
  const styles = useCreateStyles(createStyles);
  return (
    <Row sx={styles.page}>
      <Box sx={styles.heroBanner}>
        <ComputerHeroBanner />
      </Box>
      <Column gap={4} sx={styles.form}>
        <CodesLogo width={100} />
        <SignInForm />
      </Column>
    </Row>
  );
};

const createStyles: FunctionCreateStyles = () => {
  return {
    page: {
      height: '100%',
      display: 'flex',
    },
    heroBanner: {
      height: '100%',
      flex: 1,
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
export default SignInPage;
