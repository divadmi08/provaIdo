<script lang="ts">
	import { uploadPopupStore } from '$lib/stores/uploadPopupStore.svelte';
	import { documentiStore } from '$lib/stores/documentiStore.svelte';

	let fileInput: HTMLInputElement;
	let previewInput: HTMLInputElement;

	let nomeFile = $state('');
	let ruoloVisibile = $state<'admin' | 'user'>('user');

	async function handleCaricamento() {
		// Validazione
		if (!fileInput?.files?.[0] || !previewInput?.files?.[0]) {
			alert('Seleziona file e preview');
			return;
		}

		// Simulazione upload (in produzione: FormData + fetch)
		const file = fileInput.files[0];
		const preview = previewInput.files[0];

		// Crea URL temporanei (in produzione sarebbero URLs dal server)
		const fileUrl = URL.createObjectURL(file);
		const previewUrl = URL.createObjectURL(preview);

		// Aggiungi documento
		documentiStore.aggiungi({
			nomeFile: nomeFile || file.name,
			dataCaricamento: new Date(),
			dataVisualizzata: new Date(),
			fileUrl,
			previewImgUrl: previewUrl,
			ruoloVisibile
		});

		// Chiudi popup
		uploadPopupStore.chiudi();
		
		// Reset
		nomeFile = '';
		ruoloVisibile = 'user';
	}
</script>

{#if uploadPopupStore.mostra}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
		<div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
			<h2 class="mb-6 text-2xl font-bold text-gray-800">Carica Documento</h2>

			<div class="space-y-4">
				<!-- Nome file -->
				<div>
					<label class="mb-2 block text-sm font-medium text-gray-700">
						Nome File
					</label>
					<input
						type="text"
						bind:value={nomeFile}
						placeholder="Es: Brochure Donazione"
						class="w-full rounded-lg border px-3 py-2"
					/>
				</div>

				<!-- File documento -->
				<div>
					<label class="mb-2 block text-sm font-medium text-gray-700">
						Documento (PDF, DOCX, ecc.)
					</label>
					<input
						type="file"
						bind:this={fileInput}
						accept=".pdf,.doc,.docx"
						class="w-full rounded-lg border px-3 py-2"
					/>
				</div>

				<!-- Immagine preview -->
				<div>
					<label class="mb-2 block text-sm font-medium text-gray-700">
						Immagine Anteprima
					</label>
					<input
						type="file"
						bind:this={previewInput}
						accept="image/*"
						class="w-full rounded-lg border px-3 py-2"
					/>
				</div>

				<!-- Ruolo visibilità -->
				<div>
					<label class="mb-2 block text-sm font-medium text-gray-700">
						Visibile a
					</label>
					<select
						bind:value={ruoloVisibile}
						class="w-full rounded-lg border px-3 py-2"
					>
						<option value="user">Utenti</option>
						<option value="admin">Solo Admin</option>
					</select>
				</div>
			</div>

			<!-- Azioni -->
			<div class="mt-6 flex gap-3">
				<button
					onclick={handleCaricamento}
					class="flex-1 rounded-lg bg-green-600 py-2 font-semibold text-white hover:bg-green-700"
				>
					Carica
				</button>
				<button
					onclick={() => uploadPopupStore.chiudi()}
					class="flex-1 rounded-lg bg-gray-300 py-2 font-semibold hover:bg-gray-400"
				>
					Annulla
				</button>
			</div>
		</div>
	</div>
{/if}