import { FC, ReactNode, useCallback, useEffect, useMemo } from 'react';
import useWebSocket from 'react-use-websocket';
import { useDebounceCallback } from 'usehooks-ts';

import { Labels } from '@/assets';
import { appEnv } from '@/constants/app-env';
import { CursorStatus } from '@/constants/enum';
import DesignProjectWebSocketContext from '@/contexts/design-project-web-socket-context';
import useAuthStore from '@/stores/auth-store';
import useDesignProjectStore from '@/stores/design-project-store';
import useGlobalStore from '@/stores/global-store';
import { DesignElement } from '@/types/design-element';
import {
  ICurrentUsersMessage,
  IElementCreatedMessage,
  IElementDeletedMessage,
  IReceiveElementCreatedMessage,
  IReceiveElementDeletedMessage,
  IReceiveElementUpdatedMessage,
  IReceiveUserCursorJoinedMessage,
  IReceiveUserCursorLeftMessage,
  IReceiveUserCursorUpdatedMessage,
  ISender,
  IUpdateElementMessage,
  IUserCursor,
} from '@/types/websocket';
import { getCurrentDateTime } from '@/utils/common';
import {
  createCreateElementMessage,
  createDeleteElementMessage,
  createJoinUserCursorMessage,
  createUpdateElementMessage,
  createUpdateUserCursorMessage,
  isCurrentUsersMessage,
  isElementCreatedMessage,
  isElementDeletedMessage,
  isReceiveElementCreatedMessage,
  isReceiveElementDeletedMessage,
  isReceiveElementUpdatedMessage,
  isReceiveUserCursorJoinedMessage,
  isReceiveUserCursorLeftMessage,
  isReceiveUserCursorUpdatedMessage,
} from '@/utils/websocket';

interface IProps {
  children: ReactNode;
}

