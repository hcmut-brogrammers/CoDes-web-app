import { UserRole } from './user';

interface IJoinOrganizationMember {
  member_id: string;
  member_role: UserRole;
  joined_at: string;
}

export interface IJoinedOrganization {
  organization_id: string;
  role: UserRole;
  joined_at: string;
}

export interface IOrganization {
  id: string;
  name: string;
  is_default: boolean;
  avatar_url?: string;
  owner_id: string;
  members: IJoinOrganizationMember[];
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface IOrganizationMember {
  member_id: string;
  username: string;
  email: string;
  role: UserRole;
  joined_at: string;
}
