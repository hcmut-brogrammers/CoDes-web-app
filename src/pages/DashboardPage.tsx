import React, { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Labels } from '@/assets';
import { AppRoutes } from '@/constants/app-routes';
import useFetchOrganizations from '@/hooks/use-fetch-organizations';
import useSignOut from '@/hooks/use-sign-out';

const DashboardPage: FC = () => {
  const { data: organizationsData, isFetched: isOrganizationsDatFetched } =
    useFetchOrganizations();
  const navigate = useNavigate();
  const { mutateAsync: signOutAsync } = useSignOut();

  const handleSignOut = async () => await signOutAsync();

  const handleNavigateToCreateOrganization = () => {
    navigate(AppRoutes.CreateOrganization());
  };

  const navigateToOnboarding = useCallback(() => {
    const shouldRedirectToOnboarding =
      !organizationsData?.organizations.length && isOrganizationsDatFetched;
    if (shouldRedirectToOnboarding) {
      navigate(AppRoutes.Onboarding());
    }
  }, [organizationsData, isOrganizationsDatFetched, navigate]);

  useEffect(() => {
    navigateToOnboarding();
  }, [navigateToOnboarding]);

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" onClick={handleNavigateToCreateOrganization}>
          {Labels.Actions.CreateOrganization}
        </Button>
        <Button variant="contained" onClick={handleSignOut}>
          {Labels.Actions.SignOut}
        </Button>
      </Stack>
      <React.Suspense fallback={<Box>Loading...</Box>}>
        <Stack direction="row" spacing={2} sx={{ marginTop: '16px' }}>
          {organizationsData?.organizations.map((organization) => (
            <Box
              key={organization.id}
              sx={{
                borderRadius: '8px',
                border: '1px solid grey',
                padding: '12px',
                width: 'min-content',
              }}
            >
              <Typography>{`Organization: ${organization.name}`}</Typography>
              <Typography>{`Avatar url: ${organization.avatar_url}`}</Typography>
              <Typography>{`Default: ${organization.is_default}`}</Typography>
            </Box>
          ))}
        </Stack>
      </React.Suspense>
    </Box>
  );
};

export default DashboardPage;
