/**
 * Store per popup richiesta email documenti
 */

class EmailPopupStore {
	mostra = $state(false);
	documentiDaInviare = $state<string[]>([]);
	emailUtente = $state('');
	
	apri(idsDocumenti: string[]) {
		this.documentiDaInviare = idsDocumenti;
		this.emailUtente = '';
		this.mostra = true;
	}
	
	chiudi() {
		this.mostra = false;
		this.documentiDaInviare = [];
		this.emailUtente = '';
	}
	
	setEmail(email: string) {
		this.emailUtente = email;
	}
}

export const emailPopupStore = new EmailPopupStore();