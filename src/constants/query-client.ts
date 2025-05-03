export enum MutationKey {
  SignUp = 'SignUp',
  SignIn = 'SignIn',
  SignOut = 'SignOut',
  CreateOrganization = 'CreateOrganization',
  UpdateOrganization = 'UpdateOrganization',
  DeleteOrganization = 'DeleteOrganization',
  RefreshToken = 'RefreshToken',
  SwitchOrganization = 'SwitchOrganization',
  CreateInvitations = 'CreateInvitations',
  TakeInvitationAction = 'TakeInvitationAction',
  UninviteMember = 'UninviteMember',
  MarkInvitationAsRead = 'MarkInvitationAsRead',
  MarkInvitationAsUnread = 'MarkInvitationAsUnread',
}

export enum QueryKey {
  Organizations = 'Organizations',
  OrganizationMembers = 'OrganizationMembers',
  Users = 'Users',
  UserInvitations = 'UserInvitations',
}
