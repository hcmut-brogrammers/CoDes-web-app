export interface IOrganization {
  id: string;
  name: string;
  is_default: boolean;
  avatar_url?: string;
  owner_id: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}
