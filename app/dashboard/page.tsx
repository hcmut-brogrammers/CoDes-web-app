'use client';

import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { Labels } from '@/_assets';
import { AppRoutes } from '@/_constants/app-routes';
import useSignOut from '@/_hooks/use-sign-out';
import { fetchOrganizations } from '@/_services/organization';

const Page: FC = () => {
  // TODO: 1st GET request does not have authorization header but 2nd has
  const { data } = useQuery({
    queryKey: ['organizations'],
    queryFn: fetchOrganizations,
  });
  const router = useRouter();
  const { mutateAsync: signOutAsync } = useSignOut();

  const handleSignOut = async () => await signOutAsync();

  const handleNavigateToCreateOrganization = () => {
    router.push(AppRoutes.CreateOrganization());
  };

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
          {data?.organizations.map((organization) => (
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
            </Box>
          ))}
        </Stack>
      </React.Suspense>
    </Box>
  );
};

export default Page;
