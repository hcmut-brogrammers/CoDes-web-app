export enum MutationKey {
  SignUp = 'SignUp',
  SignIn = 'SignIn',
  SignOut = 'SignOut',
  CreateOrganization = 'CreateOrganization',
  UpdateOrganization = 'UpdateOrganization',
  DeleteOrganization = 'DeleteOrganization',
  DeleteDesignProject = 'DeleteDesignProject',
  RefreshToken = 'RefreshToken',
  SwitchOrganization = 'SwitchOrganization',
  CreateInvitations = 'CreateInvitations',
  TakeInvitationAction = 'TakeInvitationAction',
  UninviteMember = 'UninviteMember',
  MarkInvitationAsRead = 'MarkInvitationAsRead',
  MarkInvitationAsUnread = 'MarkInvitationAsUnread',
  CreateDesignProject = 'CreateDesignProject',
  DuplicateDesignProject = 'DuplicateDesignProject',
}

export enum QueryKey {
  Organizations = 'Organizations',
  OrganizationMembers = 'OrganizationMembers',
  Users = 'Users',
  UserInvitations = 'UserInvitations',
  DesignProjects = 'DesignProjects',
  DesignElements = 'DesignElements',
}
