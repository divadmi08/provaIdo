<script lang="ts">
	import { documentiStore } from '$lib/stores/documentiStore.svelte';
	import { authStore } from '$lib/stores/authStore.svelte';
	import { uploadPopupStore } from '$lib/stores/uploadPopupStore.svelte';
	import RigaDocumento from './RigaDocumento.svelte';
	import BarraRicerca from './BarraRicerca.svelte';
	import ToolbarAzioni from './ToolbarAzioni.svelte';

	// Sincronizzazione automatica con lo store
	$effect(() => {
		// Carica documenti iniziali (simulato)
		// In produzione, chiamata API
		console.log('Documenti caricati:', documentiStore.documenti.length);
	});
</script>

<div class="flex h-full w-full flex-col">
	<!-- Toolbar azioni -->
	<ToolbarAzioni />

	<!-- Barra ricerca -->
	<div class="p-4">
		<BarraRicerca />
	</div>

	<!-- Tabella -->
	<div class="flex-1 overflow-hidden px-4">
		<div class="h-full overflow-auto rounded-2xl bg-white shadow-lg">
			<table class="w-full">
				<!-- Header fisso -->
				<thead class="sticky top-0 z-10 bg-amber-300">
					<tr class="flex h-16 items-center">
						<!-- Checkbox selezione (solo se modalità attiva) -->
						{#if documentiStore.modalitaSelezione}
							<th class="w-[10%] text-center">
								<input
									type="checkbox"
									class="h-5 w-5 cursor-pointer rounded"
									checked={documentiStore.documentiSelezionati.length === documentiStore.documenti.length}
									onchange={() => {
										const tuttiSelezionati = documentiStore.documentiSelezionati.length === documentiStore.documenti.length;
										documentiStore.documenti.forEach(d => d.selezionato = !tuttiSelezionati);
									}}
								/>
							</th>
						{/if}

						<th class="w-[10%] text-center">Preview</th>
						<th class="w-[40%] text-center">Nome File</th>
						<th class="w-[20%] text-center">Data Caricamento</th>
						<th class="w-[20%] text-center">Azioni</th>
					</tr>
				</thead>

				<!-- Body scrollabile -->
				<tbody class="bg-gray-50">
					{#each documentiStore.documentiFiltrati as documento (documento.id)}
						<RigaDocumento {documento} />
					{:else}
						<tr>
							<td colspan="5" class="py-12 text-center text-gray-500">
								{documentiStore.filtroRicerca ? 'Nessun documento trovato' : 'Nessun documento disponibile'}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>