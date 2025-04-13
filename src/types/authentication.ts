import { UserRole } from './user';

export interface ITokenData {
  user_id: string;
  username: string;
  email: string;
  role: UserRole;
  sub: string;
  exp: number;
}
