import { ITokenData } from '@/types/authentication';
import { UserRole } from '@/types/user';

export const MockAuthenticationData = {
  mockTokenData: (): ITokenData => ({
    email: '',
    exp: 0,
    role: UserRole.OrganizationAdmin,
    sub: '',
    user_id: '',
    username: '',
  }),
};
