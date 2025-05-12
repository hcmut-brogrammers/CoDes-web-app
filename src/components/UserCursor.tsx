import { FC } from 'react';
import Box from '@mui/material/Box';

import { useCreateStyles } from '@/hooks/use-app-style';
import { mergeSx, uuidToHashedColor } from '@/styles/helper';
import { FunctionCreateStyles } from '@/types/style';
import { IUserCursor } from '@/types/websocket';

const UserCursor: FC<{ userCursor: IUserCursor }> = ({ userCursor }) => {
  const styles = useCreateStyles(createStyles);
  const {
    position: { x, y },
    user_id,
    username,
  } = userCursor;
  const color = uuidToHashedColor(user_id);

  return (
    <Box sx={mergeSx(styles.cursor, { left: x, top: y })}>
      {/* Cursor triangle (looks like a system pointer) */}
      <Cursor color={color} />
      {username && (
        <Box
          sx={mergeSx(styles.label, { color, border: `1px solid ${color}` })}
        >
          {username}
        </Box>
      )}
    </Box>
  );
};

const Cursor: FC<{ color: string }> = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        strokeWidth="1"
        d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.35Z"
      ></path>
    </svg>
  );
};

const createStyles: FunctionCreateStyles = () => {
  return {
    cursor: {
      position: 'absolute',

      transform: 'translate(-2px, -2px)',
      pointerEvents: 'none',
      zIndex: 1000,
    },
    label: {
      position: 'absolute',
      top: 24,
      left: 0,
      backgroundColor: 'white',
      fontSize: '12px',
      padding: '2px 4px',
      borderRadius: 4,
      whiteSpace: 'nowrap',
      transform: 'translateX(-20%)',
    },
  };
};

export default UserCursor;
