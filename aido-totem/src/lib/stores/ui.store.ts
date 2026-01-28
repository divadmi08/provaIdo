/**
 * Store per popup richiesta email documenti
 */

class EmailModalStore {
	mostra = $state(false);
	documentiDaInviare = $state<string[]>([]);
	emailUtente = $state('');
	
	open(idsDocumenti: string[]) {
		this.documentiDaInviare = idsDocumenti;
		this.emailUtente = '';
		this.mostra = true;
	}
	
	close() {
		this.mostra = false;
		this.documentiDaInviare = [];
		this.emailUtente = '';
	}
	
	setEmail(email: string) {
		this.emailUtente = email;
	}
}

export const emailModalStore = new EmailModalStore();