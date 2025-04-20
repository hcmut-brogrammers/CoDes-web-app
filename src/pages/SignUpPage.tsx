import { FC } from 'react';
import Box from '@mui/material/Box';

import SignUpForm from '@/components/SignUpForm';

const SignUpPage: FC = () => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SignUpForm />
    </Box>
  );
};

export default SignUpPage;
