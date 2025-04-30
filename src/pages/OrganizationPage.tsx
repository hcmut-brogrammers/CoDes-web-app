import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { OrganizationPageParams } from '@/types/page';

const OrganizationPage = () => {
  const { organizationId } = useParams<OrganizationPageParams>();
  return (
    <Box>
      <Typography>{`Current organization id: ${organizationId}`}</Typography>
    </Box>
  );
};

export default OrganizationPage;
