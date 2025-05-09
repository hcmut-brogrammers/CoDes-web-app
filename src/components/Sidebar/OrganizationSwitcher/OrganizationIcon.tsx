import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useCreateStyles } from '@/hooks/use-app-style';
import { AppStyleVariable } from '@/styles';
import { mergeSx, uuidToHashedColor } from '@/styles/helper';
import { FunctionCreateStyles } from '@/types/style';

interface IProps {
  organizationId: string;
  organizationName: string;
}
const OrganizationIcon: FC<IProps> = ({ organizationId, organizationName }) => {
  const styles = useCreateStyles(createStyles);

  const color = uuidToHashedColor(organizationId);
  const firstLetter = organizationName.charAt(0).toUpperCase();

  return (
    <Box sx={mergeSx(styles.icon, { backgroundColor: color })}>
      <Typography>{firstLetter}</Typography>
    </Box>
  );
};

const createStyles: FunctionCreateStyles = (theme) => {
  return {
    icon: {
      width: '24px',
      height: '24px',
      borderRadius: AppStyleVariable.borderRadius.medium,
      color: theme.palette.white,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
};

export default OrganizationIcon;
