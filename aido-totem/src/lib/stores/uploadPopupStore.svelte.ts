/**
 * Store per popup caricamento documenti
 */

export type DatiUpload = {
	nomeFile: string;
	fileUrl: string;
	previewImgUrl: string;
	ruoloVisibile: 'admin' | 'user';
};

class UploadPopupStore {
	mostra = $state(false);
	dati = $state<Partial<DatiUpload>>({});
	
	apri() {
		this.mostra = true;
		this.dati = {};
	}
	
	chiudi() {
		this.mostra = false;
		this.dati = {};
	}
	
	aggiornaDati(nuoviDati: Partial<DatiUpload>) {
		this.dati = { ...this.dati, ...nuoviDati };
	}
}

export const uploadPopupStore = new UploadPopupStore();