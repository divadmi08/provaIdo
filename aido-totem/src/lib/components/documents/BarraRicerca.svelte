<script lang="ts">
	import { documentiStore } from '$lib/stores/documentiStore.svelte';

	// Binding bidirezionale con lo store
	let ricerca = $state(documentiStore.filtroRicerca);

	// Sincronizzazione automatica
	$effect(() => {
		documentiStore.filtroRicerca = ricerca;
	});
</script>

<div class="flex items-center gap-4">
	<div class="relative flex-1">
		<input
			type="text"
			bind:value={ricerca}
			placeholder="🔍 Cerca per nome file..."
			class="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
		/>
		
		{#if ricerca}
			<button
				onclick={() => ricerca = ''}
				class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
			>
				✕
			</button>
		{/if}
	</div>

	<div class="text-sm text-gray-600">
		{documentiStore.documentiFiltrati.length} di {documentiStore.documenti.length} documenti
	</div>
</div>