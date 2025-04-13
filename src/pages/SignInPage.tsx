import { FC } from 'react';
import Box from '@mui/material/Box';

import SignInForm from '@/components/SignInForm';

const SignInPage: FC = () => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SignInForm />
    </Box>
  );
};
export default SignInPage;
