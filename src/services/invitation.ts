import apiClient from '@/api-client';
import { ApiEndpoint } from '@/constants/api';
import { IInvitation, IUserInvitation } from '@/types/invitation';

interface ICreateInvitationsParams {
  user_ids: string[];
}
interface ICreateInvitationsResponse {
  invitations: IInvitation[];
}
export const createInvitations = async (
  params: ICreateInvitationsParams,
): Promise<ICreateInvitationsResponse> => {
  return await apiClient.post<
    ICreateInvitationsResponse,
    ICreateInvitationsParams
  >(ApiEndpoint.Invitations(), params);
};

interface IFetchUserInvitationsResponse {
  invitations: IUserInvitation[];
}
export const fetchUserInvitations =
  async (): Promise<IFetchUserInvitationsResponse> => {
    return await apiClient.get<IFetchUserInvitationsResponse>(
      ApiEndpoint.Invitations(),
    );
  };

export interface IMarkUserInvitationAsReadParams {
  invitation_id: string;
}
interface IMarkUserInvitationAsReadResponse {
  success: boolean;
}
export const markUserInvitationAsRead = async (
  params: IMarkUserInvitationAsReadParams,
) => {
  return await apiClient.post<IMarkUserInvitationAsReadResponse>(
    ApiEndpoint.MarkInvitationAsRead(params.invitation_id),
  );
};

export interface IMarkUserInvitationAsUnreadParams
  extends IMarkUserInvitationAsReadParams {}
interface IMarkUserInvitationAsUnreadResponse
  extends IMarkUserInvitationAsReadResponse {}
export const markUserInvitationAsUnread = async (
  params: IMarkUserInvitationAsUnreadParams,
) => {
  return await apiClient.post<IMarkUserInvitationAsUnreadResponse>(
    ApiEndpoint.MarkInvitationAsUnread(params.invitation_id),
  );
};
