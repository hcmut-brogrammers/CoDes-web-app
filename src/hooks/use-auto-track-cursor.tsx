import { useCallback, useEffect } from 'react';

import useAuthStore from '@/stores/auth-store';
import useDesignProjectStore from '@/stores/design-project-store';

import useDesignProjectWebSocket from './use-design-project-websocket';

const useAutoTrackCursor = () => {
  const { tokenData } = useAuthStore();
  const { getMyUserCursor } = useDesignProjectStore();
  const { sendUpdateUserCursorMessage } = useDesignProjectWebSocket();

  const userCursor = getMyUserCursor();

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!userCursor || !tokenData) return;

      sendUpdateUserCursorMessage({
        ...userCursor,
        position: {
          x: e.clientX,
          y: e.clientY,
        },
      });
    },
    [userCursor, tokenData, sendUpdateUserCursorMessage],
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);
};

export default useAutoTrackCursor;
