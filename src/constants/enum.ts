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
}

export enum Keyboard {
  Backspace = 'Backspace',
}

export enum WebSocketEvent {
  Ping = 'Ping',
  Broadcast = 'Broadcast',
  // NOTE: sender request events
  CreateElement = 'CreateElement',
  DeleteElement = 'DeleteElement',
  UpdateElement = 'UpdateElement',
  JoinProject = 'JoinProject',
  MoveCursor = 'MoveCursor',
  // NOTE: sender response events
  ElementCreated = 'ElementCreated',
  ElementDeleted = 'ElementDeleted',
  ElementUpdated = 'ElementUpdated',
  CurrentUsers = 'CurrentUsers',
  // NOTE: receiver events
  ReceiveElementCreated = 'ReceiveElementCreated',
  ReceiveElementDeleted = 'ReceiveElementDeleted',
  ReceiveElementUpdated = 'ReceiveElementUpdated',
  ReceiveUserJoinedProject = 'ReceiveUserJoinedProject',
  ReceiveUserLeftProject = 'ReceiveUserLeftProject',
  ReceiveUserCursorMoved = 'ReceiveUserCursorMoved',
}
