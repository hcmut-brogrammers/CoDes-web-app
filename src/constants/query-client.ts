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
  MarkInvitationAsRead = 'MarkInvitationAsRead',
  MarkInvitationAsUnread = 'MarkInvitationAsUnread',
}

export enum QueryKey {
  Organizations = 'Organizations',
  Users = 'Users',
  UserInvitations = 'UserInvitations',
}
