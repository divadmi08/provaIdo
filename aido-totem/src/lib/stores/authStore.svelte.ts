/**
 * Store per gestione ruolo utente
 */

export type Ruolo = 'admin' | 'user';

class AuthStore {
	ruolo = $state<Ruolo>('user');
	
	get isAdmin(): boolean {
		return this.ruolo === 'admin';
	}

	setRuolo(nuovoRuolo: Ruolo) {
		this.ruolo = nuovoRuolo;
	}
}

export const authStore = new AuthStore();