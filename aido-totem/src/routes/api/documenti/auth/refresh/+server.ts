// src/routes/api/auth/refresh/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { verifyToken, generateAccessToken, generateRefreshToken } from '$lib/utils/crypto.utils';

export const POST: RequestHandler = async ({ cookies }) => {
  try {
    const refreshToken = cookies.get('refreshToken');

    if (!refreshToken) {
      return json(
        { error: 'No refresh token provided' },
        { status: 401 }
      );
    }

    // Verify refresh token
    const payload = verifyToken(refreshToken);

    if (payload.type !== 'refresh') {
      return json(
        { error: 'Invalid token type' },
        { status: 401 }
      );
    }

    // In production: fetch user from database
    const user = MOCK_USERS.find(u => u.id === payload.sub);
    if (!user) {
      return json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Generate new tokens
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user.id);

    // Update refresh token cookie
    cookies.set('refreshToken', newRefreshToken, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30
    });

    return json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });

  } catch (error) {
    return json(
      { error: 'Token refresh failed' },
      { status: 401 }
    );
  }
};