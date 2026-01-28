// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { verifyToken } from '$lib/utils/crypto.utils';

/**
 * Global request handler to verify JWT tokens
 */
export const handle: Handle = async ({ event, resolve }) => {
  const authHeader = event.request.headers.get('Authorization');
  
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    
    try {
      const payload = verifyToken(token);
      
      // Attach user to event.locals
      event.locals.user = {
        id: payload.sub,
        email: payload.email,
        ruolo: payload.role
      };
    } catch (error) {
      // Invalid token - don't attach user
      console.warn('Invalid token:', error);
    }
  }

  return resolve(event);
};