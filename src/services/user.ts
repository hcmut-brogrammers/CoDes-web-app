import apiClient from '@/api-client';
import { ApiEndpoint } from '@/constants/api';

interface ISearchUsersByEmailResponse {
  users: {
    id: string;
    email: string;
    username: string;
  }[];
}
export const searchUsersByEmail = async (email: string) => {
  return await apiClient.get<ISearchUsersByEmailResponse>(
    ApiEndpoint.UsersByEmail(email),
  );
};
