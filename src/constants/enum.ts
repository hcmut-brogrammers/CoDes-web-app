export enum ResponseStatus {
  Unauthorized = 401,
  NotFound = 404,
  UnprocesableContent = 422,
}

export enum InvitationStatus {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
}

export enum InviteeAction {
  Accept = 'Accept',
  Reject = 'Reject',
}

export enum ShapeType {
  Rectangle = 'Rectangle',
  Circle = 'Circle',
  Line = 'Line',
  Ellipse = 'Ellipse',
  Arrow = 'Arrow',
  Text = 'Text',
  Ring = 'Ring',
  Star = 'Star',
  RegularPolygon = 'RegularPolygon',
  Image = 'Image',
}

export enum Keyboard {
  Backspace = 'Backspace',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  Enter = 'Enter',
  Delete = 'Delete',
}

export enum WebSocketEvent {
  Ping = 'Ping',
  Broadcast = 'Broadcast',
  // NOTE: sender request events
  CreateElement = 'CreateElement',
  DeleteElement = 'DeleteElement',
  UpdateElement = 'UpdateElement',
  JoinUserCursor = 'JoinUserCursor',
  UpdateUserCursor = 'UpdateUserCursor',
  // NOTE: sender response events
  ElementCreated = 'ElementCreated',
  ElementDeleted = 'ElementDeleted',
  CurrentUsers = 'CurrentUsers',
  // NOTE: receiver events
  ReceiveElementCreated = 'ReceiveElementCreated',
  ReceiveElementDeleted = 'ReceiveElementDeleted',
  ReceiveElementUpdated = 'ReceiveElementUpdated',
  ReceiveUserCursorJoined = 'ReceiveUserCursorJoined',
  ReceiveUserCursorLeft = 'ReceiveUserCursorLeft',
  ReceiveUserCursorUpdated = 'ReceiveUserCursorUpdated',
}

export enum CursorStatus {
  Online = 'Online',
  Offline = 'Offline',
}
