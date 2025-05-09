import { useContext } from 'react';

import DesignProjectWebSocketContext from '@/contexts/design-project-web-socket-context';

const useDesignProjectWebSocket = () => {
  return useContext(DesignProjectWebSocketContext);
};

export default useDesignProjectWebSocket;
