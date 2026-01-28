<script lang="ts">
	import { documentiStore } from '$lib/stores/documentiStore.svelte';
	import { authStore } from '$lib/stores/authStore.svelte';
	import { uploadPopupStore } from '$lib/stores/uploadPopupStore.svelte';

	function eliminaSelezionati() {
		const n = documentiStore.documentiSelezionati.length;
		if (!n) return;

		if (!confirm(`Eliminare ${n} documento/i selezionato/i?`)) return;

		documentiStore.rimuoviSelezionati();
	}
</script>

<nav class="flex h-20 items-center justify-between bg-gradient-to-r from-red-900 to-red-800 px-8 shadow-lg">
	<div class="flex items-center gap-4">
		<!-- Badge ruolo -->
		<div class="rounded-full bg-white/20 px-4 py-2 text-white backdrop-blur-sm">
			<span class="font-semibold">
				{authStore.isAdmin ? '👑 Modalità Admin' : '👤 Modalità Utente'}
			</span>
		</div>

		<!-- Contatore documenti -->
		<div class="text-white/80">
			<span class="text-sm">
				{documentiStore.documentiFiltrati.length} documenti
				{#if documentiStore.filtroRicerca}
					(filtrati)
				{/if}
			</span>
		</div>
	</div>

	<div class="flex items-center gap-4">
		{#if authStore.isAdmin}
			<!-- Pulsante selezione multipla -->
			<button
				onclick={() => documentiStore.toggleModalitaSelezione()}
				class="rounded-xl px-6 py-3 font-semibold transition {documentiStore.modalitaSelezione
					? 'bg-yellow-400 text-yellow-900 shadow-lg'
					: 'bg-white/90 text-gray-800 hover:bg-white'}"
			>
				{documentiStore.modalitaSelezione ? '✓ Selezione Attiva' : '☐ Seleziona'}
			</button>

			<!-- Elimina selezionati -->
			{#if documentiStore.modalitaSelezione && documentiStore.documentiSelezionati.length > 0}
				<button
					onclick={eliminaSelezionati}
					class="rounded-xl bg-red-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-red-600"
				>
					🗑️ Elimina ({documentiStore.documentiSelezionati.length})
				</button>
			{/if}

			<!-- Aggiungi documento -->
			<button
				onclick={() => uploadPopupStore.apri()}
				class="rounded-xl bg-green-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-green-600"
			>
				+ Carica Nuovo
			</button>
		{:else}
			<!-- Messaggio per utenti normali -->
			<div class="text-white/70 text-sm">
				Puoi richiedere i documenti tramite email
			</div>
		{/if}
	</div>
</nav>