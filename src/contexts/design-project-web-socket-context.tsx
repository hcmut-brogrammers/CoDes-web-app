import { createContext } from 'react';
import {
  WebSocketHook,
  WebSocketLike,
} from 'react-use-websocket/dist/lib/types';

import { DesignElement } from '@/types/design-element';
import { IUserCursor } from '@/types/websocket';

const DesignProjectWebSocketContext = createContext<
  Pick<
    WebSocketHook,
    | 'readyState'
    | 'lastMessage'
    | 'lastJsonMessage'
    | 'sendMessage'
    | 'sendJsonMessage'
    | 'getWebSocket'
  > & {
    webSocket: WebSocketLike | null;
    sendCreateElementMessage: (
      temporaryElementId: string,
      element: DesignElement,
    ) => void;
    sendDeleteElementMessage: (elementId: string) => void;
    sendUpdateElementMessage: (
      elementId: string,
      element: DesignElement,
    ) => void;
    sendMoveCursorMessage: (userCursor: IUserCursor) => void;
  }
>({
  webSocket: null,
  readyState: 0,
  lastMessage: null,
  lastJsonMessage: null,
  sendMessage: () => {},
  sendJsonMessage: () => {},
  getWebSocket: () => null,
  sendCreateElementMessage: () => {},
  sendDeleteElementMessage: () => {},
  sendUpdateElementMessage: () => {},
  sendMoveCursorMessage: () => {},
});

export default DesignProjectWebSocketContext;
