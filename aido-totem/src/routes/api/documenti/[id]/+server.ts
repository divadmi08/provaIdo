import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// PATCH - Aggiorna data visualizzata
export const PATCH: RequestHandler = async ({ params, request, locals }) => {
	// Solo admin
	if (locals.user?.ruolo !== 'admin') {
		return json({ error: 'Non autorizzato' }, { status: 403 });
	}

	const { id } = params;
	const { dataVisualizzata } = await request.json();

	// Valida data
	const nuovaData = new Date(dataVisualizzata);
	if (isNaN(nuovaData.getTime())) {
		return json({ error: 'Data non valida' }, { status: 400 });
	}

	// Aggiorna in database (la data di caricamento resta immutata)
	// await db.query('UPDATE documenti SET data_visualizzata = ? WHERE id = ?', [nuovaData, id])

	return json({ success: true, dataVisualizzata: nuovaData });
};

// DELETE - Elimina documento
export const DELETE: RequestHandler = async ({ params, locals }) => {
	// Solo admin
	if (locals.user?.ruolo !== 'admin') {
		return json({ error: 'Non autorizzato' }, { status: 403 });
	}

	const { id } = params;

	// Elimina da storage
	// await elimin

    aFile(fileUrl);
    // Elimina da database
    // await db.query('DELETE FROM documenti WHERE id = ?', [id])

return json({ success: true });
};