import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import Column from '@/components/ui/Column';
import UpdateOrganizationForm from '@/components/UpdateOrganizationForm';
import { useCreateStyles } from '@/hooks/use-app-style';
import useFetchOrganization from '@/hooks/use-fetch-organization';
import { FunctionCreateStyles } from '@/types/style';

const OrganizationInfoPage = () => {
  const styles = useCreateStyles(createStyles);
  const { data: organizationData, isFetched: isOrganizationDataFetched } =
    useFetchOrganization();

  return (
    <>
      <Box sx={styles.page}>
        {!organizationData || !isOrganizationDataFetched ? (
          <LoadingSkeleton />
        ) : (
          <Column sx={styles.container}>
            <UpdateOrganizationForm organization={organizationData} />
          </Column>
        )}
      </Box>
    </>
  );
};

const LoadingSkeleton = () => {
  return (
    <Column>
      <Skeleton width={300} height={40} />
      <Skeleton width={300} height={40} />
      <Skeleton width={300} height={40} />
      <Skeleton width={300} height={40} />
    </Column>
  );
};

const createStyles: FunctionCreateStyles = () => {
  return {
    page: {
      height: '100%',
      padding: '24px',
    },
    container: {},
  };
};

export default OrganizationInfoPage;
