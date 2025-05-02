export const ApiEndpoint = {
  SignUp: () => '/authenticate/sign-up',
  SignIn: () => '/authenticate/authenticate-user',
  RefreshToken: () => '/authenticate/refresh-access-token',
  Organizations: () => '/organizations',
  Organization: (organizationId: string) =>
    `${ApiEndpoint.Organizations()}/${organizationId}`,
  SwitchOrganization: () =>
    `${ApiEndpoint.Organizations()}/switch-organization`,
  UsersByEmail: (email: string) => `/users?email=${email}`,
  Invitations: () => '/join-organization-invitations',
  MarkInvitationAsRead: (invitationId: string) =>
    `${ApiEndpoint.Invitations()}/${invitationId}/mark-read`,
  MarkInvitationAsUnread: (invitationId: string) =>
    `${ApiEndpoint.Invitations()}/${invitationId}/mark-unread`,
};

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum RequestHeader {
  ContentType = 'Content-Type',
  Authorization = 'Authorization',
}
