// WebSocketContext.tsx
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import useWebSocket from 'react-use-websocket';
import {
  WebSocketHook,
  WebSocketLike,
} from 'react-use-websocket/dist/lib/types';

import { Labels } from '@/assets';
import { appEnv } from '@/constants/app-env';
import useAuthStore from '@/stores/auth-store';
import useDesignProjectStore from '@/stores/design-project-store';
import useGlobalStore from '@/stores/global-store';
import { DesignElement } from '@/types/design-element';
import {
  ICurrentUsersMessage,
  IElementCreatedMessage,
  IElementDeletedMessage,
  IElementUpdatedMessage,
  IReceiveElementCreatedMessage,
  IReceiveElementDeletedMessage,
  IReceiveElementUpdatedMessage,
  IReceiveUserCursorMovedMessage,
  IReceiveUserJoinedProjectMessage,
  IReceiveUserLeftProjectMessage,
  ISender,
  IUserCursor,
} from '@/types/websocket';
import {
  createCreateElementMessage,
  createDeleteElementMessage,
  createJoinProjectMessage,
  createMoveCursorMessage,
  createUpdateElementMessage,
  isCurrentUsersMessage,
  isElementCreatedMessage,
  isElementDeletedMessage,
  isElementUpdatedMessage,
  isReceiveElementCreatedMessage,
  isReceiveElementDeletedMessage,
  isReceiveElementUpdatedMessage,
  isReceiveUserCursorMovedMessage,
  isReceiveUserJoinedProjectMessage,
  isReceiveUserLeftProjectMessage,
} from '@/utils/websocket';

export const DesignProjectWebSocketContext = createContext<
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

interface IProps {
  children: ReactNode;
}

