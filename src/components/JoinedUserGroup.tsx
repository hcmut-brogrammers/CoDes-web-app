import { FC } from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { useCreateStyles } from '@/hooks/use-app-style';
import useDesignProjectStore from '@/stores/design-project-store';
import { mergeSx, uuidToHashedColor } from '@/styles/helper';
import { FunctionCreateStyles } from '@/types/style';
import { IUserCursor } from '@/types/websocket';

const JoinedUserGroup: FC = () => {
  const { userCursors } = useDesignProjectStore();
  return (
    <AvatarGroup max={5} spacing="small">
      {userCursors.map((userCursor) => (
        <JoinedUser key={userCursor.user_id} userCursor={userCursor} />
      ))}
    </AvatarGroup>
  );
};

const JoinedUser: FC<{ userCursor: IUserCursor }> = ({ userCursor }) => {
  const styles = useCreateStyles(createStyles);

  const firstLetter = userCursor.username.charAt(0).toUpperCase();
  const color = uuidToHashedColor(userCursor.user_id);

  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
    >
      <Avatar
        alt={userCursor.username}
        sx={mergeSx({ bgcolor: color }, styles.avatar)}
      >
        <Typography variant="body1">{firstLetter}</Typography>
      </Avatar>
    </StyledBadge>
  );
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(0.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(0.9)',
      opacity: 0,
    },
  },
}));

const createStyles: FunctionCreateStyles = () => {
  return {
    avatar: {
      width: '32px',
      height: '32px',
    },
  };
};

export default JoinedUserGroup;
