/**
 * Store autenticazione con gestione sessione
 */

export type Ruolo = 'admin' | 'user' | null;

export type Utente = {
	id: string;
	email: string;
	nome: string;
	ruolo: Ruolo;
};

class AuthStore {
	utente = $state<Utente | null>(null);
	isLoading = $state(false);
	errore = $state<string | null>(null);

	// Computed
	get isAutenticato(): boolean {
		return this.utente !== null;
	}

	get isAdmin(): boolean {
		return this.utente?.ruolo === 'admin';
	}

	get isUser(): boolean {
		return this.utente?.ruolo === 'user';
	}

	// Login
	async login(email: string, password: string): Promise<boolean> {
		this.isLoading = true;
		this.errore = null;

		try {
			// Chiamata API (simulata)
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});

			if (!response.ok) {
				const { error } = await response.json();
				this.errore = error;
				return false;
			}

			const { utente } = await response.json();
			this.utente = utente;

			// Salva in localStorage per persistenza
			if (typeof window !== 'undefined') {
				localStorage.setItem('utente', JSON.stringify(utente));
			}

			return true;
		} catch (error) {
			this.errore = 'Errore di connessione';
			return false;
		} finally {
			this.isLoading = false;
		}
	}

	// Logout
	logout() {
		this.utente = null;
		this.errore = null;

		if (typeof window !== 'undefined') {
			localStorage.removeItem('utente');
		}
	}

	// Ripristina sessione da localStorage
	ripristinaSessione() {
		if (typeof window === 'undefined') return;

		const utenteStorage = localStorage.getItem('utente');
		if (utenteStorage) {
			try {
				this.utente = JSON.parse(utenteStorage);
			} catch {
				localStorage.removeItem('utente');
			}
		}
	}

	// Cambia ruolo (solo per testing)
	cambiaRuolo(nuovoRuolo: 'admin' | 'user') {
		if (this.utente) {
			this.utente.ruolo = nuovoRuolo;
			
			if (typeof window !== 'undefined') {
				localStorage.setItem('utente', JSON.stringify(this.utente));
			}
		}
	}
}

export const authStore = new AuthStore();