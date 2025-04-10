'use client';

import Box from '@mui/material/Box';

import { Labels } from '@/_assets';
import RedirectLink from '@/_components/RedirectLink';
import SignInForm from '@/_components/SignInForm';
import { AppRoutes } from '@/_constants/app-routes';
import { useCreateStyles } from '@/_hooks/use-app-style';
import { FunctionCreateStyles } from '@/_types/style';

export default function Page() {
  const styles = useCreateStyles(createStyles);
  return (
    <Box sx={styles.container}>
      <SignInForm />
      <RedirectLink href={AppRoutes.SignUp} label={Labels.Actions.SignUp} />
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
