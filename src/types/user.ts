export enum UserRole {
  OrganizationAdmin = 'OrganizationAdmin',
  OrganizationMember = 'OrganizationMember',
}

export interface IMatchedUser {
  id: string;
  email: string;
  username: string;
}
