// src/routes/api/auth/login/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { hashPassword, verifyPassword, generateAccessToken, generateRefreshToken } from '$lib/utils/crypto.utils';
import type { User } from '$lib/types/auth.types';

/**
 * Mock user database
 * In production, replace with actual database queries
 */
const MOCK_USERS: (User & { passwordHash: string })[] = [
  {
    id: crypto.randomUUID(),
    email: 'admin@aido.it',
    passwordHash: await hashPassword('admin123'), // Pre-hashed in production
    nome: 'Admin AIDO',
    ruolo: 'admin',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: crypto.randomUUID(),
    email: 'utente@aido.it',
    passwordHash: await hashPassword('user123'),
    nome: 'Utente Test',
    ruolo: 'user',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

/**
 * POST /api/auth/login
 * Authenticate user and return JWT tokens
 */
export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const { email, password } = await request.json();

    // Input validation
    if (!email || !password) {
      return json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = MOCK_USERS.find(u => u.email === email);
    if (!user) {
      return json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.passwordHash);
    if (!isValidPassword) {
      return json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user.id);

    // Set refresh token as HTTP-only cookie
    cookies.set('refreshToken', refreshToken, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    });

    // Return user data and access token
    const { passwordHash: _, ...userPublic } = user;

    return json({
      user: userPublic,
      tokens: {
        accessToken,
        refreshToken // Also return in body for mobile apps
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};