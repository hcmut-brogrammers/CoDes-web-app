import { InvitationStatus, InviteeAction } from '@/constants/enum';

interface ITakenAction {
  action: InviteeAction;
  taken_at: string;
}

export interface IInvitation {
  id: string;
  organization_id: string;
  sender_id: string;
  receiver_id: string;
  status: InvitationStatus;
  taken_action: Nilable<ITakenAction>;
  expires_at: string;
  created_at: string;
  updated_at: Nilable<string>;
  deleted_at: Nilable<string>;
  is_deleted: boolean;
}
