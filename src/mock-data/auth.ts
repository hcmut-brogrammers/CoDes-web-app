import { ITokenData } from '@/types/auth';
import { UserRole } from '@/types/user';

export const MockAuthenticationData = {
  mockTokenData: (): ITokenData => ({
    organization_id: '',
    email: '',
    exp: 0,
    role: UserRole.OrganizationAdmin,
    sub: '',
    user_id: '',
    username: '',
  }),
};
