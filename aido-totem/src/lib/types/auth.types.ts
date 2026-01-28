// src/lib/types/auth.types.ts
export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  nome: string;
  ruolo: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JWTPayload {
  sub: string; // user id
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface SessionUser {
  id: string;
  email: string;
  nome: string;
  ruolo: UserRole;
}