const DEBOUNCE_DELAY_IN_MS = 50;
const DesignProjectWebSocketProvider: FC<IProps> = ({ children }) => {
  const {
    updateElement,
    addElement,
    removeElement,
    setIsConnectedToWebSocket,
    addUserCursor,
    updateUserCursor,
    addUserCursors,
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
          sendJoinUserCursorMessage({
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

  const debouncedSendUpdateElementJsonMessage = useDebounceCallback(
    (message: IUpdateElementMessage) => {
      sendJsonMessage(message);
    },
    DEBOUNCE_DELAY_IN_MS,
  );

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
    [updateElement],
  );

  const handleElementDeletedMessage = useCallback(
    (message: IElementDeletedMessage) => {
      const { deleted_element_id } = message.payload;
      removeElement(deleted_element_id);
    },
    [removeElement],
  );

  const handleCurrentUsersMessage = useCallback(
    (message: ICurrentUsersMessage) => {
      const { users } = message.payload;
      const userCursors: IUserCursor[] = users.map((user) => ({
        id: user.id,
        user_id: user.id,
        username: user.username,
        email: user.email,
        selected_element_id: null,
        status: CursorStatus.Online,
        position: {
          x: 0,
          y: 0,
        },
      }));
      addUserCursors(userCursors);
    },
    [addUserCursors],
  );

  // NOTE: receiver message response handlers

  const handleReceiveElementCreatedMessage = useCallback(
    (message: IReceiveElementCreatedMessage) => {
      const { element } = message.payload;
      addElement(element);
    },
    [addElement],
  );

  const handleReceiveElementDeletedMessage = useCallback(
    (message: IReceiveElementDeletedMessage) => {
      const { deleted_element_id } = message.payload;
      removeElement(deleted_element_id);
    },
    [removeElement],
  );

  const handleReceiveElementUpdatedMessage = useCallback(
    (message: IReceiveElementUpdatedMessage) => {
      const { updated_element_id, updated_element } = message.payload;
      updateElement(updated_element_id, () => updated_element);
    },
    [updateElement],
  );

  const handleReceiveUserCursorJoinedMessage = useCallback(
    (message: IReceiveUserCursorJoinedMessage) => {
      const { sender } = message.payload;
      addUserCursor({
        id: sender.id,
        user_id: sender.id,
        username: sender.username,
        email: sender.email,
        selected_element_id: null,
        status: CursorStatus.Online,
        position: {
          x: 0,
          y: 0,
        },
      });
    },
    [addUserCursor],
  );

  const handleReceiveUserCursorLeftMessage = useCallback(
    (message: IReceiveUserCursorLeftMessage) => {
      const { sender } = message.payload;
      removeUserCursor(sender.id);
    },
    [removeUserCursor],
  );

  const handleReceiveUserCursorUpdatedMessage = useCallback(
    (message: IReceiveUserCursorUpdatedMessage) => {
      const { user_cursor: sender_cursor } = message.payload;
      updateUserCursor(sender_cursor.user_id, () => sender_cursor);
    },
    [updateUserCursor],
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

      if (isReceiveUserCursorJoinedMessage(lastJsonMessage)) {
        handleReceiveUserCursorJoinedMessage(lastJsonMessage);
      }

      if (isReceiveUserCursorUpdatedMessage(lastJsonMessage)) {
        handleReceiveUserCursorUpdatedMessage(lastJsonMessage);
      }

      if (isReceiveUserCursorLeftMessage(lastJsonMessage)) {
        handleReceiveUserCursorLeftMessage(lastJsonMessage);
      }
    }
  }, [
    lastJsonMessage,
    handleElementCreatedMessage,
    handleElementDeletedMessage,
    handleCurrentUsersMessage,
    handleReceiveElementCreatedMessage,
    handleReceiveElementDeletedMessage,
    handleReceiveElementUpdatedMessage,
    handleReceiveUserCursorJoinedMessage,
    handleReceiveUserCursorUpdatedMessage,
    handleReceiveUserCursorLeftMessage,
  ]);

  // NOTE: sender messsage requests
  const sendJoinUserCursorMessage = useCallback(
    (user: ISender) => {
      const message = createJoinUserCursorMessage({
        user_id: user.id,
      });
      sendJsonMessage(message);
      addUserCursor({
        id: user.id,
        user_id: user.id,
        username: user.username,
        email: user.email,
        selected_element_id: null,
        status: CursorStatus.Online,
        position: {
          x: 0,
          y: 0,
        },
      });
    },
    [sendJsonMessage, addUserCursor],
  );

  const sendCreateElementMessage = useCallback(
    (temporaryElementId: string, element: DesignElement) => {
      const message = createCreateElementMessage({
        temporary_element_id: temporaryElementId,
        element,
      });
      sendJsonMessage(message);
      addElement(element);
    },
    [sendJsonMessage, addElement],
  );

  const sendUpdateElementMessage = useCallback(
    (elementId: string, element: DesignElement) => {
      const updatedElement: DesignElement = {
        ...element,
        updated_at: getCurrentDateTime(),
      };
      const message = createUpdateElementMessage({
        element_id: elementId,
        element: updatedElement,
      });
      debouncedSendUpdateElementJsonMessage(message);
      updateElement(elementId, () => updatedElement);
    },
    [updateElement],
  );

  const sendDeleteElementMessage = useCallback(
    (elementId: string) => {
      const message = createDeleteElementMessage({
        element_id: elementId,
      });
      sendJsonMessage(message);
    },
    [sendJsonMessage],
  );

  const sendUpdateUserCursorMessage = useCallback(
    (userCursor: IUserCursor) => {
      const message = createUpdateUserCursorMessage({
        user_cursor: userCursor,
      });
      updateUserCursor(userCursor.user_id, () => userCursor);
      sendJsonMessage(message);
    },
    [updateUserCursor],
  );

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
      sendUpdateUserCursorMessage,
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
      sendUpdateUserCursorMessage,
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
