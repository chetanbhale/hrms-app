import { UserRole } from "../constants/roles";

export interface JwtPayload {
  id: string;
  role: UserRole;
  clientId?: string;
}

export interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  clientId?: string;
}