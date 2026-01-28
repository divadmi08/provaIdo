// src/lib/config/env.ts
export const ENV = {
  JWT_SECRET: import.meta.env.VITE_JWT_SECRET || 'dev-secret-change-in-prod',
  JWT_EXPIRES_IN: '7d',
  JWT_REFRESH_EXPIRES_IN: '30d',
  BCRYPT_ROUNDS: 10
} as const;