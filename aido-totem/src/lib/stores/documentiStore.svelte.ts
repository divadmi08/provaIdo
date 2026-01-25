/**
 * Store reattivo per la gestione dei documenti
 * Usa le rune di Svelte 5 per la reattività
 */

export type Documento = {
	id: string;
	nomeFile: string;
	dataCaricamento: Date;
	dataVisualizzata: Date;
	fileUrl: string;
	previewImgUrl: string;
	selezionato: boolean;
	ruoloVisibile: 'admin' | 'user';
};

class DocumentiStore {
	// Lista documenti reattiva
	documenti = $state<Documento[]>([]);
	
	// Filtro ricerca
	filtroRicerca = $state('');
	
	// Selezione multipla attiva
	modalitaSelezione = $state(false);

	// Lista filtrata (computed)
	get documentiFiltrati(): Documento[] {
		if (!this.filtroRicerca) return this.documenti;
		
		const ricerca = this.filtroRicerca.toLowerCase();
		return this.documenti.filter(doc => 
			doc.nomeFile.toLowerCase().includes(ricerca)
		);
	}

	// Documenti selezionati
	get documentiSelezionati(): Documento[] {
		return this.documenti.filter(d => d.selezionato);
	}

	// Aggiungi documento
	aggiungi(doc: Omit<Documento, 'id' | 'selezionato'>) {
		const nuovoDoc: Documento = {
			...doc,
			id: crypto.randomUUID(),
			selezionato: false
		};
		this.documenti = [...this.documenti, nuovoDoc];
	}

	// Rimuovi documento
	rimuovi(id: string) {
		this.documenti = this.documenti.filter(d => d.id !== id);
	}

	// Rimuovi multipli
	rimuoviSelezionati() {
		this.documenti = this.documenti.filter(d => !d.selezionato);
		this.modalitaSelezione = false;
	}

	// Aggiorna data visualizzata
	aggiornaDataVisualizzata(id: string, nuovaData: Date) {
		const doc = this.documenti.find(d => d.id === id);
		if (doc) {
			doc.dataVisualizzata = nuovaData;
		}
	}

	// Toggle selezione
	toggleSelezione(id: string) {
		const doc = this.documenti.find(d => d.id === id);
		if (doc) {
			doc.selezionato = !doc.selezionato;
		}
	}

	// Deseleziona tutti
	deselezionaTutti() {
		this.documenti.forEach(d => d.selezionato = false);
	}

	// Toggle modalità selezione
	toggleModalitaSelezione() {
		this.modalitaSelezione = !this.modalitaSelezione;
		if (!this.modalitaSelezione) {
			this.deselezionaTutti();
		}
	}
}

// Export singleton
export const documentiStore = new DocumentiStore();