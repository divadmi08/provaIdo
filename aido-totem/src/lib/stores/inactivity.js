import { writable } from 'svelte/store';
import { goto } from '$app/navigation';

export const inactivityTimer = writable(null);
const TIMEOUT = 60000; // 60 secondi di inattività

export function resetInactivityTimer() {
  if (typeof window === 'undefined') return;
  
  clearTimeout(inactivityTimer);
  
  const timer = setTimeout(() => {
    goto('/');
  }, TIMEOUT);
  
  inactivityTimer.set(timer);
}

export function setupInactivityListeners() {
  if (typeof window === 'undefined') return;
  
  const events = ['mousedown', 'touchstart', 'keydown'];
  
  events.forEach(event => {
    window.addEventListener(event, resetInactivityTimer);
  });
  
  resetInactivityTimer();
}