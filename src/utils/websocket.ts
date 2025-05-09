import { WebSocketEvent } from '@/constants/enum';
import {
  IBroadcastMessage,
  ICreateElementMessage,
  ICurrentUsersMessage,
  IDeleteElementMessage,
  IElementCreatedMessage,
  IElementDeletedMessage,
  IElementUpdatedMessage,
  IJoinProjectMessage,
  IMoveCursorMessage,
  IPingMessage,
  IReceiveElementCreatedMessage,
  IReceiveElementDeletedMessage,
  IReceiveElementUpdatedMessage,
  IReceiveUserCursorMovedMessage,
  IReceiveUserJoinedProjectMessage,
  IReceiveUserLeftProjectMessage,
  IUpdateElementMessage,
} from '@/types/websocket';

// NOTE: sender request messages

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

export const createJoinProjectMessage = (
  payload: IJoinProjectMessage['payload'],
): IJoinProjectMessage => {
  return {
    event: WebSocketEvent.JoinProject,
    payload,
  };
};

export const createMoveCursorMessage = (
  payload: IMoveCursorMessage['payload'],
): IMoveCursorMessage => {
  return {
    event: WebSocketEvent.MoveCursor,
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

export const isElementUpdatedMessage = (
  message: unknown,
): message is IElementUpdatedMessage => {
  return (
    Boolean(message) &&
    typeof message === 'object' &&
    (message as { event: unknown }).event === WebSocketEvent.ElementUpdated
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

export const isReceiveUserJoinedProjectMessage = (
  message: unknown,
): message is IReceiveUserJoinedProjectMessage => {
  return (
    Boolean(message) &&
    typeof message === 'object' &&
    (message as { event: unknown }).event ===
      WebSocketEvent.ReceiveUserJoinedProject
  );
};

export const isReceiveUserLeftProjectMessage = (
  message: unknown,
): message is IReceiveUserLeftProjectMessage => {
  return (
    Boolean(message) &&
    typeof message === 'object' &&
    (message as { event: unknown }).event ===
      WebSocketEvent.ReceiveUserLeftProject
  );
};

export const isReceiveUserCursorMovedMessage = (
  message: unknown,
): message is IReceiveUserCursorMovedMessage => {
  return (
    Boolean(message) &&
    typeof message === 'object' &&
    (message as { event: unknown }).event ===
      WebSocketEvent.ReceiveUserCursorMoved
  );
};