const DesignProjectWebSocketProvider: FC<IProps> = ({ children }) => {
  const {
    setUsers,
    updateElement,
    addElement,
    removeElement,
    setIsConnectedToWebSocket,
    addUsers,
    addUser,
    addUserCursor,
    updateUserCursor,
    addUserCursors,
    removeUser,
    removeUserCursor,
  } = useDesignProjectStore();
  const { tokenData, checkIfIsAuthenticated } = useAuthStore();
  const { currentOrganizationId, currentDesignProjectId } = useGlobalStore();

  const socketUrl = createWebSocketUrl(currentDesignProjectId);
  const shouldConnect =
    !!currentOrganizationId &&
    !!currentDesignProjectId &&
    checkIfIsAuthenticated();
  const {
    readyState,
    lastMessage,
    lastJsonMessage,
    sendMessage,
    sendJsonMessage,
    getWebSocket,
  } = useWebSocket(
    socketUrl,
    {
      shouldReconnect: () => true,
      share: true,
      retryOnError: true,
      onOpen: () => {
        setIsConnectedToWebSocket(true);

        if (tokenData) {
          sendJoinProjectMessage({
            id: tokenData.user_id,
            username: tokenData.username,
            email: tokenData.email,
            role: tokenData.role,
          });
        }
      },
      onClose: () => {
        setIsConnectedToWebSocket(false);
      },
      onError: (error) => {
        setIsConnectedToWebSocket(false);
        console.error(Labels.Console.Error.WebSocketConnection, error);
      },
    },
    shouldConnect,
  );
  const webSocket = getWebSocket();

  // NOTE: sender message response handlers
  const handleElementCreatedMessage = useCallback(
    (message: IElementCreatedMessage) => {
      const temporaryElementIdElementMap =
        message.payload.temporary_element_id_element_map;

      for (const temporaryElementId in temporaryElementIdElementMap) {
        const element = temporaryElementIdElementMap[temporaryElementId];
        updateElement(temporaryElementId, (prevElement) => ({
          ...prevElement,
          ...element,
          id: element.id,
        }));
      }
    },
    [],
  );

  const handleElementDeletedMessage = useCallback(
    (message: IElementDeletedMessage) => {
      const { deleted_element_id } = message.payload;
      removeElement(deleted_element_id);
    },
    [],
  );

  const handleElementUpdatedMessage = useCallback(
    (message: IElementUpdatedMessage) => {
      const { updated_element_id, updated_element } = message.payload;
      updateElement(updated_element_id, () => updated_element);
    },
    [],
  );

  const handleCurrentUsersMessage = useCallback(
    (message: ICurrentUsersMessage) => {
      const { users } = message.payload;
      addUsers(users);

      const userCursors: IUserCursor[] = users.map((user) => ({
        user_id: user.id,
        username: user.username,
        x: 0,
        y: 0,
      }));
      addUserCursors(userCursors);
    },
    [],
  );

  // NOTE: receiver message response handlers

  const handleReceiveElementCreatedMessage = useCallback(
    (message: IReceiveElementCreatedMessage) => {
      const { element } = message.payload;
      addElement(element);
    },
    [],
  );

  const handleReceiveElementDeletedMessage = useCallback(
    (message: IReceiveElementDeletedMessage) => {
      const { deleted_element_id } = message.payload;
      removeElement(deleted_element_id);
    },
    [],
  );

  const handleReceiveElementUpdatedMessage = useCallback(
    (message: IReceiveElementUpdatedMessage) => {
      const { updated_element_id, updated_element } = message.payload;
      updateElement(updated_element_id, () => updated_element);
    },
    [],
  );

  const handleReceiveUserJoinedProjectMessage = useCallback(
    (message: IReceiveUserJoinedProjectMessage) => {
      const { sender } = message.payload;
      addUser(sender);
      addUserCursor({
        user_id: sender.id,
        username: sender.username,
        x: 0,
        y: 0,
      });
    },
    [],
  );

  const handleReceiveUserLeftProjectMessage = useCallback(
    (message: IReceiveUserLeftProjectMessage) => {
      const { sender } = message.payload;
      removeUser(sender.id);
      removeUserCursor(sender.id);
    },
    [],
  );

  const handleReceiveUserCursorMovedMessage = useCallback(
    (message: IReceiveUserCursorMovedMessage) => {
      const { sender_cursor } = message.payload;
      updateUserCursor(sender_cursor.user_id, () => sender_cursor);
    },
    [],
  );

  useEffect(() => {
    if (lastJsonMessage) {
      // NOTE: handle element created by current user message
      if (isElementCreatedMessage(lastJsonMessage)) {
        handleElementCreatedMessage(lastJsonMessage);
      }

      // NOTE: handle element deleted by current user message
      if (isElementDeletedMessage(lastJsonMessage)) {
        handleElementDeletedMessage(lastJsonMessage);
      }

      // NOTE: handle element updated by current user message
      if (isElementUpdatedMessage(lastJsonMessage)) {
        handleElementUpdatedMessage(lastJsonMessage);
      }

      if (isCurrentUsersMessage(lastJsonMessage)) {
        handleCurrentUsersMessage(lastJsonMessage);
      }

      // NOTE: update element created by other user
      if (isReceiveElementCreatedMessage(lastJsonMessage)) {
        handleReceiveElementCreatedMessage(lastJsonMessage);
      }

      // NOTE: receive element deleted by other user
      if (isReceiveElementDeletedMessage(lastJsonMessage)) {
        handleReceiveElementDeletedMessage(lastJsonMessage);
      }

      // NOTE: receive element updated by other user
      if (isReceiveElementUpdatedMessage(lastJsonMessage)) {
        handleReceiveElementUpdatedMessage(lastJsonMessage);
      }

      if (isReceiveUserJoinedProjectMessage(lastJsonMessage)) {
        handleReceiveUserJoinedProjectMessage(lastJsonMessage);
      }

      if (isReceiveUserCursorMovedMessage(lastJsonMessage)) {
        handleReceiveUserCursorMovedMessage(lastJsonMessage);
      }

      if (isReceiveUserLeftProjectMessage(lastJsonMessage)) {
        handleReceiveUserLeftProjectMessage(lastJsonMessage);
      }
    }
  }, [lastJsonMessage]);

  // NOTE: sender messsage requests
  const sendJoinProjectMessage = useCallback((user: ISender) => {
    const message = createJoinProjectMessage({
      user_id: user.id,
    });
    sendJsonMessage(message);
    setUsers([user]);
    addUserCursor({
      user_id: user.id,
      username: user.username,
      x: 0,
      y: 0,
    });
  }, []);

  const sendCreateElementMessage = useCallback(
    (temporaryElementId: string, element: DesignElement) => {
      const message = createCreateElementMessage({
        temporary_element_id: temporaryElementId,
        element,
      });
      sendJsonMessage(message);
      addElement(element);
    },
    [],
  );

  const sendUpdateElementMessage = useCallback(
    (elementId: string, element: DesignElement) => {
      const message = createUpdateElementMessage({
        element_id: elementId,
        element,
      });
      sendJsonMessage(message);
      updateElement(elementId, () => element);
    },
    [],
  );

  const sendDeleteElementMessage = useCallback((elementId: string) => {
    const message = createDeleteElementMessage({
      element_id: elementId,
    });
    sendJsonMessage(message);
  }, []);

  const sendMoveCursorMessage = useCallback((userCursor: IUserCursor) => {
    const message = createMoveCursorMessage({
      user_cursor: userCursor,
    });
    sendJsonMessage(message);
    updateUserCursor(userCursor.user_id, () => userCursor);
  }, []);

  const value = useMemo(
    () => ({
      webSocket,
      readyState,
      lastMessage,
      lastJsonMessage,
      sendMessage,
      sendJsonMessage,
      getWebSocket,
      sendCreateElementMessage,
      sendDeleteElementMessage,
      sendUpdateElementMessage,
      sendMoveCursorMessage,
    }),
    [
      webSocket,
      readyState,
      lastMessage,
      lastJsonMessage,
      sendMessage,
      sendJsonMessage,
      getWebSocket,
      sendCreateElementMessage,
      sendDeleteElementMessage,
      sendUpdateElementMessage,
      sendMoveCursorMessage,
    ],
  );

  return (
    <DesignProjectWebSocketContext.Provider value={value}>
      {children}
    </DesignProjectWebSocketContext.Provider>
  );
};

const createWebSocketUrl = (designProjectId: string) => {
  const { accessToken } = useAuthStore.getState();
  if (!accessToken) {
    return '';
  }

  const url = `${appEnv.WebSocketUrl}/ws/design-projects/${designProjectId}?access_token=${accessToken}`;
  return url;
};

export default DesignProjectWebSocketProvider;
