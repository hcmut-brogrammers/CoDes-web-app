import { FC } from 'react';
import Box from '@mui/material/Box';

import { useCreateStyles } from '@/hooks/use-app-style';
import useAuthStore from '@/stores/auth-store';
import { mergeSx, uuidToHashedColor } from '@/styles/helper';
import { FunctionCreateStyles } from '@/types/style';

const MyUserIcon: FC = () => {
  const styles = useCreateStyles(createStyles);
  const { tokenData } = useAuthStore();

  const color = uuidToHashedColor(tokenData.user_id);
  const firstLetter = tokenData.username.charAt(0).toUpperCase();

  return (
    <Box
      sx={mergeSx(styles.icon, {
        backgroundColor: color,
      })}
    >
      {firstLetter}
    </Box>
  );
};

const createStyles: FunctionCreateStyles = (theme) => {
  return {
    icon: {
      color: theme.palette.white,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      height: '30px',
      width: '30px',
    },
  };
};

export default MyUserIcon;
