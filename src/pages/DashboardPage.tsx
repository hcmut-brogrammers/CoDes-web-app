import { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Labels } from '@/assets';
import useSignOut from '@/hooks/use-sign-out';
import useGlobalStore from '@/stores/global-store';

const DashboardPage: FC = () => {
  const { mutateAsync: signOutAsync } = useSignOut();
  const { accessToken, refreshTokenId: refreshToken } = useGlobalStore();

  const handleSignOut = async () => await signOutAsync();

  return (
    <Box>
      <Typography>Dashboard page</Typography>
      <Typography>{`access token: ${accessToken}`}</Typography>
      <Typography>{`refresh token: ${refreshToken}`}</Typography>
      <Button variant="contained" onClick={handleSignOut}>
        {Labels.Actions.SignOut}
      </Button>
    </Box>
  );
};

export default DashboardPage;
