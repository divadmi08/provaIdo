import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// Utenti di test (in produzione: database)
const UTENTI_TEST = [
	{
		id: 'admin-1',
		email: 'admin@aido.it',
		password: 'admin123',
		nome: 'Admin AIDO',
		ruolo: 'admin' as const
	},
	{
		id: 'user-1',
		email: 'utente@aido.it',
		password: 'user123',
		nome: 'Utente Test',
		ruolo: 'user' as const
	},
	{
		id: 'user-2',
		email: 'mario.rossi@email.it',
		password: 'password',
		nome: 'Mario Rossi',
		ruolo: 'user' as const
	}
];

export const POST: RequestHandler = async ({ request, cookies }) => {
	try {
		const { email, password } = await request.json();

		// Validazione input
		if (!email || !password) {
			return json({ error: 'Email e password obbligatorie' }, { status: 400 });
		}

		// Cerca utente
		const utente = UTENTI_TEST.find(
			(u) => u.email === email && u.password === password
		);

		if (!utente) {
			return json({ error: 'Credenziali non valide' }, { status: 401 });
		}

		// In produzione: genera JWT token
		const token = Buffer.from(JSON.stringify({ id: utente.id })).toString('base64');

		// Imposta cookie sessione
		cookies.set('session', token, {
			path: '/',
			httpOnly: true,
			secure: false, // true in produzione con HTTPS
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7 // 7 giorni
		});

		// Ritorna utente (senza password)
		const { password: _, ...utentePublic } = utente;

		return json({ utente: utentePublic });
	} catch (error) {
		console.error('Errore login:', error);
		return json({ error: 'Errore del server' }, { status: 500 });
	}
};