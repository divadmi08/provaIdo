import { writable, get } from 'svelte/store';
import { goto } from '$app/navigation';

/**
 * @type {import("svelte/store").Writable<NodeJS.Timeout | null>}
 */
export const inactivityTimer = writable(null); // Initialize with null

const TIMEOUT = 10000; // 60 secondi di inattività

export function resetInactivityTimer() {
	if (typeof window === 'undefined') return;

	const currentTimer = get(inactivityTimer);
	if (currentTimer !== null) {
		// Check if a timer exists before clearing
		clearTimeout(currentTimer);
	}

	const timer = setTimeout(() => {
		goto('/');
	}, TIMEOUT);

	inactivityTimer.set(timer);
}

export function setupInactivityListeners() {
	if (typeof window === 'undefined') return;

	const events = ['mousedown', 'touchstart', 'keydown'];

	events.forEach((event) => {
		window.addEventListener(event, resetInactivityTimer);
	});

	resetInactivityTimer();
}
