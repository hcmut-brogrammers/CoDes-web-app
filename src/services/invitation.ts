import apiClient from '@/api-client';
import { ApiEndpoint } from '@/constants/api';
import { IInvitation } from '@/types/invitation';

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
