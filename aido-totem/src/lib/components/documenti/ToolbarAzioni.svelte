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

<nav class="flex h-16 items-center justify-center gap-4 bg-red-900 px-4 shadow-md">
	{#if authStore.isAdmin}
		<!-- Pulsante selezione multipla -->
		<button
			onclick={() => documentiStore.toggleModalitaSelezione()}
			class="rounded-2xl bg-amber-300 px-6 py-2 font-semibold transition hover:bg-violet-600 hover:text-white"
		>
			{documentiStore.modalitaSelezione ? '✓ Selezione ON' : 'Seleziona'}
		</button>

		<!-- Elimina selezionati (solo se modalità attiva e ci sono selezioni) -->
		{#if documentiStore.modalitaSelezione && documentiStore.documentiSelezionati.length > 0}
			<button
				onclick={eliminaSelezionati}
				class="rounded-2xl bg-red-500 px-6 py-2 font-semibold text-white transition hover:bg-red-700"
			>
				🗑️ Elimina ({documentiStore.documentiSelezionati.length})
			</button>
		{/if}

		<!-- Aggiungi documento -->
		<button
			onclick={() => uploadPopupStore.apri()}
			class="rounded-2xl bg-green-500 px-6 py-2 font-semibold text-white transition hover:bg-green-700"
		>
			+ Aggiungi
		</button>
	{/if}
</nav>