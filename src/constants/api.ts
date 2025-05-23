export const ApiEndpoint = {
  SignUp: () => '/authenticate/sign-up',
  SignIn: () => '/authenticate/authenticate-user',
  RefreshToken: () => '/authenticate/refresh-access-token',
  Organizations: () => '/organizations',
  Organization: (organizationId: string) =>
    `${ApiEndpoint.Organizations()}/${organizationId}`,
  OrganizationMembers: () => `${ApiEndpoint.Organizations()}/members`,
  SwitchOrganization: () =>
    `${ApiEndpoint.Organizations()}/switch-organization`,
  UsersByEmail: (email: string) => `/users?email=${email}`,
  Invitations: () => '/join-organization-invitations',
  MarkInvitationAsRead: (invitationId: string) =>
    `${ApiEndpoint.Invitations()}/${invitationId}/mark-read`,
  MarkInvitationAsUnread: (invitationId: string) =>
    `${ApiEndpoint.Invitations()}/${invitationId}/mark-unread`,
  TakeInvitationAction: () => `${ApiEndpoint.Invitations()}/action`,
  UninviteMember: () => `${ApiEndpoint.Organizations()}/uninvite-member`,
  DesignProjects: () => '/design-projects',
  DuplicateDesignProject: (designProjectId: string) =>
    `${ApiEndpoint.DesignProjects()}/${designProjectId}/duplicate`,
  DeleteDesignProject: (designProjectId: string) =>
    `${ApiEndpoint.DesignProjects()}/${designProjectId}`,
  DesignElements: (designProjectId: string) =>
    `${ApiEndpoint.DesignProjects()}/${designProjectId}/elements`,
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
