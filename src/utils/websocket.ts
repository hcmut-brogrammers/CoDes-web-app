import { ReadyState } from 'react-use-websocket';

import { WebSocketEvent } from '@/constants/enum';
import {
  IBroadcastMessage,
  ICreateElementMessage,
  ICurrentUsersMessage,
  IDeleteElementMessage,
  IElementCreatedMessage,
  IElementDeletedMessage,
  IJoinUserCursorMessage,
  IPingMessage,
  IReceiveElementCreatedMessage,
  IReceiveElementDeletedMessage,
  IReceiveElementUpdatedMessage,
  IReceiveUserCursorJoinedMessage,
  IReceiveUserCursorLeftMessage,
  IReceiveUserCursorUpdatedMessage,
  IUpdateElementMessage,
  IUpdateUserCursorMessage,
} from '@/types/websocket';

// NOTE: sender request messages

export const connectionStatuses = {
  [ReadyState.CONNECTING]: 'Connecting',
  [ReadyState.OPEN]: 'Open',
  [ReadyState.CLOSING]: 'Closing',
  [ReadyState.CLOSED]: 'Closed',
  [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
};

export const createPingMessage = (
  payload: IPingMessage['payload'],
): IPingMessage => {
  return {
    event: WebSocketEvent.Ping,
    payload,
  };
};

export const createBroadcastMessage = (
  payload: IBroadcastMessage['payload'],
): IBroadcastMessage => {
  return {
    event: WebSocketEvent.Broadcast,
    payload,
  };
};

export const createCreateElementMessage = (
  payload: ICreateElementMessage['payload'],
): ICreateElementMessage => {
  return {
    event: WebSocketEvent.CreateElement,
    payload,
  };
};

export const createDeleteElementMessage = (
  payload: IDeleteElementMessage['payload'],
): IDeleteElementMessage => {
  return {
    event: WebSocketEvent.DeleteElement,
    payload,
  };
};

export const createUpdateElementMessage = (
  payload: IUpdateElementMessage['payload'],
): IUpdateElementMessage => {
  return {
    event: WebSocketEvent.UpdateElement,
    payload,
  };
};

export const createJoinUserCursorMessage = (
  payload: IJoinUserCursorMessage['payload'],
): IJoinUserCursorMessage => {
  return {
    event: WebSocketEvent.JoinUserCursor,
    payload,
  };
};

export const createUpdateUserCursorMessage = (
  payload: IUpdateUserCursorMessage['payload'],
): IUpdateUserCursorMessage => {
  return {
    event: WebSocketEvent.UpdateUserCursor,
    payload,
  };
};

// NOTE: sender response messages

// TODO: unsafe check, need to improve
export const isElementCreatedMessage = (
  message: unknown,
): message is IElementCreatedMessage => {
  return (
    Boolean(message) &&
    typeof message === 'object' &&
    (message as { event: unknown }).event === WebSocketEvent.ElementCreated
  );
};

export const isElementDeletedMessage = (
  message: unknown,
): message is IElementDeletedMessage => {
  return (
    Boolean(message) &&
    typeof message === 'object' &&
    (message as { event: unknown }).event === WebSocketEvent.ElementDeleted
  );
};

export const isCurrentUsersMessage = (
  message: unknown,
): message is ICurrentUsersMessage => {
  return (
    Boolean(message) &&
    typeof message === 'object' &&
    (message as { event: unknown }).event === WebSocketEvent.CurrentUsers
  );
};

// NOTE: receiver messages

export const isReceiveElementCreatedMessage = (
  message: unknown,
): message is IReceiveElementCreatedMessage => {
  return (
    Boolean(message) &&
    typeof message === 'object' &&
    (message as { event: unknown }).event ===
      WebSocketEvent.ReceiveElementCreated
  );
};

export const isReceiveElementDeletedMessage = (
  message: unknown,
): message is IReceiveElementDeletedMessage => {
  return (
    Boolean(message) &&
    typeof message === 'object' &&
    (message as { event: unknown }).event ===
      WebSocketEvent.ReceiveElementDeleted
  );
};

export const isReceiveElementUpdatedMessage = (
  message: unknown,
): message is IReceiveElementUpdatedMessage => {
  return (
    Boolean(message) &&
    typeof message === 'object' &&
    (message as { event: unknown }).event ===
      WebSocketEvent.ReceiveElementUpdated
  );
};

export const isReceiveUserCursorJoinedMessage = (
  message: unknown,
): message is IReceiveUserCursorJoinedMessage => {
  return (
    Boolean(message) &&
    typeof message === 'object' &&
    (message as { event: unknown }).event ===
      WebSocketEvent.ReceiveUserCursorJoined
  );
};

export const isReceiveUserCursorLeftMessage = (
  message: unknown,
): message is IReceiveUserCursorLeftMessage => {
  return (
    Boolean(message) &&
    typeof message === 'object' &&
    (message as { event: unknown }).event ===
      WebSocketEvent.ReceiveUserCursorLeft
  );
};

export const isReceiveUserCursorUpdatedMessage = (
  message: unknown,
): message is IReceiveUserCursorUpdatedMessage => {
  return (
    Boolean(message) &&
    typeof message === 'object' &&
    (message as { event: unknown }).event ===
      WebSocketEvent.ReceiveUserCursorUpdated
  );
};
