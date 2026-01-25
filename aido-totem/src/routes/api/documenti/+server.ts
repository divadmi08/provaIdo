import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// GET - Lista documenti
export const GET: RequestHandler = async ({ url, locals }) => {
	// Verifica autenticazione
	const ruolo = locals.user?.ruolo || 'user';

	// Query database
	// const documenti = await db.query('SELECT * FROM documenti WHERE ruolo_visibile = ? OR ruolo_visibile = "user"', [ruolo])

	// Simulazione
	const documenti = [
		{
			id: '1',
			nomeFile: 'Brochure Donazione',
			dataCaricamento: new Date('2024-01-15'),
			dataVisualizzata: new Date('2024-01-15'),
			fileUrl: '/files/brochure.pdf',
			previewImgUrl: '/images/doc-preview.jpg',
			ruoloVisibile: 'user'
		}
	];

	return json(documenti);
};

// POST - Upload documento
export const POST: RequestHandler = async ({ request, locals }) => {
	// Solo admin
	if (locals.user?.ruolo !== 'admin') {
		return json({ error: 'Non autorizzato' }, { status: 403 });
	}

	const formData = await request.formData();
	const file = formData.get('file') as File;
	const preview = formData.get('preview') as File;
	const nomeFile = formData.get('nomeFile') as string;
	const ruoloVisibile = formData.get('ruoloVisibile') as string;

	// Salva file su storage (S3, filesystem, ecc.)
	// const fileUrl = await salvaFile(file);
	// const previewUrl = await salvaFile(preview);

	// Salva in database
	const dataCaricamento = new Date();
	// await db.query('INSERT INTO documenti ...', [...])

	return json({ 
		success: true,
		id: crypto.randomUUID(),
		dataCaricamento 
	});
};