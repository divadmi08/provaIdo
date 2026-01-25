<script lang="ts">
	import type { Documento } from '$lib/stores/documentiStore.svelte';
	import { documentiStore } from '$lib/stores/documentiStore.svelte';
	import { authStore } from '$lib/stores/authStore.svelte';
	import { emailPopupStore } from '$lib/stores/emailPopupStore.svelte';

	let { documento } = $props<{ documento: Documento }>();

	// Stato modifica data (solo admin)
	let modificaDataAttiva = $state(false);
	let dataTmp = $state('');

	// Formatta data per visualizzazione
	function formattaData(data: Date): string {
		return data.toLocaleDateString('it-IT', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});
	}

	// Avvia modifica data
	function iniziaModificaData() {
		dataTmp = documento.dataVisualizzata.toISOString().split('T')[0];
		modificaDataAttiva = true;
	}

	// Salva data modificata
	async function salvaData() {
		if (!dataTmp) return;

		const nuovaData = new Date(dataTmp);
		
		// Chiamata API per salvare
		// await fetch(`/api/documenti/${documento.id}/data`, { ... })
		
		documentiStore.aggiornaDataVisualizzata(documento.id, nuovaData);
		modificaDataAttiva = false;
	}

	// Annulla modifica
	function annullaModifica() {
		modificaDataAttiva = false;
		dataTmp = '';
	}

	// Richiedi via email (user)
	function richiedEmail() {
		emailPopupStore.apri([documento.id]);
	}

	// Download diretto (admin)
	function scaricaDocumento() {
		window.open(documento.fileUrl, '_blank');
	}

	// Elimina documento (admin)
	async function eliminaDocumento() {
		if (!confirm(`Eliminare "${documento.nomeFile}"?`)) return;

		// Chiamata API
		// await fetch(`/api/documenti/${documento.id}`, { method: 'DELETE' })

		documentiStore.rimuovi(documento.id);
	}
</script>

<tr class="flex h-20 items-center border-b border-gray-200 hover:bg-gray-100">
	<!-- Checkbox selezione -->
	{#if documentiStore.modalitaSelezione}
		<td class="w-[10%] text-center">
			<input
				type="checkbox"
				class="h-5 w-5 cursor-pointer rounded"
				checked={documento.selezionato}
				onchange={() => documentiStore.toggleSelezione(documento.id)}
			/>
		</td>
	{/if}

	<!-- Preview immagine -->
	<td class="w-[10%] flex justify-center">
		<img 
			src={documento.previewImgUrl} 
			alt="Preview {documento.nomeFile}"
			class="h-14 w-14 rounded object-cover"
		/>
	</td>

	<!-- Nome file -->
	<td class="w-[40%] px-4">
		<p class="truncate font-medium text-gray-800">{documento.nomeFile}</p>
	</td>

	<!-- Data caricamento -->
	<td class="w-[20%] px-4">
		{#if modificaDataAttiva && authStore.isAdmin}
			<div class="flex items-center gap-2">
				<input
					type="date"
					bind:value={dataTmp}
					class="rounded border px-2 py-1 text-sm"
				/>
				<button onclick={salvaData} class="text-green-600 hover:text-green-800">✓</button>
				<button onclick={annullaModifica} class="text-red-600 hover:text-red-800">✗</button>
			</div>
		{:else}
			<div class="flex items-center gap-2">
				<span>{formattaData(documento.dataVisualizzata)}</span>
				{#if authStore.isAdmin}
					<button 
						onclick={iniziaModificaData}
						class="text-blue-600 hover:text-blue-800"
						title="Modifica data"
					>
						✏️
					</button>
				{/if}
			</div>
		{/if}
	</td>

	<!-- Azioni -->
	<td class="w-[20%] px-4">
		<div class="flex justify-center gap-2">
			{#if authStore.isAdmin}
				<!-- Admin: Download, Sostituisci, Elimina -->
				<button
					onclick={scaricaDocumento}
					class="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
					title="Scarica"
				>
					⬇️
				</button>
				<button
					onclick={eliminaDocumento}
					class="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
					title="Elimina"
				>
					🗑️
				</button>
			{:else}
				<!-- User: Richiedi via email -->
				<button
					onclick={richiedEmail}
					class="rounded bg-green-500 px-4 py-1 text-sm text-white hover:bg-green-600"
				>
					✉️ Richiedi
				</button>
			{/if}
		</div>
	</td>
</tr>