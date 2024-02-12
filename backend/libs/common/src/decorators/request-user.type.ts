import { JwtPayload } from '../types';

export interface IRequestUser extends JwtPayload {
  refreshToken?: string;
}
