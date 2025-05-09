import { WebSocketEvent } from '@/constants/enum';

import { DesignElement } from './design-element';
import { UserRole } from './user';

export interface IUserCursor {
  user_id: string;
  username: string;
  x: number;
  y: number;
}

export interface ISender {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

export interface IWebSocketMessage<
  TEvent extends WebSocketEvent = WebSocketEvent,
  TPayload = unknown,
> {
  event: TEvent;
  payload: TPayload;
}

// NOTE: sender request messages

export interface IPingMessage
  extends IWebSocketMessage<WebSocketEvent.Ping, { message: string }> {}

export interface IBroadcastMessage
  extends IWebSocketMessage<WebSocketEvent.Broadcast, { message: string }> {}

export interface ICreateElementMessage
  extends IWebSocketMessage<
    WebSocketEvent.CreateElement,
    { temporary_element_id: string; element: DesignElement }
  > {}

export interface IDeleteElementMessage
  extends IWebSocketMessage<
    WebSocketEvent.DeleteElement,
    { element_id: string }
  > {}

export interface IUpdateElementMessage
  extends IWebSocketMessage<
    WebSocketEvent.UpdateElement,
    { element_id: string; element: DesignElement }
  > {}

export interface IJoinProjectMessage
  extends IWebSocketMessage<WebSocketEvent.JoinProject, { user_id: string }> {}

export interface IMoveCursorMessage
  extends IWebSocketMessage<
    WebSocketEvent.MoveCursor,
    { user_cursor: IUserCursor }
  > {}

// NOTE: sender response messages

export interface IElementCreatedMessage
  extends IWebSocketMessage<
    WebSocketEvent.ElementCreated,
    { temporary_element_id_element_map: Record<string, DesignElement> }
  > {}

export interface IElementDeletedMessage
  extends IWebSocketMessage<
    WebSocketEvent.ElementDeleted,
    { deleted_element_id: string }
  > {}

export interface IElementUpdatedMessage
  extends IWebSocketMessage<
    WebSocketEvent.ElementUpdated,
    { updated_element_id: string; updated_element: DesignElement }
  > {}

export interface ICurrentUsersMessage
  extends IWebSocketMessage<
    WebSocketEvent.CurrentUsers,
    { users: ISender[] }
  > {}

// NOTE: receiver response messages

export interface IReceiverMessage {
  sender: ISender;
}

export interface IReceiveElementCreatedMessage
  extends IWebSocketMessage<
    WebSocketEvent.ReceiveElementCreated,
    {
      element: DesignElement;
    } & IReceiverMessage
  > {}

export interface IReceiveElementDeletedMessage
  extends IWebSocketMessage<
    WebSocketEvent.ReceiveElementDeleted,
    {
      deleted_element_id: string;
    } & IReceiverMessage
  > {}

export interface IReceiveElementUpdatedMessage
  extends IWebSocketMessage<
    WebSocketEvent.ReceiveElementDeleted,
    {
      updated_element_id: string;
      updated_element: DesignElement;
    } & IReceiverMessage
  > {}

export interface IReceiveUserJoinedProjectMessage
  extends IWebSocketMessage<
    WebSocketEvent.ReceiveUserJoinedProject,
    IReceiverMessage
  > {}

export interface IReceiveUserLeftProjectMessage
  extends IWebSocketMessage<
    WebSocketEvent.ReceiveUserLeftProject,
    IReceiverMessage
  > {}

export interface IReceiveUserCursorMovedMessage
  extends IWebSocketMessage<
    WebSocketEvent.ReceiveUserCursorMoved,
    {
      sender_cursor: IUserCursor;
    } & IReceiverMessage
  > {}
