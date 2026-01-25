import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { email, documentiIds } = await request.json();

	// Validazione email
	if (!email || !email.includes('@')) {
		return json({ error: 'Email non valida' }, { status: 400 });
	}

	// Recupera documenti dal database
	// const documenti = await db.query('SELECT * FROM documenti WHERE id IN (?)', [documentiIds])

	// Invia email (usa nodemailer, SendGrid, ecc.)
	// await inviaEmail({
	//   to: email,
	//   subject: 'Documenti AIDO richiesti',
	//   attachments: documenti.map(d => ({ path: d.fileUrl }))
	// })

	return json({ success: true });
};