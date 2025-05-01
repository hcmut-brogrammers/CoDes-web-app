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
