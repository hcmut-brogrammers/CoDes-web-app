import { useContext } from 'react';

import { DesignProjectWebSocketContext } from '@/providers/DesignProjectWebSocketProvider';

const useDesignProjectWebSocket = () => {
  return useContext(DesignProjectWebSocketContext);
};

export default useDesignProjectWebSocket;
