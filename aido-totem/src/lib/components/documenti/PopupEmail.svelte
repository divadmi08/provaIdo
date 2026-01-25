<script lang="ts">
	import { emailPopupStore } from '$lib/stores/emailPopupStore.svelte';
	import { documentiStore } from '$lib/stores/documentiStore.svelte';

	let email = $state('');

	async function inviaEmail() {
		if (!email || !email.includes('@')) {
			alert('Inserisci una email valida');
			return;
		}

		// Chiamata API per inviare email
		const docs = documentiStore.documenti
			.filter(d => emailPopupStore.documentiDaInviare.includes(d.id));

		console.log('Invio email a:', email, 'con documenti:', docs.map(d => d.nomeFile));

		// Simulazione
		// await fetch('/api/documenti/invia-email', {
		//   method: 'POST',
		//   body: JSON.stringify({ email, documentiIds: emailPopupStore.documentiDaInviare })
		// })

		alert(`Email inviata a ${email}!`);
		emailPopupStore.chiudi();
		email = '';
	}
</script>

{#if emailPopupStore.mostra}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
		<div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
			<h2 class="mb-4 text-2xl font-bold text-gray-800">Richiedi Documenti</h2>

			<p class="mb-4 text-gray-600">
				I documenti selezionati verranno inviati all'indirizzo email fornito.
			</p>

			<div class="mb-6">
				<label class="mb-2 block text-sm font-medium text-gray-700">
					Tua Email
				</label>
				<input
					type="email"
					bind:value={email}
					placeholder="esempio@email.it"
					class="w-full rounded-lg border px-3 py-2"
				/>
			</div>

			<div class="flex gap-3">
				<button
					onclick={inviaEmail}
					class="flex-1 rounded-lg bg-green-600 py-2 font-semibold text-white hover:bg-green-700"
				>
					Invia
				</button>
				<button
					onclick={() => emailPopupStore.chiudi()}
					class="flex-1 rounded-lg bg-gray-300 py-2 font-semibold hover:bg-gray-400"
				>
					Annulla
				</button>
			</div>
		</div>
	</div>
{/if}