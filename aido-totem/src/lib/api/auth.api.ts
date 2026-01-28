// src/lib/api/auth.api.ts
import type { UserCredentials, AuthTokens, SessionUser } from '$lib/types/auth.types';

/**
 * Login user and get auth tokens
 */
export async function login(credentials: UserCredentials): Promise<{
  user: SessionUser;
  tokens: AuthTokens;
}> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  return response.json();
}

/**
 * Logout user
 */
export async function logout(): Promise<void> {
  await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include'
  });
}

/**
 * Refresh access token
 */
export async function refreshToken(): Promise<AuthTokens> {
  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Token refresh failed');
  }

  return response.json();
}