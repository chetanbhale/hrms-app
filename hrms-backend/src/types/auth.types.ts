export interface JwtPayload {
  id: string;
  role: string;
  clientId?: string;
}

export interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
  role: string;
  clientId?: string;
}